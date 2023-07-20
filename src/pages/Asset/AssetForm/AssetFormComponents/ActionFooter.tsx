import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Add from '@l3-lib/ui-core/dist/icons/Add'
import Description from '@l3-lib/ui-core/dist/icons/Description'
import Close from '@l3-lib/ui-core/dist/icons/Close'
import MenuButton from '@l3-lib/ui-core/dist/MenuButton'
import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'
import RichtextEditor from 'components/RichtextEditor/RichtextEditor'
import { useTranslation } from 'react-i18next'
import MediaPopup from './MediaPopup'
import MediaCollection from './MediaCollection'

type ActionFooterProps = {
  handleUploadImages?: any
  loadingMediaUpload?: boolean
  formik: any
  setBgImage: any
  bgImage: string
  handleDeleteImages?: any
}

const ActionFooter: React.FC<ActionFooterProps> = ({
  handleUploadImages,
  loadingMediaUpload = false,
  formik,
  setBgImage,
  bgImage,
  handleDeleteImages,
}) => {
  const { medias, asset_description } = formik?.values
  const [descriptionIsEditing, setDescriptionIsEditing] = useState(false)
  const [showMediaPopup, setShowMediaPopup] = useState(false)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(-1)
  const { t } = useTranslation()
  const uploadRef = useRef(null as any)

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

  const handleDeleteSelectedPhoto = () => {
    if (selectedPhotoIndex !== -1) {
      const updatedMedias = medias.filter(
        (m: { url: string }, index: number) => index !== selectedPhotoIndex,
      )
      handleDeleteImages(updatedMedias)
      setSelectedPhotoIndex(-1)
    }
  }

  return (
    <>
      <MediaPopup
        show={showMediaPopup}
        close={() => setShowMediaPopup(false)}
        handleUploadImages={handleUploadImages}
        loadingMediaUpload={loadingMediaUpload}
      />
      <StyledActionFooter descriptionIsEditing={descriptionIsEditing}>
        {descriptionIsEditing ? (
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
        ) : (
          <>
            <StyledDescriptionButton onClick={() => setDescriptionIsEditing(true)}>
              <Description size='32' />
            </StyledDescriptionButton>
            <StyledVerticalDivider />
            <MediaCollection
              medias={medias}
              bgImage={bgImage}
              setBgImage={setBgImage}
              setSelectedPhotoIndex={setSelectedPhotoIndex}
              handleDeletePhoto={handleDeletePhoto}
              selectedPhotoIndex={selectedPhotoIndex}
            />
            <StyledAddMediaButton onClick={() => setShowMediaPopup(true)}>
              {/* <Add size='22' /> */}
              <IconButton
                size={IconButton.sizes.SMALL}
                icon={() => <Add size='22' />}
                kind={IconButton.kinds.TERTIARY}
              />
            </StyledAddMediaButton>
            <MenuButton component={MenuDots}>
              <StyledButtonsWrapper>
                <StyledClickableDiv onClick={handleDeleteSelectedPhoto}>
                  <Typography
                    value='Delete'
                    type={Typography.types.LABEL}
                    size={Typography.sizes.md}
                    customColor={'rgba(250,250,250, 0.8)'}
                  />
                </StyledClickableDiv>
              </StyledButtonsWrapper>
            </MenuButton>
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
  align-items: center;
  width: 396px;
  height: 72px;
  padding: 12px 8px;
  background: #4b7cda;
  border-radius: 100px;
  display: flex;
  gap: 16px;
  ${p =>
    p.descriptionIsEditing &&
    css`
      width: 100%;
      height: 100%;
      bottom: 0;
      border-radius: 0;
      padding: 20px;
    `};
`

const StyledButtonWrapper = styled.div`
  position: absolute;
  right: 20px;
`

export const StyledClickableDiv = styled.div`
  cursor: pointer;
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
  width: 38px;
  min-width: 38px;
  height: 38px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const StyledButtonsWrapper = styled.div`
  margin-top: 15px;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  background: rgba(0, 0, 0, 0.2);
  padding: 16px;
  box-shadow: 2px 6px 15px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(50px);
  border-radius: 6px;
`

const StyledTextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 20px;
`
