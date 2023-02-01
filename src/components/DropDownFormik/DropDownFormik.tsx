import { Field } from 'formik'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'

const DropDownFormik = ({
  name,
  placeholder,
  title,
  size = 'small',
  options,
}: {
  name: string
  placeholder?: string
  title?: string
  size?: 'large' | 'medium' | 'small'
  options: any
}) => (
  <Field name={name}>
    {(formik: any) => {
      const { field, meta, form } = formik
      const onHandleChange = (e: any) => {
        console.log(e, 'ee')
        form.setFieldValue(field.name, e.label)
      }

      return (
        <Dropdown
          name={name}
          kind={Dropdown.kind.SECONDARY}
          placeholder="TERTIARY"
          size={size}
          options={options}
          onChange={onHandleChange}
        />
      )
    }}
  </Field>
)

export default DropDownFormik
