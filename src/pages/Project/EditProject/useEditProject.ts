import { useFormik } from 'formik'
import { useProjectByIdService, useUpdateProjectByIdService } from 'services/useProjectService'
import { useParams } from 'react-router-dom'
import useSnackbarAlert from 'hooks/useSnackbar'
import { useEffect, useState } from 'react'
import useUploadFile from 'hooks/useUploadFile'
import { projectValidationSchema } from 'utils/validationsSchema'
import { useTranslation } from 'react-i18next'

export const useEditProject = () => {
  const { t } = useTranslation()
  const [fileUploadType, setFileUploadType] = useState('')
  const params = useParams()
  const projectId = params.projectId
  const { setSnackbar } = useSnackbarAlert()
  const { uploadFile, uploadProgress, loading: generateLinkLoading } = useUploadFile()

  const { data: projectById, refetch: projectRefetch } = useProjectByIdService({ id: projectId })

  const {
    name,
    category,
    description,
    banner_image,
    logo_image,
    background_image,
    url,
    web_link,
    twitter,
    instagram,
    discord,
  } = projectById

  const [updateProjectById] = useUpdateProjectByIdService()

  const defaultValues = {
    project_name: name,
    project_category: category,
    project_description: description,
    banner_image: banner_image,
    logo_image: logo_image,
    background_image: background_image,
    project_url: url,
    project_web_link: web_link,
    project_twitter_link: twitter,
    project_instagram_link: instagram,
    project_discord_link: discord,
  }

  const handleSubmit = async (values: any) => {
    const updatedValues = {
      name: values.project_name,
      description: values.project_description,
      category: values.project_category,
      banner_image: values.banner_image,
      logo_image: values.logo_image,
      background_image: values.background_image,
      url: values.project_url,
      web_link: values.project_web_link,
      twitter: values.project_twitter_link,
      instagram: values.project_instagram_link,
      discord: values.project_discord_link,
    }

    await updateProjectById(projectId, {
      ...updatedValues,
    })

    setSnackbar({
      message: t('game-successfully-updated'),
      variant: 'success',
    })
  }

  const handleChangeFile = async (e: React.SyntheticEvent<EventTarget>, fieldName: string) => {
    const { files }: any = e.target

    const fileObj = {
      fileName: files[0].name,
      type: files[0].type,
      fileSize: files[0].size,
      locationField: 'collection',
    }

    setFileUploadType(fieldName)

    const res = await uploadFile(fileObj, files[0])

    await formik.setFieldValue(fieldName, res)
  }

  const onDeleteImg = (fieldName: string) => {
    formik.setFieldValue(fieldName, '')
    setFileUploadType('')
  }

  useEffect(() => {
    if (uploadProgress === 99.99) {
      setFileUploadType('')
    }
  }, [uploadProgress])

  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true,
    onSubmit: async (values) => handleSubmit(values),
    validationSchema: projectValidationSchema,
  })

  useEffect(() => {
    projectRefetch()
  }, []) //eslint-disable-line

  return {
    formik,
    onDeleteImg,
    handleChangeFile,
    generateLinkLoading,
    fileUploadType,
  }
}
