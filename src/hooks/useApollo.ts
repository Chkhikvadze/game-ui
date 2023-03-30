import React from 'react'
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  RequestHandler,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { MultiAPILink } from '@habx/apollo-multi-endpoint-link'
import { RestLink } from 'apollo-link-rest'
import axios, { AxiosRequestConfig } from 'axios'
import { createUploadLink } from 'apollo-upload-client'
import { useCookies } from 'react-cookie'
import { cleanCookie } from 'helpers/authHelper'
// import { getMainDefinition } from "apollo-utilities"

// import Cookies from 'universal-cookie'

// import { ApolloLink, split } from 'apollo-link'

const useApollo = () => {
  const [cookies] = useCookies([''])
  // @ts-expect-error TODO: fix cookie types
  const { accountId, authorization, 'x-refresh-token': refreshToken } = cookies

  const apollo = React.useMemo(
    () => {
      const logout = async () => {
        const request: AxiosRequestConfig = {
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
        const { graphQLErrors, networkError } = context
        // debugger
        if (graphQLErrors) {
          graphQLErrors.map(({ extensions }) => {
            // @ts-expect-error TODO: fix status check
            if (extensions?.exception?.status === 401) {
              logout()
            }

            // if(extensions?.exception?.status === 403){
            //   logout()
            // }
            return true
          })
        }

        // @ts-expect-error TODO: fix status check
        if (networkError && (networkError.statusCode === 401 || networkError.statusCode === 500)) {
          // logout()
          console.log(networkError)
        }
      })

      const mLink = new MultiAPILink({
        endpoints: {
          project: `${process.env.REACT_APP_SERVICES_URL}`,
          account: `${process.env.REACT_APP_ACCOUNT_SERVICES_URL}`,
        },
        createHttpLink: () => createHttpLink({}),
        getContext: endpoint => {
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

      const requestHandler: RequestHandler = (operation, forward) => {
        operation.setContext(() => {
          let credentials: string | null = 'include'
          if (
            [
              'registration',
              'resendCode',
              'forgotPassword',
              'resetPassword',
              'resendVerifyEmail',
              'activateAccount',
              'verifyEmail',
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
          project: `${process.env.REACT_APP_SERVICES_URL}`,
          account: `${process.env.REACT_APP_ACCOUNT_SERVICES_URL}`,
        },
        headers: {
          'Content-Type': 'application/json',
          accountId,
          Authorization: `${process.env.REACT_APP_DEVELOP_TOKEN}`,
          // origin: 'https://service-tco-dev.l3vels.xyz'
        },
        // credentials: 'include',
      })

      let upConfig: createUploadLink.UploadLinkOptions = {
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

      const uploadLink = createUploadLink(upConfig)

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
