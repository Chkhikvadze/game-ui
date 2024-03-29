/* eslint-disable jsx-a11y/media-has-caption */
import { useRef } from 'react'

import styled from 'styled-components'
import ScrollContainer from 'react-indiana-drag-scroll'

import { useEditGame } from '../useEditGame'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
// import Textarea from '@l3-lib/ui-core/dist/Textarea'

import background from 'pages/Game/GameForm/assets/background.png'
import background2 from 'pages/Game/GameForm/assets/background2.png'
import background3 from 'pages/Game/GameForm/assets/background3.png'
import ScrollableMediaUpload from 'components/ScrollableMediaUpload'
import RichtextEditor from 'components/RichtextEditor/RichtextEditor'
import FormikAutoSave from 'helpers/FormikAutoSave'
import { FormikProvider } from 'formik'

const Appearance = () => {
  const {
    handleUploadImages,
    formik,
    onSetDefaultGameMedia,
    uploadImageLoading,
    setDefaultImageLoading,
  } = useEditGame()

  const { game_images = [], game_description } = formik?.values

  const uploadRef = useRef(null as any)

  const onButtonClick = async (inputFile: any) => {
    inputFile.current.click()
  }

  const isLoading = uploadImageLoading || setDefaultImageLoading

  const default_images = [{ url: background }, { url: background2 }, { url: background3 }]

  const merged_images =
    game_images?.length > 0
      ? default_images.map((item, index) =>
          game_images[index] ? (item = game_images[index]) : default_images[index],
        )
      : default_images

  const media_array = game_images?.length <= 3 ? merged_images : game_images

  const onDescriptionChange = async (value: string) => {
    await formik?.setFieldValue('game_description', value)
  }

  return (
    <StyledRoot>
      <FormikProvider value={formik}>
        <FormikAutoSave />
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
            <ScrollableMediaUpload
              loading={isLoading}
              media_array={media_array}
              onSetDefaultImage={onSetDefaultGameMedia}
            />
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
            <RichtextEditor onChange={onDescriptionChange} value={game_description || ''} />
          </StyledTextareaWrapper>
        </StyledStoryWrapper>
      </FormikProvider>
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
export const StyledMainImgContainer = styled.div<{ isMain?: boolean }>`
  width: 100%;
  position: absolute;
  height: auto;
  bottom: 0;
  display: grid;
  align-items: center;
  justify-content: start;
  padding: 16px 24px 20px 24px;
  border-radius: 0px 0px 8px 8px;
  display: grid;
  visibility: ${p => (p.isMain ? 'visible' : 'hidden')};

  ${({ isMain }) =>
    isMain &&
    `
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
  `}
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

const StyledHoverOverlay = styled.div<{ isMain?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  ${({ isMain }) =>
    isMain &&
    `
    background: rgba(255, 255, 255, 0.1);
    // mix-blend-mode: lighten;
`}
`

export const StyledImageWrapper = styled(StyledWrapper)<{ isMain?: boolean }>`
  ${({ isMain }) =>
    !isMain &&
    `
  &:hover ${StyledMainImgContainer} {
    visibility: visible;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
  }

  &:hover ${StyledHoverOverlay} {
    background: rgba(255, 255, 255, 0.2);
    mix-blend-mode: unset;
  }
  `}
`

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
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
