import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { object, array, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'react-router-dom'
import {
  useProjectByIdService,
  useUpdateProjectSocialLinksService,
} from 'services/useProjectService'
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

type generalFormInputs = {
  socialLinks: {
    url: string
  }[]
}

export const useGeneralForm = () => {
  const params = useParams()
  const projectId: string = params.projectId as string

  const { data: projectById, refetch: projectRefetch } = useProjectByIdService({ id: projectId })

  const { social_links } = projectById

  const { updateProjectSocialLinks, loading } = useUpdateProjectSocialLinksService()

  const { control, handleSubmit, watch, reset } = useForm<generalFormInputs>({
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

  const onSubmit: SubmitHandler<generalFormInputs> = async (arr: any) => {
    append({
      url: '',
    })

    const mappedResult = arr?.socialLinks?.map((item: any) => {
      const { url } = item
      return { is_main: false, url: url, format: '' }
    })

    await updateProjectSocialLinks(projectId, mappedResult)
  }

  useEffect(() => {
    if (projectById.social_links?.length) {
      reset({ socialLinks: [...social_links] })
    }
  }, [projectById]) //eslint-disable-line

  return {
    fields,
    handleSubmit,
    onSubmit,
    control,
    watch,
  }
}

export default useGeneralForm
