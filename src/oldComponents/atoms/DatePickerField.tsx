import React from 'react'
import DatePicker from 'react-datepicker'
import { useField } from 'formik'
import moment from 'moment'

import ErrorMessage from 'oldComponents/atoms/ErrorMessage'
import Label from 'atoms/Label'

import 'react-datepicker/dist/react-datepicker.css'

import styled from 'styled-components'

type DatePickerFieldType = {
  name: string
  label?: string
  labelColor?: string
  mandatory?: boolean
  yearDropDown?: boolean
  reverse?: boolean
}

const DatePickerField = ({
  name,
  label,
  labelColor,
  mandatory,
  yearDropDown,
  reverse,
}: DatePickerFieldType) => {
  const [field, meta, {setValue}] = useField(name)
  
  const isError = meta.error && meta.touched
  
  const reverseMaxDate = new Date(new Date().setDate(new Date().getDate() + 4 * 365))
  
  const yearDropDownOptions = {
    yearDropdownItemNumber:40,
    scrollableYearDropdown:true,
    showYearDropdown:true,
  }
  
  return (
    <StyledContainer>
	  {label && (
        <Label color={labelColor ? labelColor: '#333'}>
		  {label} {mandatory && <StyledMandatory>*</StyledMandatory>}
        </Label>
	  )}
	  <DatePicker
        selected={field?.value ? new Date(field?.value): null}
        onChange={(date: Date) => setValue(date)}
        placeholderText="Select Date"
        minDate={reverse ? moment().toDate(): null}
        maxDate={reverse ? reverseMaxDate: moment().toDate()}
        dateFormat={'dd/MM/yyyy'}
        {...(yearDropDown ? yearDropDownOptions: null)}
	  />
	  
	  {isError && <ErrorMessage message={meta.error}/>}
    </StyledContainer>
  )
}

export default DatePickerField

const StyledContainer = styled.div`
  input {
    border: 1px solid #ced4da;
    border-radius: 4px;
    height: 38px;
    padding: 0px 8px;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }
`

const StyledMandatory = styled.span`
  color: red;
`
