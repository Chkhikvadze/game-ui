import React from 'react'
import styled from 'styled-components'
import adventure from '../../assets/images/game.png'
import Heading from '@l3-lib/ui-core/dist/Heading'

export const GamePageEmptyScreen = () => {
  return (
    <StyledContainer>
      <StyledResponseHeading
        type={Heading.types.h1}
        value='Dammmmm!'
        size='xx large'
        customColor={'#ffffff'}
      />
      <StyledResponsiveHeadingWrapper>
        <StyledResponseTextHeading
          type={Heading.types.h1}
          value="Looks like you haven't spawned any games yet!"
          size='small'
          customColor={'#ffffff'}
        />
        <StyledHeading
          type={Heading.types.h1}
          value='Time to start brainstorming and bringing your epic ideas to life.'
          size='small'
          customColor={'#ffffff'}
        />
      </StyledResponsiveHeadingWrapper>
      <StyledImage />
    </StyledContainer>
  )
}

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  mix-blend-mode: lighten;
  justify-content: center;
  flex-direction: column;
`

export const StyledResponseHeading = styled(Heading)`
  font-size: 40px;
  line-height: 52px;
  justify-content: center;
  align-items: center;
`

export const StyledResponseTextHeading = styled(Heading)`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const StyledHeading = styled(Heading)`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const StyledResponsiveHeadingWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  width: 772px;
  height: 87px;
`
export const StyledImage = styled.div`
  display: flex;
  position: absolute;
  background-image: url(${adventure});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  top: 261px;
  overflow: hidden;
  mix-blend-mode: lighten;
  width: 100%;
  height: 790px;
`
