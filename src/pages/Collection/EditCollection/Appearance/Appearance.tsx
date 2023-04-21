/* eslint-disable jsx-a11y/media-has-caption */

import { useRef } from 'react'
import styled from 'styled-components'

import ScrollableMediaUpload from 'components/ScrollableMediaUpload'
import { useEditCollection } from '../useEditCollection'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Textarea from '@l3-lib/ui-core/dist/Textarea'

import background from 'pages/Game/GameForm/assets/background.png'
import background2 from 'pages/Game/GameForm/assets/background2.png'
import background3 from 'pages/Game/GameForm/assets/background3.png'

import {
  StyledMediaWrapper,
  StyledRoot,
  StyledStoryWrapper,
  StyledTextareaWrapper,
  StyledTextHeaderWrapper,
  StyledTextWrapper,
} from 'pages/Game/EditGame/Appearance/Appearance'

const Appearance = () => {
  const {
    handleUploadImages,
    formik,
    onSetDefaultCollectionMedia,
    setDefaultMediaLoading,
    uploadImageLoading,
  } = useEditCollection()

  const uploadRef = useRef(null as any)

  const onButtonClick = async (inputFile: any) => {
    inputFile.current.click()
  }

  const { collection_images } = formik?.values

  const isLoading = uploadImageLoading || setDefaultMediaLoading

  const default_images = [{ url: background }, { url: background2 }, { url: background3 }]

  const merged_images =
    collection_images?.length > 0
      ? default_images.map((item, index) =>
          collection_images[index] ? (item = collection_images[index]) : default_images[index],
        )
      : default_images

  const media_array = collection_images?.length <= 3 ? merged_images : collection_images

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
        <ScrollableMediaUpload
          loading={isLoading}
          media_array={media_array}
          onSetDefaultImage={onSetDefaultCollectionMedia}
        />
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
          <StyledTextareaDiv>
            <Textarea placeholder='Your story...' />
          </StyledTextareaDiv>
        </StyledTextareaWrapper>
      </StyledStoryWrapper>
    </StyledRoot>
  )
}

export default Appearance

const StyledTextareaDiv = styled.div`
  width: 100%;
  height: 400px;
`
