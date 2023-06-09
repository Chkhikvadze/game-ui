import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { object, array, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'react-router-dom'
import {
  useCollectionByIdService,
  useCollectionCategoriesService,
  useUpdateCollectionByIdService,
  useUpdateCollectionSocialLinksService,
} from 'services/useCollectionService'
import { useEffect, useState } from 'react'

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
  const { control, handleSubmit, watch, reset } = useForm<GeneralFormValues>({
    defaultValues: {
      socialLinks: [{ url: 'twitter.com/l3vels' }],
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  })

  const params = useParams()
  const collectionId: string = params.collectionId as string

  const [category_option, set_category_option] = useState([])
  const [selected_categories, set_selected_categories] = useState([])

  const { updateCollectionSocialLinks } = useUpdateCollectionSocialLinksService()
  const [updateCollectionById] = useUpdateCollectionByIdService()
  const { data: collection, refetch: collectionRefetch } = useCollectionByIdService({
    id: collectionId,
  })

  const { game_id, categories, social_links } = collection

  const { data: collectionCategories } = useCollectionCategoriesService(game_id)

  const { fields, append } = useFieldArray({
    name: 'socialLinks',
    control,
  })

  const onCategoryChange = async (value: any) => {
    const selected_collections = value.map((item: any) => item.value)
    await updateCollectionById(collectionId, {
      categories: selected_collections,
    })
    collectionRefetch()
  }

  const onCategoryRemove = async (option: any) => {
    const index = selected_categories.findIndex((item: any) => item.value === option.value)
    if (index !== -1) {
      selected_categories.splice(index, 1)
    }

    const selected_collections = selected_categories.map((item: any) => item.value)
    await updateCollectionById(collectionId, {
      categories: selected_collections,
    })
    collectionRefetch()
  }

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
  useEffect(() => {
    const collectionCategoriesItems = collectionCategories?.map((item: any) => ({
      value: item,
      label: item,
    }))

    set_category_option(collectionCategoriesItems)
  }, [collectionCategories])

  useEffect(() => {
    const selected_categories_by_collection = categories?.map((item: any) => ({
      value: item,
      label: item,
    }))

    set_selected_categories(selected_categories_by_collection)
  }, [categories])

  return {
    fields,
    handleSubmit,
    onSubmit,
    control,
    watch,
    collection,
    category_option,
    selected_categories,
    onCategoryChange,
    onCategoryRemove,
  }
}
