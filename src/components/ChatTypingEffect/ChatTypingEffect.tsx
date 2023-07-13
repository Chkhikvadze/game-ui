import styled from 'styled-components'

import Typewriter from 'typewriter-effect'

type ChatTypingEffectProps = {
  value: string
  callFunction: () => void
  typeSpeed?: number
}

const ChatTypingEffect = ({ value, callFunction, typeSpeed = 50 }: ChatTypingEffectProps) => {
  return (
    <>
      <StyledTypewriterWrapper>
        <Typewriter
          options={{
            loop: false,
            // devMode: true,
            delay: typeSpeed,
            autoStart: false,
          }}
          onInit={typewriter => {
            typewriter
              .stop()
              .typeString(value)
              // .pauseFor(100)
              .start()
              .callFunction(() => {
                callFunction()
              })
          }}
        />
      </StyledTypewriterWrapper>
    </>
  )
}

export default ChatTypingEffect

const StyledTypewriterWrapper = styled.div`
  width: 100%;
  color: #fff;
`
