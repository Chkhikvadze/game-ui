import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { object, array, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = object().shape({
  socialLinks: array().of(
    object().shape({
      value: string().required('Enter social your social url'),
    }),
  ),
})

const query = {
  start_date: '01/01/2022',
  end_date: '01/01/2024',
  methods: ['POST', 'GET', 'DELETE', 'PUT'],
  api_endpoint: '/graphql',
  source: ['Dashboard', 'API'],
  status: '',
  ip_address: '',
  error_type: '',
  error_code: '',
  search_text: '',
  page: 1,
  limit: 10,
}

const useFilter = () => {
  const form = useForm({
    defaultValues: query,
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  })

  const onClick = () => {
    console.log('watch::', form.getValues())
  }

  // const { fields, append } = useFieldArray({
  //   name: 'socialLinks',
  //   control,
  // })

  return {
    control: form.control,
    onClick,
    form,
  }
}

export default useFilter
