/* eslint-disable jsx-a11y/media-has-caption */
import styled from 'styled-components'
import ScrollContainer from 'react-indiana-drag-scroll'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
// import Textarea from '@l3-lib/ui-core/dist/Textarea'

import background from 'pages/Project/ProjectForm/assets/background.png'
import background2 from 'pages/Project/ProjectForm/assets/background2.png'
import background3 from 'pages/Project/ProjectForm/assets/background3.png'
import { useRef, useState } from 'react'
import { useEditProject } from '../useEditProject'
import { isImage, isVideo } from 'helpers/detectMedia'

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

const Appearance = () => {
  const {
    handleUploadImages,
    formik,
    onSetDefaultProjectMedia,
    uploadImageLoading,
    setDefaultImageLoading,
  } = useEditProject()
  const { project_images } = formik?.values

  const uploadRef = useRef(null as any)

  const onButtonClick = async (inputFile: any) => {
    inputFile.current.click()
  }

  const isLoading = uploadImageLoading || setDefaultImageLoading

  const default_images = [{ url: background }, { url: background2 }, { url: background3 }]

  const res =
    project_images?.length > 0
      ? default_images.map((item, index) =>
          project_images[index] ? (item = project_images[index]) : default_images[index],
        )
      : default_images

  const media_array = project_images?.length <= 3 ? res : project_images

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
              onChange={e => handleUploadImages(e)}
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
          {media_array?.map((item: any) => {
            const isMainMedia = item.is_main
            return (
              <>
                {isImage(item.url) && (
                  <StyledImageWrapper key={item.id} isMain={isMainMedia}>
                    <StyledImage src={item.url} alt='' />
                    {item.id && (
                      <StyledHoverContainer onClick={() => onSetDefaultProjectMedia(item.id)}>
                        <span>Set as main</span>
                      </StyledHoverContainer>
                    )}
                  </StyledImageWrapper>
                )}
                {isVideo(item.url) && (
                  <StyledWrapper>
                    <video src={item.url} width='100%' height='100%' controls></video>
                  </StyledWrapper>
                )}
              </>
            )
          })}

          {isLoading && (
            <StyledLoadingContainer className='loading'>Loading...</StyledLoadingContainer>
          )}
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

export const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 55px;
`
export const StyledMediaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
`

export const StyledTextHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  align-items: center;
`

export const StyledCollectionScroll = styled(ScrollContainer)`
  display: flex;
  gap: 16px;
  position: relative;
`

export const StyledHoverContainer = styled.div`
  width: 100%;
  position: absolute;
  height: 100%;
  display: none;
  color: white;
  background: rgba(255, 255, 255, 0.7);
  visibility: hidden;
  display: grid;
  align-items: center;
  justify-content: center;
  span {
    color: var(--color-primitive-aquamarinel-400);
    font-size: 22px;
  }
`

export const StyledWrapper = styled.div`
  display: flex;
  position: relative;
  width: 480px;
  height: 325px;

  min-width: 480px;
  min-height: 325px;

  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`

export const StyledImageWrapper = styled(StyledWrapper)<{ isMain?: boolean }>`
  &:hover ${StyledHoverContainer} {
    visibility: visible;
    cursor: pointer;
  }

  ${({ isMain }) =>
    !isMain &&
    `
  background: rgba(255, 255, 255, 0.1);
  mix-blend-mode: lighten;
  opacity: 0.5
  `}
`

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`
export const StyledStoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`

export const StyledTextareaWrapper = styled.div`
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

export const StyledLoadingContainer = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(100px);
  width: 100%;
  height: 100%;
  color: rgb(255, 255, 255);
  text-align: center;
  display: grid;
  align-items: center;
`
