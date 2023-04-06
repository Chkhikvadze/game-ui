/* eslint-disable jsx-a11y/media-has-caption */

import { useRef } from 'react'
import styled from 'styled-components'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Textarea from '@l3-lib/ui-core/dist/Textarea'

import {
  StyledCollectionScroll,
  StyledImage,
  StyledImageWrapper,
  StyledMediaWrapper,
  StyledRoot,
  StyledStoryWrapper,
  StyledTextareaWrapper,
  StyledTextHeaderWrapper,
  StyledTextWrapper,
  StyledLoadingContainer,
  StyledHoverContainer,
  StyledWrapper,
} from 'pages/Project/EditProject/Appearance/Appearance'

import background from 'pages/Project/ProjectForm/assets/background.png'
import background2 from 'pages/Project/ProjectForm/assets/background2.png'
import background3 from 'pages/Project/ProjectForm/assets/background3.png'
import { useEditCollection } from '../useEditCollection'
import { isImage, isVideo } from 'helpers/detectMedia'

const Appearance = () => {
  const { handleUploadImages, formik, onSetDefaultCollectionMedia } = useEditCollection()

  const uploadRef = useRef(null as any)

  const onButtonClick = async (inputFile: any) => {
    inputFile.current.click()
  }

  const { collection_images } = formik?.values

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
          <StyledCollectionScroll>
            {collection_images?.length > 0 ? (
              collection_images?.map((item: any) => {
                const isMainMedia = item.is_main
                return (
                  <>
                    {isImage(item.url) && (
                      <StyledImageWrapper key={item.id} isMain={isMainMedia}>
                        <StyledImage src={item.url} alt='' />
                        <StyledHoverContainer onClick={() => onSetDefaultCollectionMedia(item.id)}>
                          {/* <StyledHoverContainer onClick={() => console.log(item.id)}> */}
                          <span>Set as main</span>
                        </StyledHoverContainer>
                      </StyledImageWrapper>
                    )}
                    {isVideo(item.url) && (
                      <StyledWrapper>
                        <video src={item.url} width='100%' height='100%' controls></video>
                      </StyledWrapper>
                    )}
                  </>
                )
              })
            ) : (
              <>
                <StyledImageWrapper>
                  <StyledImage src={background} alt='' />
                </StyledImageWrapper>
                <StyledImageWrapper>
                  <StyledImage src={background2} alt='' />
                </StyledImageWrapper>
                <StyledImageWrapper>
                  <StyledImage src={background3} alt='' />
                </StyledImageWrapper>
              </>
            )}
            {/* {isLoading && (
              <StyledLoadingContainer className='loading'>Loading...</StyledLoadingContainer>
            )} */}
          </StyledCollectionScroll>
          {/* )} */}
          {/* {isLoading && (
          <StyledLoadingContainer className='loading'>Loading...</StyledLoadingContainer>
        )} */}
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
