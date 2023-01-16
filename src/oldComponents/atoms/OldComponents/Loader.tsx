import React from 'react'
import styled, { keyframes } from 'styled-components'

import part1 from 'assets/old/images/Loader/logo-part-1.svg'
import part2 from 'assets/old/images/Loader/logo-part-2.svg'
import part3 from 'assets/old/images/Loader/logo-part-3.svg'
import part4 from 'assets/old/images/Loader/logo-part-4.svg'
import Typography from 'oldComponents/atoms/Typography'

import { useTranslation } from 'react-i18next'

type LoaderProps = {
  onTimeout?: () => void
  className?: string
  timeout?: number
}

const Loader = ({ onTimeout, className, timeout }: LoaderProps) => {
  const timerRef = React.useRef<any>()

  React.useEffect(
    () => {
      if (onTimeout) {
        timerRef.current = setTimeout(onTimeout, timeout)
      }
      return () => clearInterval(timerRef.current)
    },
    [], // eslint-disable-line
  )

  const { t } = useTranslation()

  return (
    <StyledLoaderContainer className={className}>
      <StyledAnimationContainer>
        <StyledImage speed={6} src={part1} alt="part1" />
        <StyledImage speed={2} src={part2} alt="part2" />
        <StyledImage speed={0.6} src={part3} alt="part3" />
        <StyledImage speed={0} src={part4} alt="part4" />
      </StyledAnimationContainer>

      <Typography variant="h3" mt={32}>
        {t('acceleratingToTopSpeed')}
      </Typography>
    </StyledLoaderContainer>
  )
}

const StyledLoaderContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  left: 0px;
  top: 0px;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
`

const StyledAnimationContainer = styled.div`
  position: relative;
  width: 100px;
  height: 116px;
`

const animationKeyframes = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const StyledImage = styled.img<{ speed: number }>`
  width: 100px;
  height: 116px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  mix-blend-mode: multiply;
  animation: ${animationKeyframes} infinite ${(props) => props.speed}s linear;
`

export default Loader
