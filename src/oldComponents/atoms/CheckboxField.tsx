import React from 'react'
import { useField } from 'formik'
import styled from 'styled-components'
import includes from 'lodash/fp/includes'

import Label from 'oldComponents/atoms/Label'
import checkedSvg from 'assets/old/images/tick.svg'

const Item = styled.div`
  display: inline-grid;
  grid-template-columns: 34px 1fr;
  align-items: center;
  cursor: pointer;
  grid-column-gap: 0;
  scroll-margin-top: 30px;
  position: relative;
`

const CheckboxLabel = styled.span<{ size?: any; disabled?: boolean }>`
  position: absolute;
  border: 1px solid #ced4da;
  box-sizing: border-box;
  border-radius: 4px;
  width: 20px;
  height: 20px;
  ${p => p.disabled && `background-color: #CED4DA;`}
`

const CheckboxButton = styled.input<{ size?: any; disabled?: boolean }>`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 20px;
  height: 20px;
  outline-offset: 5px;

  &:disabled {
    pointer-events: none;
  }

  &:checked + ${CheckboxLabel} {
    &::after {
      content: url(${checkedSvg});
      margin-top: -1px;
      margin-left: -1px;
      display: flex;
      align-items: center;
      justify-items: center;
    }
  }
`

type CheckboxFieldProps = {
  label: any
  value: string
  className?: string
  onChange?: (value?: boolean) => void
  name: string
  disabled?: boolean
  ariaLabel?: string
}

const CheckboxField = ({
  label,
  value,
  onChange,
  disabled,
  className,
  name,
  ariaLabel,
}: CheckboxFieldProps) => {
  const [field, , { setValue }] = useField(name)
  const isChecked = includes(value, field.value)

  const checked = field && typeof field.value === 'object' ? isChecked : field.value

  const handleChange = (event: any) => {
    field.onChange(event)
    if (onChange) onChange(event.target.checked)
  }

  const onKeyDown = (event: any) => {
    if (event.keyCode !== 13) return
    const newValue = checked
      ? field.value.filter((curr: string) => curr !== value)
      : field.value.concat([value])

    setValue(newValue)
    if (onChange) onChange(!checked)
  }

  return (
    <Item className={className}>
      <CheckboxButton
        {...field}
        disabled={disabled}
        type='checkbox'
        value={value}
        onChange={handleChange}
        onClick={e => {
          e.stopPropagation()
        }}
        aria-checked={checked}
        role={'checkbox'}
        onKeyDown={onKeyDown}
        checked={checked}
        aria-label={ariaLabel ? ariaLabel : label}
        id={`${name}_${value}`}
      />
      <CheckboxLabel aria-hidden='true' disabled={disabled} />
      <Label as='label' color='#333' htmlFor={`${name}_${value}`}>
        {label}
      </Label>
    </Item>
  )
}

export default CheckboxField
