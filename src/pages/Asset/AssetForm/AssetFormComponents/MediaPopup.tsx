import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Close from '@l3-lib/ui-core/dist/icons/Close'
import Image from '@l3-lib/ui-core/dist/icons/Image'
import Loader from '@l3-lib/ui-core/dist/Loader'

type MediaPopupProps = {
  show: boolean
  close: () => void
  handleUploadImages?: any
  loadingMediaUpload?: boolean
}

const MediaPopup: React.FC<MediaPopupProps> = ({
  show,
  close,
  handleUploadImages,
  loadingMediaUpload,
}) => {
  const uploadRef = useRef(null as any)

  const onButtonClick = async () => {
    uploadRef.current.click()
  }

  return (
    <StyledMediaPopup show={show}>
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
          onClick={close}
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
  )
}

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

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledWrapper = styled.div`
  width: 100%;

  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const StyledUploadButton = styled.div<{ disabled?: boolean }>`
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
  // Use the default value for disabled if it's not provided
  pointer-events: ${props => (props.disabled === true ? 'none' : 'auto')};
`

const StyledImageIcon = styled(Image)`
  color: transparent;
`

export default MediaPopup
