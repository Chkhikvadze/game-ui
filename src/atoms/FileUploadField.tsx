import React from 'react'
import styled from 'styled-components'
import { useField } from 'formik'
import Label from 'oldComponents/atoms/Label'
import ErrorMessage from 'oldComponents/atoms/ErrorMessage'

const FileUploadField = ({label, labelColor, name, ...props}: any) => {
  const [field, meta] = useField(name)
  const isError = meta.touched && meta.error
  
  
  return (
	<StyledContainer>
	  {label && (
		<Label mb={10} color={labelColor ? labelColor: '#333'} weight={500}>
		  {label}
		</Label>
	  )}
	  <input
		type={'file'}
		{...field}
		{...props}
	  />
	  {isError && <ErrorMessage message={meta.error}/>}
	</StyledContainer>
  )
}

export default FileUploadField

const StyledContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 10px;
`

