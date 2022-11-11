import { BrowserRouter } from "react-router-dom"
import Route from "./Route"


import { ApolloProvider } from '@apollo/client'

import './i18n'
import { SnackbarProvider } from 'notistack'

import useDetectMobile from 'hooks/useDetectMobile'
import useApollo from 'hooks/useApollo'

import ModalsProvider from 'providers/ModalsProvider'
import AuthProvider from 'providers/AuthProvider'

import "./App.css"


function App() {
  
  useDetectMobile()
  const client = useApollo()
  
  return (
	<ApolloProvider client={client}>
	  <AuthProvider>
		<ModalsProvider>
		  <BrowserRouter>
			<SnackbarProvider>
			  <Route/>
			</SnackbarProvider>
		  </BrowserRouter>
		</ModalsProvider>
	  </AuthProvider>
	</ApolloProvider>
  )
}

export default App

