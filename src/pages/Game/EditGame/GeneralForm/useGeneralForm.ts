import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { object, array, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'react-router-dom'
import { useGameByIdService, useUpdateGameSocialLinksService } from 'services/useGameService'
import { useEffect } from 'react'
import { useCollectionCountByGameIdService } from 'services/useCollectionService'
import { usePlayerCountByGameIdService } from 'services/usePlayerService'
import { useAssetTotalValueByGameService } from 'services/useAssetService'

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
  const gameId: string = params.gameId as string

  const { data: gameById, refetch: gameRefetch } = useGameByIdService({ id: gameId })

  const { data: collectionCount } = useCollectionCountByGameIdService(gameId)
  const { data: playerCount } = usePlayerCountByGameIdService(gameId)
  const { data: totalValue } = useAssetTotalValueByGameService(gameId)

  const { social_links } = gameById

  const { updateGameSocialLinks, loading } = useUpdateGameSocialLinksService()

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

    await updateGameSocialLinks(gameId, mappedResult)
  }

  useEffect(() => {
    if (gameById.social_links?.length) {
      reset({ socialLinks: [...social_links] })
    }
  }, [gameById]) //eslint-disable-line

  return {
    fields,
    handleSubmit,
    onSubmit,
    control,
    watch,
    collectionCount,
    playerCount,
    totalValue,
  }
}

export default useGeneralForm
