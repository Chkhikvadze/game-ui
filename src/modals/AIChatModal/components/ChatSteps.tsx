import React, { useState } from 'react'
import { useChatState } from 'modals/AIChatModal/hooks/useChat'
import { IChatStep, IChat } from 'modals/AIChatModal/types'

const ChatSteps = () => {
  const { currentChat, setCurrentChat, addChat } = useChatState()

  return (
    <div style={{ color: 'white' }}>
      <h1>Steps</h1>
      <ul>
        {currentChat?.steps?.map((step: IChatStep) => (
          <li key={step.name} onClick={() => console.log()}>
            {step.name} - {step.status}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChatSteps
