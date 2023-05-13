import React, { useState } from 'react'
import { useChatState } from 'modals/AIChatModal/hooks/useChat'
import { IChatMessage } from 'modals/AIChatModal/types'

type ChatReportProps = {
  message: IChatMessage
}

const ChatReport = ({ message }: ChatReportProps) => {
  const { gameIdeas } = message
  const { setGameIdea, currentChat } = useChatState()

  return (
    <div style={{ color: 'white' }}>
      <div>
        {gameIdeas?.map((idea: any) => (
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
      {currentChat?.gameIdea && <h3> {currentChat?.gameIdea?.name}</h3>}
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

export default ChatReport
