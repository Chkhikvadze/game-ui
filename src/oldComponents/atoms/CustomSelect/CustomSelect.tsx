import React, { ReactElement } from 'react'
// import ReactTooltip from 'react-tooltip'
import Select from 'react-select'
import styled from 'styled-components'
import { useField, useFormikContext } from 'formik'

import Label from 'oldComponents/atoms/Label'
import ErrorMessage from 'oldComponents/atoms/ErrorMessage'

type CustomSelectFieldType = {
  options: Array<any>
  name: any
  label?: string
  placeholder?: string
  tooltip?: string
  disabled?: boolean
  isHighlighted?: boolean
  ariaLabel?: any
  isSearchable?: boolean
  labelColor?: string
  mandatory?: boolean
  toolTipText?: string
  defaultButton?: ReactElement
  hideIndicator?: boolean
  isMulti?: boolean
}

const CustomSelectField = ({
  name,
  options,
  label,
  placeholder,
  tooltip,
  disabled,
  isHighlighted,
  ariaLabel,
  isSearchable,
  labelColor,
  mandatory,
  toolTipText,
  defaultButton,
  hideIndicator = false,
  isMulti,
  ...props
}: CustomSelectFieldType) => {
  const formik = useFormikContext()
  
  const [field, meta, helpers] = useField(name)
  
  const isError = meta.error && meta.touched
  
  const selectBorder = isError ? '2px solid #B81237': '1px solid #CED4DA'
  const highlightedColor = isError && isHighlighted && '#FBEEE5'
  
  const optionStyle = {
    control:(styles: any, {isDisabled}: any) => ({
	  ...styles,
	  minHeight:'40px',
	  border:isDisabled ? '1px solid #CED4DA': selectBorder,
	  backgroundColor:isDisabled ? '#E4E4E6': highlightedColor,
	  borderTopRightRadius:defaultButton && 0,
	  borderBottomRightRadius:defaultButton && 0,
    }),
    indicatorSeparator:(styles: any) => ({...styles, display:'none'}),
    dropdownIndicator:(styles: any) => ({
	  ...styles,
	  svg:{fill:'#002664'},
	  '& svg':{display:hideIndicator && 'none'},
    }),
    menu:(styles: any) => ({...styles, zIndex:9999, marginTop:'1px'}),
    singleValue:(styles: any, {isDisabled}: any) => ({
	  ...styles,
	  color:isDisabled ? '#495057': '#333333',
    }),
  }
  
  const inputProps = {
    'aria-label':label ? label: placeholder || ariaLabel,
  }
  const placeHolder = placeholder ? placeholder: 'Select Option'
  
  // const inputValue = format ? format(field.value) : field.value
  const onChange = (option: any) => {
    formik.setFieldValue(field.name, isMulti ? option.map((item: any) => item.value): option.value)
  }
  
  const getValue = () => {
    if (options) {
	  return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value)
    } else {
	  return isMulti ? []: ('' as any)
    }
  }
  
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
	  <StyledSelectContainer defaultButton={Boolean(defaultButton)}>
        <Select
		  options={options}
		  name={field.name}
		  value={getValue()}
		  onChange={onChange}
		  styles={optionStyle}
		  placeholder={placeHolder}
		  isDisabled={disabled}
		  isSearchable={ !!isSearchable}
		  onBlur={() => helpers.setTouched(true)}
		  id={name}
		  {...inputProps}
		  {...props}
		  isMulti={isMulti}
        />
        {defaultButton && (
		  <>
            {/* <ReactTooltip /> */}
            <DefaultButton data-tip={toolTipText}>{defaultButton}</DefaultButton>
		  </>
        )}
	  </StyledSelectContainer>
	  {isError && <ErrorMessage message={meta.error}/>}
    </StyledGroupContainer>
  )
}

export default CustomSelectField

const StyledGroupContainer = styled.div`
  font-family: Roboto, sans-serif;
  .css-11jnjyc-control {
    border: 2px solid #ced4da !important;
  }
`

const StyledSelectContainer = styled.div<{defaultButton?: boolean}>`
  ${(p) => p.defaultButton && `display: flex;`}
`

const DefaultButton = styled.div`
  border: 1px solid #ced4da;
  border-left: none;
  padding: 0.375rem 0.75rem;
  display: block;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`

const StyledLabelContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  column-gap: 3px;
  align-self: end;
`
const StyledMandatory = styled.span`
  color: red;
`
