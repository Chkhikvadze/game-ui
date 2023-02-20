import React from 'react'
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  // eslint-disable-next-line
  NextLink,
  // RequestHandler,
  // Operation,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { MultiAPILink } from '@habx/apollo-multi-endpoint-link'
import { RestLink } from 'apollo-link-rest'
import axios from 'axios'
import { createUploadLink } from 'apollo-upload-client'
import { useCookies } from 'react-cookie'
import { cleanCookie } from 'helpers/authHelper'
// import { getMainDefinition } from "apollo-utilities"

// import Cookies from 'universal-cookie'

// import { ApolloLink, split } from 'apollo-link'

const useApollo = () => {
  const [cookies] = useCookies([''])
  // @ts-expect-error
  const { accountId, authorization, 'x-refresh-token': refreshToken } = cookies

  const apollo = React.useMemo(
    () => {
      const logout = async () => {
        const request: any = {
          method: 'POST',
          url: `${process.env.REACT_APP_ACCOUNT_SERVICES_URL}/auth/logout`,
          withCredentials: true,
        }

        if (process.env.REACT_APP_AUTH_BY_HEADER) {
          request.headers = {
            'x-refresh-token': refreshToken,
            authorization,
          }
        }
        await axios(request)
        cleanCookie()
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }

      const errorLink = onError(context => {
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
        getContext: (endpoint, ctx) => {
          if (endpoint === 'project' || endpoint === 'account') {
            if (process.env.REACT_APP_AUTH_BY_HEADER) {
              return {
                headers: {
                  accountId,
                  'x-refresh-token': refreshToken,
                  authorization,
                },
              }
            }
            return {
              credentials: 'include',
              headers: { accountId },
            }
          }
          return {
            headers: { accountId },
          }
        },
      })

      const requestHandler: any = (operation: any, forward: NextLink): any => {
        operation.setContext(({ headers }: any) => {
          let credentials: any = 'include'
          if (
            [
              'registration',
              'resendCode',
              'forgotPassword',
              'resetPassword',
              'resendVerifyEmail',
              'activateAccount',
              'verifyEmail',
              'financialsTable',
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
          SensitivityAnalysisMulti: data => ({
            data: Object.values(data).filter(Boolean),
          }),
          SensitivityAnalysis: data => ({
            data: Object.values(data).filter(Boolean),
          }),
        },
        headers: {
          'Content-Type': 'application/json',
          accountId,
          Authorization: `${process.env.REACT_APP_DEVELOP_TOKEN}`,
          // origin: 'https://service-tco-dev.evenergi.com'
        },
        // credentials: 'include',
      })

      let upConfig: any = {
        uri: `${process.env.REACT_APP_SERVICES_URL}/graphql`,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }

      if (process.env.REACT_APP_AUTH_BY_HEADER === 'true') {
        upConfig = {
          uri: `${process.env.REACT_APP_SERVICES_URL}/graphql`,
          headers: {
            'x-refresh-token': refreshToken,
            authorization,
          },
        }
      }

      const uploadLink: any = createUploadLink(upConfig)

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
            fetchPolicy: 'cache-and-network',
          },
          query: {
            fetchPolicy: 'cache-first',
            errorPolicy: 'all',
          },
          mutate: {
            errorPolicy: 'all',
          },
        },
      })
    },
    [], // eslint-disable-line
  )

  return apollo
}

export default useApollo
