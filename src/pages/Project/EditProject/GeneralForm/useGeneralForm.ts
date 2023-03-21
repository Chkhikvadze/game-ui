import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { object, array, string, number } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

const re =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm

const schema = object().shape({
  socialLinks: array().of(
    object().shape({
      value: string()
        .matches(re, 'Please enter valid url')
        .required('Enter social your social url'),
    }),
  ),
})

type generalFormInputs = {
  socialLinks: {
    value: string
  }[]
}

export const useGeneralForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<generalFormInputs>({
    defaultValues: { socialLinks: [{ value: 'github.com' }] },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  })

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

  const onSubmit: SubmitHandler<generalFormInputs> = data => {
    append({
      value: '',
    })
  }

  return {
    register,
    fields,
    append,
    onHandleClickEnter,
    handleSubmit,
    onSubmit,
    errors,
    control,
  }
}

export default useGeneralForm
