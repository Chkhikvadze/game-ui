import styled, { css } from 'styled-components'

import { useEffect, useRef, useState } from 'react'

import Typography from '@l3-lib/ui-core/dist/Typography'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Textarea from '@l3-lib/ui-core/dist/Textarea'
import Loader from '@l3-lib/ui-core/dist/Loader'
import Icon from '@l3-lib/ui-core/dist/Icon'

import Add from '@l3-lib/ui-core/dist/icons/Add'
import Description from '@l3-lib/ui-core/dist/icons/Description'
import Close from '@l3-lib/ui-core/dist/icons/Close'
import Image from '@l3-lib/ui-core/dist/icons/Image'
import { StyledHeader } from './ContentMenu'
import ScrollContainer from 'react-indiana-drag-scroll'
import RichtextEditor from 'components/RichtextEditor/RichtextEditor'
import { useModal } from 'hooks'
import { useTranslation } from 'react-i18next'

type ActionFooterProps = {
  handleUploadImages?: any
  loadingMediaUpload?: boolean
  formik: any
  setBgImage: any
  bgImage: string
  handleDeleteImages?: any
}

const ActionFooter = ({
  handleUploadImages,
  loadingMediaUpload = false,
  formik,
  setBgImage,
  bgImage,
  handleDeleteImages,
}: ActionFooterProps) => {
  const { medias, asset_description } = formik?.values

  const [descriptionIsEditing, setDescriptionIsEditing] = useState(false)
  const [showMediaPopup, setShowMediaPopup] = useState(false)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(-1)
  const { openModal, closeModal } = useModal()
  const { t } = useTranslation()

  const uploadRef = useRef(null as any)

  const onButtonClick = async () => {
    uploadRef.current.click()
  }

  useEffect(() => {
    if (medias?.length) {
      setBgImage(medias[0].url)
    }
    if (medias?.length === 0) {
      setBgImage('')
    }
  }, [medias])

  const onDescriptionChange = async (value: string) => {
    await formik?.setFieldValue('asset_description', value)
  }

  const handleDeletePhoto = (url: string) => {
    const updatedMedias = medias.filter((m: { url: string }) => m.url !== url)
    handleDeleteImages(updatedMedias)
  }

  return (
    <>
      <StyledMediaPopup show={showMediaPopup}>
        <StyledHeader>
          <Typography
            value={'Media'}
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor={'#FFF'}
          />
          <IconButton
            size={IconButton.sizes.SMALL}
            icon={Close}
            kind={IconButton.kinds.TERTIARY}
            onClick={() => setShowMediaPopup(false)}
          />
        </StyledHeader>
        <StyledWrapper>
          <input
            type='file'
            multiple
            ref={uploadRef}
            style={{ display: 'none' }}
            onChange={e => handleUploadImages(e)}
          />

          <StyledUploadButton onClick={onButtonClick} disabled={loadingMediaUpload}>
            {loadingMediaUpload ? (
              <Loader size={48} />
            ) : (
              <>
                <StyledImageIcon />
                <Typography
                  value=' jpeg, png, mp4, obj, stl'
                  type={Typography.types.LABEL}
                  size={Typography.sizes.xss}
                  customColor={'rgba(255, 255, 255, 0.8)'}
                />
              </>
            )}
          </StyledUploadButton>
        </StyledWrapper>
      </StyledMediaPopup>

      <StyledActionFooter descriptionIsEditing={descriptionIsEditing}>
        {descriptionIsEditing && (
          <StyledTextareaWrapper>
            <StyledButtonWrapper>
              <IconButton
                size={IconButton.sizes.LARGE}
                icon={() => <Close />}
                kind={IconButton.kinds.TERTIARY}
                onClick={() => setDescriptionIsEditing(false)}
              />
            </StyledButtonWrapper>
            <RichtextEditor
              onChange={onDescriptionChange}
              value={asset_description}
              transparent
              centeredToolbar
            />
          </StyledTextareaWrapper>
        )}

        {!descriptionIsEditing && (
          <>
            <StyledDescriptionButton onClick={() => setDescriptionIsEditing(true)}>
              <Description />
              <Typography
                value='Story'
                type={Typography.types.LABEL}
                size={Typography.sizes.xss}
                customColor={'#FFF'}
              />
            </StyledDescriptionButton>

            <StyledVerticalDivider />

            <StyledAddMediaButton onClick={() => setShowMediaPopup(true)}>
              <Add />
            </StyledAddMediaButton>

            <StyledCollectionScroll>
              {medias?.map((media: any, index: number) => (
                <StyledMedia
                  key={index}
                  backgroundImage={media.url}
                  onClick={() => {
                    setBgImage(media.url)
                    setSelectedPhotoIndex(index)
                  }}
                  selected={bgImage === media.url}
                >
                  {selectedPhotoIndex === index && (
                    <DeleteButtonContainer>
                      <StyledIcon
                        onClick={() => handleDeletePhoto(media.url)}
                        iconSize={23}
                        icon={Close}
                      />
                    </DeleteButtonContainer>
                  )}
                </StyledMedia>
              ))}
            </StyledCollectionScroll>
          </>
        )}
      </StyledActionFooter>
    </>
  )
}

export default ActionFooter

const StyledActionFooter = styled.div<{ descriptionIsEditing: boolean }>`
  position: absolute;
  bottom: 24px;

  width: 327px;
  height: 78px;

  padding: 12px 8px;

  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0px 3px 30px rgba(0, 0, 0, 0.3), 0px 3px 10px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(96.6443px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 10px;

  display: flex;
  gap: 16px;

  ${p =>
    p.descriptionIsEditing &&
    css`
      width: 100%;
      height: 100%;
      bottom: 0;

      padding: 20px;
    `};
`

const StyledButtonWrapper = styled.div`
  position: absolute;
  right: 20px;
`

const StyledDescriptionButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin-right: -12px;

  gap: 4px;

  color: #fff;

  width: 48px;
  min-width: 48px;
  height: 56px;

  cursor: pointer;
`
const StyledVerticalDivider = styled.div`
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  height: 100%;
`
const StyledAddMediaButton = styled.div`
  width: 54px;
  min-width: 54px;
  height: 54px;

  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`
const StyledTextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;

  gap: 20px;
`
const StyledMediaPopup = styled.div<{ show: boolean }>`
  position: absolute;

  bottom: 126px;

  display: none;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 12px;
  gap: 4px;

  width: 244px;
  height: 271px;
  overflow-y: auto;

  background: rgba(0, 0, 0, 0.7);
  box-shadow: 2px 6px 15px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(50px);

  border-radius: 6px;

  ${p =>
    p.show &&
    css`
      display: flex;
    `};
`
const StyledWrapper = styled.div`
  width: 100%;

  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const StyledUploadButton = styled.div<{ disabled: boolean }>`
  width: 220px;
  height: 141px;

  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 13px;

  cursor: pointer;

  ${p =>
    p.disabled &&
    css`
      pointer-events: none;
    `};
`
const StyledImageIcon = styled(Image)`
  color: transparent;
`
const StyledMedia = styled.div<{ selected: boolean; backgroundImage: string }>`
  width: 54px;
  height: 54px;
  border-radius: 6px;
  border: 2px solid transparent;
  background-image: ${props => `url(${props.backgroundImage})`};
  background-size: cover;
  background-position: center;
  position: relative;

  cursor: pointer;
  ${props =>
    props.selected &&
    css`
      border: 1px solid #73fafd;
    `};
`

const DeleteButtonContainer = styled.div`
  position: absolute;
  top: -3px;
  right: -3px;
  width: 20px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  outline: none;

  &:focus,
  &:active {
    outline: none; /* Add this line to remove the outline when clicked */
  }

  ${StyledMedia}:hover & {
    opacity: 1;
    outline: none;
  }
`

const StyledIcon = styled(Icon)`
  outline: none;
`

const StyledCollectionScroll = styled(ScrollContainer)`
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;
  gap: 6px;
`
