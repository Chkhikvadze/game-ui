import { Field } from 'formik'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'

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
          // name={name}
          kind={kind}
          placeholder={placeholder}
          size={size}
          options={options}
          onChange={onHandleChange}
        />
      )
    }}
  </Field>
)

export default DropDownFormik
