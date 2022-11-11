import React from 'react'
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  //eslint-disable-next-line
  NextLink,
  RequestHandler,
  Operation,
} from "@apollo/client"
import { MultiAPILink } from "@habx/apollo-multi-endpoint-link"
import { onError } from "@apollo/client/link/error"
import { RestLink } from "apollo-link-rest"
import axios from "axios"
import { createUploadLink } from "apollo-upload-client"
import { useCookies } from "react-cookie"
// import { getMainDefinition } from "apollo-utilities"

// import Cookies from 'universal-cookie'

// import { ApolloLink, split } from 'apollo-link'

const useApollo = () => {
  const [cookies] = useCookies([""])
  // @ts-expect-error
  const { accountId } = cookies
  const apollo = React.useMemo(
    () => {
      const logout = async () => {
        await axios({
          method: "POST",
          url: `${process.env.REACT_APP_ACCOUNTS_URL}/auth/logout`,
          withCredentials: true,
        })
        if (window.location.pathname !== "/login") {
          window.location.href = "/login"
        }
      }

      const errorLink = onError((context) => {
        const { graphQLErrors, networkError }: any = context
        // debugger
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path, extensions }: any) => {
            if (extensions?.exception?.status === 401) {
              logout()
            }

            // if(extensions?.exception?.status === 403){
            //   logout()
            // }
            return true
          })
        }

        if (networkError && networkError.statusCode === 401) {
          logout()
        }

        if (networkError && networkError.statusCode === 500) {
          logout()
        }
      })

      const mLink = new MultiAPILink({
        endpoints: {
          vehicle: `${process.env.REACT_APP_VEHICLEDATA_URL}`,
          project: `${process.env.REACT_APP_SERVICES_URL}`,
          account: `${process.env.REACT_APP_ACCOUNT_SERVICES_URL}`,
          forecast: `${process.env.REACT_APP_FORECASTING_URL}`,
        },
        createHttpLink: () => createHttpLink({}),
        getContext: (endpoint) => {
          if (endpoint === "project") {
            return {
              credentials: "include",
              headers: { accountId },
            }
          }
          return {
            headers: { accountId },
          }
        },
      })

      const requestHandler: RequestHandler = (
        operation: Operation,
        forward: NextLink
      ): any => {
        operation.setContext(({ headers }: any) => {
          let credentials: any = "include"
          if (
            [
              "registration",
              "resendCode",
              "forgotPassword",
              "resetPassword",
              "resendVerifyEmail",
              "activateAccount",
              "verifyEmail",
              "financialsTable",
            ].includes(operation.operationName)
          ) {
            credentials = null
          }
          return {
            credentials,
          }
        })
        return forward(operation)
      }

      const authRestLink = new ApolloLink(requestHandler)

      const restLink = new RestLink({
        endpoints: {
          vehicle: `${process.env.REACT_APP_CALCULATE_SERVICE_URL}/v1.0`,
          project: `${process.env.REACT_APP_SERVICES_URL}`,
          account: `${process.env.REACT_APP_ACCOUNT_SERVICES_URL}`,
          forecast: `${process.env.REACT_APP_FORECASTING_URL}`,
        },
        typePatcher: {
          SensitivityAnalysisMulti: (data) => ({
            data: Object.values(data).filter(Boolean),
          }),
          SensitivityAnalysis: (data) => ({
            data: Object.values(data).filter(Boolean),
          }),
        },
        headers: {
          "Content-Type": "application/json",
          accountId,
          Authorization: `${process.env.REACT_APP_DEVELOP_TOKEN}`,
          // origin: 'https://service-tco-dev.evenergi.com'
        },
        // credentials: 'include',
      })

      const uploadLink: any = createUploadLink({
        uri: `${process.env.REACT_APP_SERVICES_URL}/graphql`,
        headers: {
          "Content-Type": "application/json",
          accountId,
        },
        credentials: "include",
      })

      const apolloLink = ApolloLink.from([
        errorLink,
        authRestLink,
        ApolloLink.from([restLink, mLink, uploadLink]),
      ])

      return new ApolloClient({
        link: apolloLink,
        cache: new InMemoryCache(),

        defaultOptions: {
          watchQuery: {
            fetchPolicy: "cache-and-network",
          },
          query: {
            fetchPolicy: "cache-first",
            errorPolicy: "all",
          },
          mutate: {
            errorPolicy: "all",
          },
        },
      })
    },
    [] // eslint-disable-line
  )

  return apollo
}

export default useApollo
