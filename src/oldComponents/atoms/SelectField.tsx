import React from 'react'
import styled from 'styled-components'
import { useField } from 'formik'

import DropdownMenu from 'oldComponents/molecules/DropdownMenu'
import RadioField from 'oldComponents/atoms/RadioField'

const StyledTrigger = styled.div<{fullWidth?: boolean}>`
  max-width: ${p => p.fullWidth ? '100%': '170px'};
  font-family: "Roboto", sans-serif;
  height: 38px;
  background-color: white;
  display: flex;
  padding: 0px 10px;
  align-items: center;
  border: 1px solid #CED4DA;
  border-radius: 4px;
`

const StyledTypography = styled.span`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const StyledOptionsContainer = styled.div`
  display: grid;
  grid-row-gap: 4px;
  border: 1px solid #ddd;
  padding: 10px;
  position: relative;
  top: -10px;
  background-color: white;
  width: 170px;
`

const StyledRadioField = styled(RadioField)`
  grid-template-columns: 16px auto;

  &:last-child {
    margin-bottom: 0px;
  }
`

type SelectFieldProps = {
  name: string,
  className?: string,
  placeholder: string,
  fullWidth?: boolean,
  options: Array<{value: string, label: string}>
}

const SelectField = ({name, className, placeholder, fullWidth, options}: SelectFieldProps) => {
  const [field] = useField(name)
  const label = options
    .find(option => field.value === option.value)
    ?.label
  
  return (
    <DropdownMenu
	  trigger={(
        <StyledTrigger className={className} fullWidth={fullWidth}>
		  <StyledTypography>
            {label || placeholder}
		  </StyledTypography>
        </StyledTrigger>
	  )}
    >
	  {() => (
        <StyledOptionsContainer>
		  {options.map((option, i) => (
            <StyledRadioField
			  key={i}
			  label={option.label}
			  name={name}
			  value={option.value}
            />
		  ))}
        </StyledOptionsContainer>
	  )}
    </DropdownMenu>
  )
}

export default SelectField
