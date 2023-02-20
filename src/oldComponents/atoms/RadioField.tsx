import React from 'react'
import styled from 'styled-components'
import { useField } from 'formik'

import Label from './Label'

const StyledRadioFieldContainer = styled.label`
  display: inline-grid;
  grid-auto-flow: column;
  align-items: center;
  cursor: pointer;
  grid-column-gap: 7px;
`

const StyledFixedScale = styled.div`
  width: 18px;
  height: 18px;
`

const StyledInputContainer = styled.div<{ checked: boolean }>`
  position: relative;
  margin-bottom: 0px;

  &:before {
    content: '';
    width: 1rem;
    height: 1rem;
    border: ${props =>
      props.checked ? '5px solid #19B3FF; width: 0.5rem; height: 0.5rem;' : '1px solid #CED4DA'};
    background-color: white;
    display: block;
    border-radius: 50%;
  }
`

const StyledInput = styled.input`
  display: none;
`

type RadioFieldProps = {
  label: string
  value: string
  className?: string
  onChange?: () => void
  name: string
}

const RadioField = ({ label, value, onChange, className, name }: RadioFieldProps) => {
  const [field] = useField(name)
  const checked = field.value === value

  const handleChange = (event: any) => {
    field.onChange(event)
    if (onChange) onChange()
  }

  return (
    <StyledRadioFieldContainer className={className}>
      <StyledFixedScale>
        <StyledInputContainer checked={checked}>
          <StyledInput
            {...field}
            type='radio'
            value={value}
            checked={checked}
            onChange={handleChange}
          />
        </StyledInputContainer>
      </StyledFixedScale>

      <Label color='#333'>{label}</Label>
    </StyledRadioFieldContainer>
  )
}

export default RadioField
