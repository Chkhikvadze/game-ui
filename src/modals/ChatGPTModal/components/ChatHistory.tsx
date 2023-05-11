import React, { useState } from 'react'
import { useChatState } from 'modals/ChatGPTModal/hooks/useChatState'
import { ChatType } from 'modals/ChatGPTModal/types'

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
      <button
        onClick={() =>
          addChat({
            id: chats.length + 1,
            name: `Game ${chats.length + 1}`,
            messages: [],
            created_on: Date.now(),
          })
        }
      >
        Add New Game
      </button>
    </div>
  )
}

export default ChatHistory
