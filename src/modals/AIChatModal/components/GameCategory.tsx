import React, { useState } from 'react'
import { useChatState } from 'modals/AIChatModal/hooks/useChat'
import { ChatType } from 'modals/AIChatModal/types'
import { GAME_CATEGORY_OPTIONS } from 'utils/constants'

// todo take
const categories = ['Arcade', 'Action']
const GameCategory = () => {
  const { setCurrentChat, currentChat } = useChatState()

  return (
    <div style={{ color: 'white' }}>
      <h1>Choose Category</h1>
      {currentChat.gameCategory && <h3> Selected Category: {currentChat.gameCategory}</h3>}
      <ul>
        {GAME_CATEGORY_OPTIONS.map((category: any) => (
          <li
            key={category.value}
            onClick={() =>
              setCurrentChat({
                ...currentChat,
                gameCategory: category.value,
              })
            }
          >
            {category.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GameCategory
