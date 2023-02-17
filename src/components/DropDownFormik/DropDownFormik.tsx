import { Field } from 'formik'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import { useState } from 'react'

const DropDownFormik = ({
  name,
  placeholder,
  title,
  size = 'small',
  options,
  kind = Dropdown.kind.SECONDARY,
}: {
  name: string
  placeholder?: string
  title?: string
  size?: 'large' | 'medium' | 'small'
  options: any
  kind?: any
}) => (
  <Field name={name}>
    {(formik: any) => {
      const { field, form } = formik
      const onHandleChange = (e: any) => {
        form.setFieldValue(field.name, e.label)
      }
      return (
        <Dropdown
          kind={kind}
          placeholder={
            form.values.collection_category ? form.values.collection_category : placeholder
          }
          size={size}
          options={options}
          onChange={onHandleChange}
        />
      )
    }}
  </Field>
)

export default DropDownFormik
