import { useFormik } from "formik";
import { useUpdateProjectByIdService } from "services/useProjectService";
import { useParams } from "react-router-dom";
import useSnackbarAlert from "hooks/useSnackbar";
import { useEffect } from "react";
import { useCollectionByIdService } from "services/useCollectionService";


export const useEditCollection = () => {
  const params = useParams()
  const collectionId = params.id
  const {setSnackbar} = useSnackbarAlert()
  const {data:collection, refetch:collectionRefetch} = useCollectionByIdService({id:collectionId})
  
  const {name, category, description} = collection
  
  const [updateProjectById] = useUpdateProjectByIdService()
  
  
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
	
	
	await updateProjectById(collectionId, {
	  ...updatedValues
	})
	
	
	setSnackbar({
	  message:'Game successfully updated',
	  variant:'success',
	})
	
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