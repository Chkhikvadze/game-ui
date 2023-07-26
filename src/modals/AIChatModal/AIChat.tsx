import { useLocation } from 'react-router-dom'

import { ChatContextProvider } from './context/ChatContext'
import ChatView from './components/ChatView'
import ChatV2 from './components/ChatV2'

const AIChat = () => {
  const location = useLocation()

  const text = location?.state?.text
  const apiVersion = location?.state?.apiVersion

  return (
    <ChatContextProvider initialApiVersion={apiVersion}>
      <ChatV2 />
    </ChatContextProvider>
  )
}

export default AIChat
