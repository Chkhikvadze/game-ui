import React from 'react'
import styled from 'styled-components'
import Label from 'oldComponents/atoms/Label'
import LoaderProgress from 'atoms/Loaders/LoaderProgress'
import { Cross1Icon } from '@radix-ui/react-icons'

const FileUploadField = ({
  label,
  labelColor,
  name,
  description,
  img,
  fileUploadType,
  className,
  uploadIcon,
  onDeleteImg,
  ...props
}: any) => (
  <StyledContainer>
    {label && (
      <Label color={labelColor ? labelColor : '#333'} weight={500}>
        {label}
      </Label>
    )}

    {!img && (
      <StyledUploadLabel className={className}>
        <>
          <StyledInput type={'file'} {...props} />
          {fileUploadType !== name && !img ? uploadIcon : <LoaderProgress />}
        </>
      </StyledUploadLabel>
    )}
    {img && (
      // <>
      <StyledImageContainer className={className}>
        <StyledImage src={img} alt={''} />
        <StyledHoverContainer onClick={onDeleteImg}>
          <StylerRemoveIcon />
        </StyledHoverContainer>
      </StyledImageContainer>
      // </>
    )}
    {description && (
      <Label size={'small'} color={labelColor ? labelColor : '#333'}>
        {description}
      </Label>
    )}
  </StyledContainer>
)

export default FileUploadField

const StyledContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 10px;
`

const StyledUploadLabel = styled.label`
  padding: 6px 12px;
  cursor: pointer;
  background-color: darkgrey;
  display: grid;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`

const StyledInput = styled.input.attrs({ type: 'file' })`
  display: none;
`

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
`

const StyledHoverContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  align-content: center;
  justify-content: center;
  background-color: rgba(208, 214, 219, 0.5);
  visibility: hidden;
`

const StylerRemoveIcon = styled(Cross1Icon)`
  color: #ffffff;
  width: 30px;
  height: 30px;
`

const StyledImageContainer = styled.div`
  position: relative;
  overflow: hidden;

  :hover {
    ${StyledHoverContainer} {
      visibility: visible;
    }
  }
`
