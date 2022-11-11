import React from 'react'

// import CreatableSelect from 'react-select/creatable'

import styled from 'styled-components'

import { useField } from 'formik'
// import { createFilter } from 'react-select'

import Label from 'oldComponents/atoms/Label'
import ErrorMessage from 'oldComponents/atoms/ErrorMessage'

type creatableSelectType = {
  label?: string | boolean
  labelColor?: string
  name?: any
  mandatory?: boolean
  placeholder?: string
  options?: Array<any>
  isMulti?: boolean
  closeMenuOnSelect?: boolean
}

const CreatableSelectField = ({
  name,
  label,
  labelColor,
  mandatory,
  placeholder,
  options,
  isMulti = false,
  closeMenuOnSelect = false,
}: creatableSelectType) => {
  const [field, meta, {setValue}] = useField(name)
  const isError = meta.error && meta.touched
  
  return (
	<StyledGroupContainer>
	  {label && (
		<StyledLabelContainer>
		  <Label mb={10} color={labelColor ? labelColor: '#333'} weight={500}>
			{label}
			{mandatory && <StyledMandatory> *</StyledMandatory>}
		  </Label>
		</StyledLabelContainer>
	  )}
	  {/* <CreatableSelect
	   value={field.value}
	   isDisabled={false}
	   onChange={(value:any) => setValue(value)}
	   options={options}
	   isMulti={isMulti}
	   onCreateOption={(value:any) => setValue([...(field?.value ?? []), { label: value, value }])}
	   placeholder={placeholder}
	   closeMenuOnSelect={closeMenuOnSelect}
	   filterOption={createFilter({ ignoreCase: true })}
	   isClearable
	   /> */}
	  {isError && <ErrorMessage message={meta.error}/>}
	</StyledGroupContainer>
  )
}

export default CreatableSelectField

const StyledGroupContainer = styled.div`
  font-family: Roboto, sans-serif;
  .css-11jnjyc-control {
    border: 2px solid #ced4da !important;
  }
`

const StyledMandatory = styled.span`
  color: red;
`

const StyledLabelContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  column-gap: 3px;
  align-self: end;
`
