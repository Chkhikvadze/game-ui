import React from 'react'
import styled from 'styled-components'
import { useField } from 'formik'

import Label from './Label'
import ToolTipItem, { TooltipItemType } from 'oldComponents/molecules/TooltipItem'

const StyledSwitchContainer = styled.div`
  display: grid;
  grid-row-gap: 6px;
`

const StyledFlexContainer = styled.div`
  display: flex;
  align-items: center;
`

const StyledSliderContainer = styled.label`
  display: inline-flex;
  width: 54px;
  height: 28px;
  position: relative;
  margin-bottom: 0px;
  margin-right: 8px;
`

const StyledSlider = styled.div<{checked: boolean}>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.checked
    ? '#2196F3'
    : '#ccc'};
  border-radius: 30px;
  transition: .4s;

  &:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    border-radius: 12px;
    left: 4px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    ${props => props.checked && 'transform: translateX(24px);'}
  }
`

const StyledInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`

type SwitchFieldProps = {
  className?: string,
  name: string,
  label: string,
  tooltipProps?: TooltipItemType,
}

const SwitchField = ({className, name, label, tooltipProps}: SwitchFieldProps) => {
  const [field] = useField(name)
  
  return (
    <StyledSwitchContainer className={className}>
	  <Label color="black">
        {label}
        {tooltipProps && <ToolTipItem {...tooltipProps} />}
	  </Label>
	  
	  <StyledFlexContainer>
        <StyledSliderContainer>
		  <StyledInput type="checkbox" {...field} />
		  <StyledSlider checked={field.value}/>
        </StyledSliderContainer>
		
        <Label color="black" weight={500}>
		  {field.value ? 'YES': 'NO'}
        </Label>
	  </StyledFlexContainer>
    </StyledSwitchContainer>
  )
}

export default SwitchField
