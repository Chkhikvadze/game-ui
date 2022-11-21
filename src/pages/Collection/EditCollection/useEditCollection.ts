import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  useCollectionByIdService,
  useUpdateCollectionByIdService
} from "services/useCollectionService";
import useSnackbarAlert from "hooks/useSnackbar";


export const useEditCollection = () => {
  const params = useParams()
  const collectionId = params.id
  // const {setSnackbar} = useSnackbarAlert()
  const {data:collection, refetch:collectionRefetch} = useCollectionByIdService({id:collectionId})
  const [updateCollectionById] = useUpdateCollectionByIdService()
  const {setSnackbar} = useSnackbarAlert()
  
  
  const {name, category, description} = collection
  
  
  const defaultValues = {
	project_name:name,
	project_category:category,
	project_description:description,
  }
  
  
  const handleSubmit = async (values: any) => {
	
	const updatedValues = {
	  name:values.project_name,
	  description:values.project_description,
	  category:values.project_category
	}
	
	
	await updateCollectionById(collectionId, {
	  ...updatedValues
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
	onSubmit:async (values) => handleSubmit(values)
	
  })
  
  
  useEffect(() => {
	collectionRefetch()
  }, []) //eslint-disable-line
  
  return {
	formik,
	
  }
  
}