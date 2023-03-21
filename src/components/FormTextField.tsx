import { useForm, Controller } from 'react-hook-form'
import TextField from '@l3-lib/ui-core/dist/TextField'

const TextFieldCOntroller = ({ field_name }: { field_name: string }) => {
  const { control, watch } = useForm()
  console.log('🚀 ~ file: FormTextField.tsx:6 ~ FormTextField ~ watch:', watch())
  return (
    <Controller
      render={({ field }) => {
        console.log(field, 'field')
        return <TextField {...field} />
      }}
      name={field_name}
      control={control}
    />
  )
}

export default TextFieldCOntroller
