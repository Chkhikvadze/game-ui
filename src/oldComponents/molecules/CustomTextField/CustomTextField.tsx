import React, { ChangeEvent, ReactElement } from 'react'
import styled from 'styled-components'
import { useField } from 'formik'
// import ReactTooltip from 'react-tooltip'

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
  date?: boolean
  toolTipText?: string
  defaultButton?: ReactElement
  mandatory?: boolean
}

const TextField = ({
  className,
  transform,
  format,
  adornment,
  adornmentPosition = 'left',
  numeric,
  onClick,
  label,
  labelColor,
  name,
  step,
  password,
  date,
  defaultButton,
  toolTipText,
  mandatory,
  ...rest
}: TextFieldProps) => {
  const [field, meta, {setValue}] = useField(name)
  
  const isError = meta.error && meta.touched
  
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
  
  const inputProps = {
	...(numeric && {
	  onKeyDown:(evt: any) => ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault(),
	}),
  }
  
  return (
	<StyledContainer onClick={onClick} className={className}>
	  {label && (
		<Label mb={10} color={labelColor ? labelColor: '#333'} weight={500}>
		  {label} {mandatory && <StyledMandatory>*</StyledMandatory>}
		</Label>
	  )}
	  
	  <StyledInputContainer>
		{adornment && adornmentPosition === 'left' && (
		  <StyledAdornmentContainer adornmentPosition={adornmentPosition}>
			<Typography variant="label">{adornment}</Typography>
		  </StyledAdornmentContainer>
		)}
		
		<StyledInput
		  defaultButton={Boolean(defaultButton)}
		  adornment={Boolean(adornment)}
		  adornmentPosition={adornmentPosition}
		  type={numeric ? 'number': password ? 'password': date ? 'date': 'text'}
		  step={step}
		  {...field}
		  {...rest}
		  value={format ? format(field.value): field.value}
		  onChange={handleChange}
		  {...inputProps}
		/>
		{defaultButton && (
		  <>
			{/* <ReactTooltip /> */}
			<DefaultButton data-tip={toolTipText} adornmentPosition={adornmentPosition}>
			  {defaultButton}
			</DefaultButton>
		  </>
		)}
		{adornment && adornmentPosition === 'right' && (
		  <StyledAdornmentContainer adornmentPosition={adornmentPosition}>
			<Typography variant="label">{adornment}</Typography>
		  </StyledAdornmentContainer>
		)}
	  </StyledInputContainer>
	  
	  {isError && <ErrorMessage message={meta.error}/>}
	</StyledContainer>
  )
}

const DefaultButton = styled.div<{adornmentPosition?: string}>`
  border: 1px solid #ced4da;
  border-left: none;
  padding: 0.375rem 0.75rem;
  display: block;

  ${(props) =>
          props.adornmentPosition === 'left' &&
          `
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  `}
`

const StyledContainer = styled.div`
  width: 100%;
  position: relative;
`

const StyledInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledMandatory = styled.span`
  color: red;
`

const StyledAdornmentContainer = styled.div<{adornmentPosition?: string}>`
  background-color: #f2f2f2;
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
  defaultButton?: boolean
  adornment: boolean
  adornmentPosition: string | ReactElement
}>`
  flex: 1;
  height: 38px;
  width: 1px;
  border-radius: 4px;
  border: ${(props) => (props.disabled ? 2: 1)}px solid #ced4da;
  ${(props) =>
          props.adornment &&
          props.adornmentPosition === 'left' &&
          `
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-left: none;
  `}

  ${(props) =>
          props.adornmentPosition === 'right' &&
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

  ${(props) =>
          props.defaultButton &&
          `
    border-right: none;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  `};

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
    background-color: #E9ECE;
  `};

  &:focus {
    border: 1px solid #b8b8b8;
  }
`

export default TextField
