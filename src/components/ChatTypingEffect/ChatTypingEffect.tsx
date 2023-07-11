import styled from 'styled-components'

import Typewriter from 'typewriter-effect'

type ChatTypingEffectProps = {
  value: string
  callFunction: () => void
  show: boolean
  typeSpeed?: number
}

const ChatTypingEffect = ({ value, callFunction, show, typeSpeed = 50 }: ChatTypingEffectProps) => {
  return (
    <>
      {show && (
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
  width: 100%;
  color: #fff;
`
