import React, { useState } from 'react'
import { useChatState } from 'modals/ChatGPTModal/hooks/useChat'
import { ChatType } from 'modals/ChatGPTModal/types'

const ChatQueue = () => {
  const { chats, setCurrentChat, addChat } = useChatState()

  return (
    <div style={{ color: 'white' }}>
      <h1>ChatQueue</h1>
      <ul>
        {chats.map((chat: ChatType) => (
          <li key={chat.id} onClick={() => setCurrentChat(chat)}>
            {chat.name} - {chat.messages.length}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChatQueue
