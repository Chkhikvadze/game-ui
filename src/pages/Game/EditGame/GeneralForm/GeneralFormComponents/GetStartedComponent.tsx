import GetStartedCard from 'pages/Home/GetStarted/GetStartedCard'
import GetStartedContainer from 'pages/Home/GetStarted/GetStartedContainer'

import cardBg1 from '../../../../Home/GetStarted/assets/basicsBg.png'
import cardBg2 from '../../../../Home/GetStarted/assets/gameBg.png'
import cardBg3 from '../../../../Home/GetStarted/assets/developerBg.png'
import cardBg4 from '../../../../Home/GetStarted/assets/whiteBg.png'

const GetStartedComponent = () => {
  return (
    <GetStartedContainer bottomBorder>
      <GetStartedCard
        subTitle={'API'}
        subTitleUnderLine
        title={'Contracts'}
        image={cardBg2}
        bgColor={'orange'}
        link={'https://docs.l3vels.xyz/reference/countcontractsbygameid'}
      />
      <GetStartedCard
        subTitle={'Tutorials'}
        subTitleUnderLine
        title={'Collections'}
        image={cardBg3}
        bgColor={'blue'}
        link={'https://docs.l3vels.xyz/docs/design-manage-collections'}
      />
      <GetStartedCard
        subTitle={'API'}
        subTitleUnderLine
        title={'Assets'}
        image={cardBg1}
        bgColor={'pink'}
        link={'https://docs.l3vels.xyz/reference/getassets'}
      />
      <GetStartedCard
        subTitle={'Tutorials'}
        subTitleUnderLine
        title={'Assets'}
        image={cardBg4}
        bgColor={'red'}
        link={'https://docs.l3vels.xyz/docs/create-organize-assets'}
      />
    </GetStartedContainer>
  )
}

export default GetStartedComponent
