import styled from 'styled-components'
import adventure from '../../../../assets/images/game.png'
import Heading from '@l3-lib/ui-core/dist/Heading'

const PlayerAssetsEmptyScreen = () => {
  return (
    <StyledContainer>
      <StyledDamnWrapper>
        <Heading type={Heading.types.h1} value='Dammmmm!' size='xx large' customColor={'#ffffff'} />
      </StyledDamnWrapper>

      <StyledResponsiveHeadingWrapper>
        <StyledResponseTextHeading
          type={Heading.types.h1}
          value='Looks like that the player does not yet own the asset!'
          size='small'
          customColor={'#ffffff'}
        />
      </StyledResponsiveHeadingWrapper>
      <StyledImage />
    </StyledContainer>
  )
}

export default PlayerAssetsEmptyScreen

const StyledDamnWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: Center;
  align-items: center;
  width: 238px;
  height: 52px;
  margin-top: 30px;
`

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  mix-blend-mode: lighten;
  //   justify-content: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  // margin-left: 300px;
  height: 1050px;
`

const StyledResponseHeading = styled(Heading)`
  font-size: 40px;
  line-height: 52px;
  justify-content: center;
  align-items: center;
  margin-bottom: 300px;
`

const StyledResponseTextHeading = styled(Heading)`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledHeading = styled(Heading)`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledResponsiveHeadingWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  width: 772px;
  height: 87px;
`
const StyledImage = styled.div`
  display: flex;
  position: relative;
  background-image: url(${adventure});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  //   top: 261px;
  overflow: hidden;
  mix-blend-mode: lighten;
  width: 100%;
  height: 850px;
`
