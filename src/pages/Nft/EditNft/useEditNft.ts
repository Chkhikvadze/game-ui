import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { useNftByIdService, useUpdateNftByIdGql } from 'services/useNftService'
import useSnackbarAlert from 'hooks/useSnackbar'


export const useEditNft = () => {
  const params = useParams()
  const nftId = params.nftId
  // const {setSnackbar} = useSnackbarAlert()
  const { data:nft, refetch:nftRefetch } = useNftByIdService({ id:nftId })
  const [updateNftById] = useUpdateNftByIdGql()
  const { setSnackbar } = useSnackbarAlert()
  
  
  const {
    project_id,
    collection_id,
    name,
    description,
    supply,
    properties,
    parent_id,
    asset_url,
  } = nft
  
  
  const defaultValues = {
    nft_name:name,
    nft_asset_url:asset_url,
    nft_description:description,
    nft_supply:supply,
    nft_properties:properties,
    parent_nft:parent_id,
    
  }
  
  
  const handleSubmit = async (values: any) => {
    const updatedValues = {
      name:values.nft_name,
      description:values.nft_description,
      supply:values.nft_supply,
      properties:values.nft_properties,
      parent_id:values.parent_nft || '',
      asset_url:values.nft_asset_url || '',
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
  }, []); //eslint-disable-line
  
  return {
    formik,
    
  }
  
}