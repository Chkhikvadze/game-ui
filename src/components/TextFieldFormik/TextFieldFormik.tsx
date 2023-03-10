import { Field } from 'formik'
import TextField from '@l3-lib/ui-core/dist/TextField'

const FormikTextField = ({
  field_name,
  placeholder,
  title,
  size = 'small',
  type,
}: {
  field_name: string
  placeholder?: string
  title?: string
  size?: 'large' | 'medium' | 'small'
  type?: string
}) => (
  <Field name={field_name}>
    {(formik: any) => {
      const { field, meta, form } = formik
      const onHandleChange = (e: any) => {
        form.setFieldValue(field.name, e)
      }

      return (
        <TextField
          name={field.name}
          {...field}
          placeholder={placeholder ?? 'Please enter value'}
          label='Project name'
          size={size}
          onChange={onHandleChange}
          title={title}
          validation={{
            text: meta.error,
            status: meta.error && 'error',
          }}
          type={type}
        />
      )
    }}
  </Field>
)

export default FormikTextField
