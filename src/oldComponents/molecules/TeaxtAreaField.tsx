import React from 'react'
import styled from 'styled-components'
import { useField } from 'formik'
// import _ from "lodash"
import Label from 'oldComponents/atoms/Label'
import ErrorMessage from 'oldComponents/atoms/ErrorMessage'

const TextAreaField = ({label, labelColor, ...props}: any) => {
  const [field, meta] = useField(props)
  // const {maxlength, maxLengthError} = props
  const isError = meta.touched && meta.error
  
  // const str = field && field.value
  // const fieldValue = _.size(_.words(str))
  // const limit = maxlength - fieldValue <= 0 && 0
  
  return (
    <StyledContainer disabled={props.disabled} className={'text-area-main-container'}>
	  {label && (
        <Label mb={10} color={labelColor ? labelColor: '#333'} weight={500}>
		  {label}
        </Label>
	  )}
	  <StyledTextArea
        isError={isError}
        // maxLength={limit}
        // cols={limit}
        aria-label={label || props.ariaLabel}
        {...field}
        {...props}
	  />
	  {isError && <ErrorMessage message={meta.error}/>}
	  {/*{maxlength &&<StyledMaxlengthContainer maxLengthError={maxLengthError}>{`${maxlength} words limit`}</StyledMaxlengthContainer>}*/}
    </StyledContainer>
  )
}

export default TextAreaField

const StyledContainer = styled.div<{disabled: boolean}>`
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 10px;
  ${(props) => props.disabled && 'opacity: 0.6;'}
`

const StyledTextArea = styled.textarea<{isError?: boolean; maxLengthError?: any}>`
  resize: none;
  outline: none;
  background: transparent;
  border: ${(p) => (p.isError || p.maxLengthError ? '2px solid #B81237': '1px solid #CED4DA')};
  box-sizing: border-box;
  border-radius: 4px;
  height: 136px;
  padding: 10px 15px;
  color: #495057;
  font-family: Roboto, sans-serif;
  font-size: 1rem;
`

export const StyledMaxlengthContainer = styled.div<{maxLengthError?: any}>`
  margin-top: -10px;
  justify-self: end;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: ${(p) => (p.maxLengthError ? '#B81237': '#898888')};
`
