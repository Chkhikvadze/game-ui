import React, { ReactElement, ChangeEvent } from 'react'
import styled from 'styled-components'
import { useField } from 'formik'

import Label from 'oldComponents/atoms/Label'
import Typography from 'oldComponents/atoms/Typography'
import ErrorMessage from 'oldComponents/atoms/ErrorMessage'

type TextFieldProps = {
  className?: string
  transform?: (event: object) => any
  disabled?: boolean
  placeholder?: string
  format?: (value: any) => any
  adornment?: string | ReactElement
  adornmentPosition?: 'left' | 'right'
  numeric?: boolean
  onClick?: (event: object) => any
  label?: string
  labelColor?: string
  name: string
  step?: number
  password?: boolean
  adornmentLeft?: string | ReactElement
  adornmentRight?: string | ReactElement
  afterValue?: any
  negative?: boolean
}

const TextField = ({
  className,
  transform,
  format,
  adornment,
  adornmentPosition = 'left',
  numeric = false,
  onClick,
  disabled = false,
  placeholder,
  label,
  labelColor,
  name,
  step,
  password,
  adornmentLeft,
  adornmentRight,
  afterValue,
  negative,
  ...rest
}: TextFieldProps) => {
  const [field, meta, {setValue}] = useField(name)
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
	if (numeric) {
	  const transformed = event.target.value ? parseFloat(event.target.value): ''
	  
	  setValue(event.target.value.endsWith('.') ? event.target.value: transformed)
	  return
	}
	
	if ( !transform) {
	  field.onChange(event)
	  return
	}
	
	return setValue(transform(event))
  }
  
  const inputValue = format ? format(field.value): field.value
  
  
  const inputProps = numeric && {
	...(negative && {
	  onKeyDown:(evt: any) => ['e', 'E', '+'].includes(evt.key) && evt.preventDefault(),
	}),
	...( !negative && {
	  onKeyDown:(evt: any) => ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault(),
	}),
  }
  
  const isError = meta.error && meta.touched
  
  return (
	<StyledContainer onClick={onClick} className={className}>
	  {label && (
		<Label mb={10} color={labelColor ? labelColor: '#333'} weight={500}>
		  {label}
		</Label>
	  )}
	  
	  <StyledInputContainer>
		{((adornment && adornmentPosition === 'left') || adornmentLeft) && (
		  <StyledAdornmentContainer adornmentPosition={'left'}>
			<Typography variant="label">{adornment || adornmentLeft}</Typography>
		  </StyledAdornmentContainer>
		)}
		
		<StyledInput
		  adornment={Boolean(adornment)}
		  adornmentPosition={adornmentPosition}
		  adornmentLeft={Boolean(adornmentLeft)}
		  adornmentRight={Boolean(adornmentRight)}
		  type={numeric ? 'number': password ? 'password': 'text'}
		  step={step}
		  {...field}
		  {...rest}
		  disabled={disabled}
		  placeholder={placeholder}
		  value={afterValue ? `${inputValue} ${afterValue}`: inputValue}
		  onChange={handleChange}
		  {...inputProps}
		/>
		
		{((adornment && adornmentPosition === 'right') || adornmentRight) && (
		  <StyledAdornmentContainer adornmentPosition={'right'}>
			<Typography variant="label">{adornment || adornmentRight}</Typography>
		  </StyledAdornmentContainer>
		)}
	  </StyledInputContainer>
	  
	  {isError && <ErrorMessage message={meta.error}/>}
	</StyledContainer>
  )
}

const StyledContainer = styled.div`
  width: 100%;
`

const StyledInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledAdornmentContainer = styled.div<{adornmentPosition?: string}>`
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ced4da;
  font-size: 14px;
  padding: 0.375rem 0.75rem;
  ${(p) =>
  p.adornmentPosition === 'right'
	? `
    border-left: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;`
	: `
    border-right: none;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;`};
`

const StyledInput = styled.input<{
  adornment: boolean
  adornmentPosition: string | ReactElement
  adornmentLeft: boolean
  adornmentRight: boolean
}>`
  flex: 1;
  height: 38px;
  width: 1px;
  border-radius: 4px;
  ${(props) =>
  ((props.adornment && props.adornmentPosition === 'left') || props.adornmentLeft) &&
  `
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-left: none;
  `}

  ${(props) =>
  ((props.adornment && props.adornmentPosition === 'right') || props.adornmentLeft) &&
  `
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-right: none;
  `}
  font-size: 1rem;
  padding: 0 15px 0 15px;
  font-weight: 400;
  font-family: Roboto, sans-serif;
  color: #495057;
  cursor: inherit;
  border: 1px solid #ced4da;

  ${(p) =>
  p.type === 'number' &&
  `
    &::-webkit-inner-spin-button {
      -webkit-appearance: none; 
      margin: 0; 
    }
  `}

  ${({disabled}) =>
  disabled &&
  `
    background-color: #E9ECEF;
  `};

  &:focus {
    border: 1px solid #b8b8b8;
  }
`

export default TextField
