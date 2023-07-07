import styled from 'styled-components'

import Typewriter from 'typewriter-effect'

type ChatTypingEffectProps = {
  value: string
  callFunction: () => void
  show: boolean
}

const ChatTypingEffect = ({ value, callFunction, show }: ChatTypingEffectProps) => {
  return (
    <>
      {show && (
        <StyledTypewriterWrapper>
          <Typewriter
            options={{
              loop: false,
              // devMode: true,
              delay: 75,
              autoStart: false,
            }}
            onInit={typewriter => {
              typewriter
                .typeString(value)
                .pauseFor(100)
                .callFunction(() => {
                  callFunction()
                })
                .start()
            }}
          />
        </StyledTypewriterWrapper>
      )}
    </>
  )
}

export default ChatTypingEffect

const StyledTypewriterWrapper = styled.div`
  width: 600px;
  color: #fff;
`
