import React from 'react'
import styled from 'styled-components'
import image from '../../assets/images/left-column.png'
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
      {/* <img
                src={image}
                alt='fortNite'
                style={{ height: '564.49px', width: '801px', marginTop: '24px', top:   }}
              /> */}
    </StyledContainer>
  )
}

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
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
