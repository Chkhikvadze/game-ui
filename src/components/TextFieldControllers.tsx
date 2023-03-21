import { Controller } from 'react-hook-form'
import TextField from '@l3-lib/ui-core/dist/TextField'

const TextFieldController = ({ field_name, control }: { field_name: string; control: any }) => {
  return (
    <Controller
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            {...field}
            validation={
              error
                ? {
                    status: 'error',
                    text: 'Please enter correct url',
                  }
                : {}
            }
          />
        )
      }}
      name={field_name}
      control={control}
    />
  )
}

export default TextFieldController
