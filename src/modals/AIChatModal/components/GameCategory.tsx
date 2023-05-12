import React, { useState } from 'react'
import { useChatState } from 'modals/AIChatModal/hooks/useChat'
import { IChat } from 'modals/AIChatModal/types'
import { GAME_CATEGORY_OPTIONS } from 'utils/constants'

// todo take
const categories = ['Arcade', 'Action']
const GameCategory = () => {
  const { setGameCategory, currentChat } = useChatState()

  return (
    <div style={{ color: 'white' }}>
      <ul>
        {GAME_CATEGORY_OPTIONS.map((category: any) => (
          <li key={category.value} onClick={() => setGameCategory(category.value)}>
            {category.label}
          </li>
        ))}
      </ul>
      <br />
      <h3>Choose Category:</h3>
      {currentChat.gameCategory && <h3> {currentChat.gameCategory}</h3>}
      <h3
        onClick={() => {
          setGameCategory(null)
        }}
      >
        Remove Selected
      </h3>
    </div>
  )
}

export default GameCategory
