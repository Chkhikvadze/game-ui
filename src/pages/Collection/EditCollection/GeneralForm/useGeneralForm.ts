import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { object, array, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'react-router-dom'
import {
  useCollectionByIdService,
  useUpdateCollectionSocialLinksService,
} from 'services/useCollectionService'
import { useEffect } from 'react'

const re =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm

const schema = object().shape({
  socialLinks: array().of(
    object().shape({
      url: string().matches(re, 'Please enter valid url').required('Enter social your social url'),
    }),
  ),
})

type GeneralFormValues = {
  socialLinks: {
    url: string
  }[]
}

export const useGeneralForm = () => {
  const params = useParams()
  const collectionId: string = params.collectionId as string

  const { updateCollectionSocialLinks } = useUpdateCollectionSocialLinksService()
  const { data: collection, refetch: collectionRefetch } = useCollectionByIdService({
    id: collectionId,
  })

  const { social_links } = collection

  const { control, handleSubmit, watch, reset } = useForm<GeneralFormValues>({
    defaultValues: {
      socialLinks: [{ url: 'twitter.com/l3vels' }],
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  })

  const { fields, append } = useFieldArray({
    name: 'socialLinks',
    control,
  })

  const onSubmit: SubmitHandler<GeneralFormValues> = async (props: any) => {
    append({
      url: '',
    })

    const mappedResult = props?.socialLinks?.map((item: any) => {
      const { url } = item
      return { is_main: false, url: url, format: '' }
    })

    await updateCollectionSocialLinks(collectionId, mappedResult)
  }

  useEffect(() => {
    if (collection.social_links?.length) {
      reset({ socialLinks: [...social_links] })
    }
  }, [collection]) //eslint-disable-line

  return {
    fields,
    handleSubmit,
    onSubmit,
    control,
    watch,
  }
}
