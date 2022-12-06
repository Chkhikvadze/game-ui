import { useFormik } from "formik"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  useCollectionByIdService,
  useUpdateCollectionByIdService,
} from "services/useCollectionService"
import useSnackbarAlert from "hooks/useSnackbar"
import useUploadFile from "hooks/useUploadFile"


export const useEditCollection = () => {
  const [fileUploadType, setFileUploadType] = useState('')
  const params = useParams()
  const collectionId = params.collectionId
  // const {setSnackbar} = useSnackbarAlert()
  const {data:collection, refetch:collectionRefetch} = useCollectionByIdService({id:collectionId})
  const [updateCollectionById] = useUpdateCollectionByIdService()
  const {setSnackbar} = useSnackbarAlert()
  const {uploadFile, uploadProgress, loading:generateLinkLoading} = useUploadFile()
  
  
  const {
    name,
    category,
    description,
    banner_image,
    cover_image,
    featured_image,
    url,
    web_link,
    logo_image,
  } = collection
  
  
  const defaultValues = {
    collection_name:name,
    collection_description:category,
    collection_category:description,
    banner_image:banner_image,
    cover_image:cover_image,
    featured_image:featured_image,
    collection_url:url,
    collection_web_link:web_link,
    logo_image:logo_image,
  }
  
  
  const handleSubmit = async (values: any) => {
	
    const updatedValues = {
	  name:values.project_name,
	  description:values.project_description,
	  category:values.project_category,
	  banner_image:values.banner_image,
	  cover_image:values.cover_image,
	  featured_image:values.featured_image,
	  url:values.collection_url,
	  web_link:values.collection_web_link,
	  logo_image:values.logo_image,
    }
	
	
    await updateCollectionById(collectionId, {
	  ...updatedValues,
    })
	
	
    // if (res.success) {
    setSnackbar({
	  message:'Collection successfully updated',
	  variant:'success',
    })
    // }
    //
    // if ( !res.success) {
    //   setSnackbar({
    // 	message:'something went wrong',
    // 	variant:'warning',
    //   })
    // }
	
  }
  
  
  const formik = useFormik({
    initialValues:defaultValues,
    enableReinitialize:true,
    onSubmit:async (values) => handleSubmit(values),
	
  })
  
  const handleChangeFile = async (e: React.SyntheticEvent<EventTarget>, fieldName: string) => {
    const {files}: any = e.target
	
    const fileObj = {
	  fileName:files[ 0 ].name,
	  type:files[ 0 ].type,
	  fileSize:files[ 0 ].size,
	  locationField:'collection',
    }
	
    setFileUploadType(fieldName)
	
    const res = await uploadFile(fileObj, files[ 0 ])
	
    await formik.setFieldValue(fieldName, res)
	
  }
  
  const onDeleteImg = (fieldName: string) => {
    formik.setFieldValue(fieldName, '')
    setFileUploadType("")
  }
  
  useEffect(() => {
    if (uploadProgress === 99.99) {
	  setFileUploadType("")
    }
  }, [uploadProgress])
  
  useEffect(() => {
    collectionRefetch()
  }, []) //eslint-disable-line
  
  return {
    formik,
    fileUploadType,
    handleChangeFile,
    uploadProgress,
    generateLinkLoading,
    onDeleteImg,
	
  }
  
}