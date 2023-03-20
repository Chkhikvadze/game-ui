import { useFieldArray, useForm } from 'react-hook-form'

type generalFormInputs = {
  socialLinks: {
    value: string
  }[]
}

export const useGeneralForm = () => {
  const { register, control, watch } = useForm<generalFormInputs>({
    defaultValues: { socialLinks: [{ value: 'github' }] },
  })
  console.log('🚀 ~ file: useGeneralForm.ts:14 ~ useGeneralForm ~ watch:', watch)

  const { fields, append } = useFieldArray({
    name: 'socialLinks',
    control,
  })

  const onHandleClickEnter = (event: any) => {
    if (event.key === 'Enter') {
      append({
        value: '',
      })
    }
  }

  return {
    register,
    fields,
    append,
    onHandleClickEnter,
  }
}

export default useGeneralForm
