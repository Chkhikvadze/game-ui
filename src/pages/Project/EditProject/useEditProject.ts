import { useFormik } from "formik";
import { useProjectByIdService, useUpdateProjectByIdService } from "services/useProjectService";
import { useParams } from "react-router-dom";
import useSnackbarAlert from "hooks/useSnackbar";
import { useEffect } from "react";


export const useEditProject = () => {
  const params = useParams()
  const projectId = params.projectId
  const {setSnackbar} = useSnackbarAlert()
  
  
  const {data:projectById, refetch:projectRefetch} = useProjectByIdService({id:projectId})
  
  const {name, category, description, banner_image, logo_image, background_image} = projectById
  
  const [updateProjectById] = useUpdateProjectByIdService()
  
  
  const defaultValues = {
	project_name:name,
	project_category:category,
	project_description:description,
	banner_image:banner_image,
	logo_image:logo_image,
	background_image:background_image,
  }
  
  
  const handleSubmit = async (values: any) => {
	
	const updatedValues = {
	  name:values.project_name,
	  description:values.project_description,
	  category:values.project_category,
	  banner_image:values.banner_image,
	  logo_image:values.logo_image,
	  background_image:values.background_image,
	}
	
	
	await updateProjectById(projectId, {
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
	projectRefetch()
  }, []) //eslint-disable-line
  
  return {
	formik,
	
  }
  
}