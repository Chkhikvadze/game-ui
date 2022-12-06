import { useFormik } from "formik"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

import { useNftByIdService, useUpdateNftByIdGql } from "services/useNftService"
import useSnackbarAlert from "hooks/useSnackbar"


export const useEditNft = () => {
  const params = useParams()
  const nftId = params.nftId
  // const {setSnackbar} = useSnackbarAlert()
  const {data:nft, refetch:nftRefetch} = useNftByIdService({id:nftId})
  const [updateNftById] = useUpdateNftByIdGql()
  const {setSnackbar} = useSnackbarAlert()
  
  
  const {
    name,
    price,
    supply,
    nft_type,
    project_id,
    collection_id,
  } = nft
  
  
  const defaultValues = {
    nft_name:name,
    nft_price:price,
    nft_supply:supply,
    nft_type:nft_type,
	
  }
  
  
  const handleSubmit = async (values: any) => {
	
    const updatedValues = {
	  name:values.nft_name,
	  price:values.nft_price,
	  supply:values.nft_supply,
	  nft_type:values.nft_type,
    }
	
	
    await updateNftById(nftId, {
	  project_id,
	  collection_id,
	  ...updatedValues,
    })
	
	
    // if (res.success) {
    await setSnackbar({
	  message:'Nft successfully updated',
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
    onSubmit:async (values) => handleSubmit(values),
	
  })
  
  
  useEffect(() => {
    nftRefetch()
  }, []) //eslint-disable-line
  
  return {
    formik,
	
  }
  
}