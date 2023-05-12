import React, { useState } from 'react'
import { useChatState } from 'modals/AIChatModal/hooks/useChat'
import { IChatStep, IChat } from 'modals/AIChatModal/types'

const ChatSteps = () => {
  const { currentChat } = useChatState()

  return (
    <div style={{ color: 'white' }}>
      <h1>Steps</h1>
      <ul>
        {Object.entries(currentChat?.steps || {}).map(([stepName, stepStatus]) => (
          <li key={stepName} onClick={() => console.log()}>
            {stepName} - {stepStatus}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChatSteps
