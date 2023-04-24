import { Field } from 'formik'
import Toggle from '@l3-lib/ui-core/dist/Toggle'

const ToggleFormik = ({ name, disabled }: { name: string; disabled?: boolean }) => {
  return (
    <Field name={name}>
      {(formik: any) => {
        const { field, meta, form } = formik
        const onHandleChange = (e: any) => {
          form.setFieldValue(field.name, e)
        }

        return (
          <Toggle
            name={field.name}
            size='small'
            {...field}
            checked={field.value}
            isDefaultSelected={field.value}
            onChange={onHandleChange}
            disabled={disabled}
          />
        )
      }}
    </Field>
  )
}

export default ToggleFormik
