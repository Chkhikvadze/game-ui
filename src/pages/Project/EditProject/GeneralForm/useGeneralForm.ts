import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { object, array, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

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
  const { control, handleSubmit } = useForm<generalFormInputs>({
    defaultValues: { socialLinks: [{ value: 'twitter.com/jelokokh' }] },
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  })

  const { fields, append } = useFieldArray({
    name: 'socialLinks',
    control,
  })

  const onSubmit: SubmitHandler<generalFormInputs> = data => {
    append({
      value: '',
    })
  }

  return {
    fields,
    handleSubmit,
    onSubmit,
    control,
  }
}

export default useGeneralForm
