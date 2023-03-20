import styled from 'styled-components'
import ScrollContainer from 'react-indiana-drag-scroll'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
// import Textarea from '@l3-lib/ui-core/dist/Textarea'

import background from '../ProjectForm/assets/background.png'
import background2 from '../ProjectForm/assets/background2.png'
import background3 from '../ProjectForm/assets/background3.png'
import { useRef } from 'react'

// import Bold from '@l3-lib/ui-core/dist/icons/Bold'
// import Italic from '@l3-lib/ui-core/dist/icons/Italic'
// import Underline from '@l3-lib/ui-core/dist/icons/Underline'
// import BulletList from '@l3-lib/ui-core/dist/icons/BulletList'
// import Numbers from '@l3-lib/ui-core/dist/icons/Numbers'
// import Description from '@l3-lib/ui-core/dist/icons/Description'
// import Image from '@l3-lib/ui-core/dist/icons/Image'

type AppearanceProps = {
  formik: any
  handleUploadImages: any
}

const Appearance = ({ formik, handleUploadImages }: AppearanceProps) => {
  const uploadRef = useRef(null as any)

  const onButtonClick = async (inputFile: any) => {
    inputFile.current.click()
  }

  return (
    <StyledRoot>
      <StyledMediaWrapper>
        <StyledTextWrapper>
          <StyledTextHeaderWrapper>
            <Heading type={Heading.types.h1} value='Media' size='medium' />
            <Button kind={Button.kinds.SECONDARY} onClick={() => onButtonClick(uploadRef)}>
              Add
            </Button>
            <input
              type='file'
              multiple
              ref={uploadRef}
              style={{ display: 'none' }}
              onChange={(e: unknown) => handleUploadImages(e)}
            />
          </StyledTextHeaderWrapper>
          <Typography
            value='Customize the look and feel of your collection with any sort of media files; we support video, images and gifs'
            type={Typography.types.P}
            size={Typography.sizes.lg}
            customColor={'rgba(255, 255, 255, 0.6)'}
          />
        </StyledTextWrapper>
        <StyledCollectionScroll>
          <StyledImageWrapper>
            <StyledImage src={background} alt='' />
            {/* <div style={{ position: 'absolute' }}>
              <Typography
                value='The main background'
                type={Typography.types.P}
                size={Typography.sizes.lg}
                customColor={'rgba(255, 255, 255, 0.8)'}
              />
            </div> */}
          </StyledImageWrapper>
          <StyledImageWrapper>
            <StyledImage src={background2} alt='' />
          </StyledImageWrapper>
          <StyledImageWrapper>
            <StyledImage src={background3} alt='' />
          </StyledImageWrapper>
        </StyledCollectionScroll>
      </StyledMediaWrapper>

      <StyledStoryWrapper>
        <StyledTextWrapper>
          <Heading type={Heading.types.h1} value='Story' size='medium' />

          <Typography
            value='Time to start brainstorming and bringing your epic stories to life'
            type={Typography.types.P}
            size={Typography.sizes.lg}
            customColor={'rgba(255, 255, 255, 0.6)'}
          />
        </StyledTextWrapper>

        <StyledTextareaWrapper>
          {/* <StyledButtonWrapper>
            <Bold />
            <Italic />
            <Underline />
            <BulletList />
            <Numbers />
            <Description />
            <Description />
            <Description />
            <Image />
          </StyledButtonWrapper> */}
          {/* <Textarea placeholder='Label' /> */}
          <StyledPseudoTextarea>
            <Typography
              value={`Founded in 2018, X World Games (“XWG”) aims to build the next-gen decentralized gaming metaverse.

X World Games' vision is to build a diversified gaming ecosystem that connects traditional gamers with the blockchain world and invite more game developers into the crypto space by creating and providing the underlying blockchain framework.

With its gaming innovation, crypto game - Dream Card & Hero Card, Metaverse entertainment - Dream Idols, NFT Marketplace and DeFi Pool, X World Games now serves over 2 million registered gamers, and has quickly become the fastest-growing crypto gaming platform in the ecosystem.

X World Games is headquartered in Singapore with a 100+ dynamic team located worldwide.`}
              type={Typography.types.LABEL}
              size={Typography.sizes.lg}
            />
          </StyledPseudoTextarea>
        </StyledTextareaWrapper>
      </StyledStoryWrapper>
    </StyledRoot>
  )
}

export default Appearance

const StyledRoot = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 56px;

  gap: 55px;
`
const StyledMediaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
`

export const StyledTextHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  align-items: center;
`

const StyledCollectionScroll = styled(ScrollContainer)`
  display: flex;
  gap: 16px;
`
const StyledImageWrapper = styled.div`
  display: flex;
  position: relative;
  width: 480px;
  height: 325px;

  min-width: 480px;
  min-height: 325px;

  justify-content: center;
  align-items: center;

  background: rgba(255, 255, 255, 0.1);
  mix-blend-mode: lighten;
`

const StyledImage = styled.img`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  opacity: 0.5;
`
export const StyledStoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const StyledTextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`

// const StyledButtonWrapper = styled.div`
//   display: flex;
//   gap: 30px;
//   align-items: center;
// `
export const StyledPseudoTextarea = styled.div`
  width: 100%;
  height: 400px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 10px;
  padding-left: 18px;
`
