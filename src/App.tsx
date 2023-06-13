import { BrowserRouter } from 'react-router-dom'
import Route from './Route'

import Wagmi from 'utils/wagmi'
import { ApolloProvider } from '@apollo/client'
import * as Sentry from '@sentry/react'

import './i18n'
import { SnackbarProvider } from 'notistack'

import useDetectMobile from 'hooks/useDetectMobile'
import useApollo from 'hooks/useApollo'

import ToastProvider from 'providers/ToastProvider'
import ModalsProvider from 'providers/ModalsProvider'
import AuthProvider from 'providers/AuthProvider'

import './App.css'

import '@l3-lib/ui-core/dist/main.css'

function App() {
  useDetectMobile()
  const client = useApollo()

  return (
    <Sentry.ErrorBoundary>
      <Wagmi>
        <ApolloProvider client={client}>
          <AuthProvider>
            <ModalsProvider>
              <BrowserRouter>
                <SnackbarProvider>
                  <ToastProvider>
                    <AuthProvider>
                      <Route />
                    </AuthProvider>
                  </ToastProvider>
                </SnackbarProvider>
              </BrowserRouter>
            </ModalsProvider>
          </AuthProvider>
        </ApolloProvider>
      </Wagmi>
    </Sentry.ErrorBoundary>
  )
}

export default App
