import React from 'react'
import find from 'lodash/fp/find'
// import MultiSelect from 'react-multi-select-component'
import { useField } from 'formik'

type option = { value: string; label: string }
type MultiSelectFieldProps = {
  name: string
  placeholder: string
  onChange?: (selected: Array<option>) => void
  transform?: (selected: Array<string>) => Array<string>
  options: Array<option>
}

const MultiSelectField = ({
  name,
  placeholder,
  onChange,
  transform,
  options,
}: MultiSelectFieldProps) => {
  const [field, , helpers] = useField(name)

  const handleChange = (selected: Array<option>) => {
    const transformed = transform
      ? transform(selected.map(curr => curr.value))
      : selected.map(curr => curr.value)

    helpers.setValue(transformed)
    if (onChange) onChange(selected)
  }

  const value = field.value.map((value: string) => find(option => option.value === value, options))

  return (
    <></>
    // <MultiSelect
    //   labelledBy={placeholder}
    //   overrideStrings={{ selectSomeItems: placeholder }}
    //   onChange={handleChange}
    //   value={value}
    //   options={options}
    //   shouldToggleOnHover={true}
    // />
  )
}

export default MultiSelectField
