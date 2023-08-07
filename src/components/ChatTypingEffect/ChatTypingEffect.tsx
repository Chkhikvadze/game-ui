import { memo } from 'react'
import styled, { css } from 'styled-components'

import Typewriter from 'typewriter-effect'

type ChatTypingEffectProps = {
  value: string
  callFunction: () => void
  typeSpeed?: number
  size?: 'small' | 'large'
}

const ChatTypingEffect = ({
  value,
  callFunction,
  typeSpeed = 50,
  size = 'large',
}: ChatTypingEffectProps) => {
  return (
    <>
      <StyledTypewriterWrapper size={size}>
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

export default memo(ChatTypingEffect)

const StyledTypewriterWrapper = styled.div<{ size: string }>`
  width: 100%;
  color: #fff;

  ${p =>
    p.size === 'small' &&
    css`
      font-size: 14px;
      font-weight: 500;
    `};
`
