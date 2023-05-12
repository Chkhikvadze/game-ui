import React, { useState } from 'react'
import { useChatState } from 'modals/AIChatModal/hooks/useChat'
import { ChatMessageType } from 'modals/AIChatModal/types'

type GameIdeaProps = {
  message: ChatMessageType
}

const GameIdea = ({ message }: GameIdeaProps) => {
  const { jsonData } = message
  const { setGameIdea, currentChat } = useChatState()

  return (
    <div style={{ color: 'white' }}>
      <div>
        {jsonData?.map((idea: any) => (
          <div
            key={idea.id}
            onClick={() => {
              setGameIdea(idea)
            }}
          >
            <img src={idea.image} alt={idea.title} />
            <div>ID: {idea.id}</div>
            <div>Title: {idea.title}</div>
            <div>Description: {idea.description}</div>
            <br />
            <div>------------------</div>
          </div>
        ))}
      </div>
      <br />
      <h3>Chosen Game Idea:</h3>
      {currentChat?.gameIdea && <h3> {currentChat?.gameIdea?.title}</h3>}
      <h3
        onClick={() => {
          setGameIdea(null)
        }}
      >
        Remove Selected
      </h3>
    </div>
  )
}

export default GameIdea
