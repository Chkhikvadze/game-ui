import React, { useState } from 'react'
import { useChatState, INITIAL_CHAT } from 'modals/AIChatModal/hooks/useChat'
import { ChatType } from 'modals/AIChatModal/types'

const ChatHistory = () => {
  const { chats, setCurrentChat, addChat } = useChatState()

  return (
    <div style={{ color: 'white' }}>
      <h1>Chat History</h1>
      <ul>
        {chats.map((chat: ChatType) => (
          <li key={chat.id} onClick={() => setCurrentChat(chat)}>
            {chat.name}
          </li>
        ))}
      </ul>
      <button onClick={() => addChat(INITIAL_CHAT)}>Add New Game</button>
    </div>
  )
}

export default ChatHistory
