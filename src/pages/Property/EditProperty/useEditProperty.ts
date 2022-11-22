import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import useSnackbarAlert from "hooks/useSnackbar";
import { usePropertyIdService, useUpdatePropertyByIdService } from "services/usePropertyService";


export const useEditProperty = () => {
  const params = useParams()
  const propertyId = params.propertyId!
  // const {setSnackbar} = useSnackbarAlert()
  const {data:property, refetch:propertyRefetch} = usePropertyIdService({id:propertyId})
  
  const [updatePropertyById] = useUpdatePropertyByIdService()
  const {setSnackbar} = useSnackbarAlert()
  
  
  const {
	name,
	description,
	property_type,
	project_id,
	collection_id
  } = property
  
  
  const defaultValues = {
	property_name:name,
	property_type:property_type,
	property_description:description,
  }
  
  
  const handleSubmit = async (values: any) => {
	
	const updatedValues = {
	  name:values.property_name,
	  property_type:values.property_type,
	  description:values.property_description,
	}
	
	
	await updatePropertyById(propertyId, {
	  project_id,
	  collection_id,
	  ...updatedValues
	})
	
	
	// if (res.success) {
	await setSnackbar({
	  message:'Property successfully updated',
	  variant:'success',
	})
	
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
	propertyRefetch()
  }, []) //eslint-disable-line
  
  return {
	formik,
	
  }
  
}