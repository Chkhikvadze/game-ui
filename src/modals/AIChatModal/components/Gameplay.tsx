import React, { useState } from 'react'
import { useChatState } from 'modals/AIChatModal/hooks/useChat'
import { ChatMessageType } from 'modals/AIChatModal/types'

type GameplayProps = {
  message: ChatMessageType
}

const Gameplay = ({ message }: GameplayProps) => {
  const { jsonData } = message
  const { setGameplay, currentChat } = useChatState()

  return (
    <div style={{ color: 'white' }}>
      <div>
        {jsonData?.map((gameplay: any) => (
          <div
            key={gameplay.id}
            onClick={() => {
              setGameplay(gameplay)
            }}
          >
            <img src={gameplay.image} alt={gameplay.title} />
            <div>ID: {gameplay.id}</div>
            <div>Title: {gameplay.title}</div>
            <div>Description: {gameplay.description}</div>
            <br />
            <div>------------------</div>
          </div>
        ))}
      </div>
      <br />
      <h3>Chosen Game Idea:</h3>
      {currentChat?.gameplay && <h3> {currentChat?.gameplay?.title}</h3>}
      <h3
        onClick={() => {
          setGameplay(null)
        }}
      >
        Remove Selected
      </h3>
    </div>
  )
}

export default Gameplay
