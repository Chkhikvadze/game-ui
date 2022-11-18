import useSnackbarAlert from 'hooks/useSnackbar'
import { useFormik } from "formik";
import { useModal } from "hooks";
import { useEffect } from "react";
import {
  useCollectionByIdService,
  useCollectionsService,
  useCreateCollectionService,
  useDeleteCollectionByIdService
} from "services/useCollectionService";
import { useParams } from "react-router-dom";
import { useCreateNftService, useDeleteNftByIdService, useNftsService } from "services/useNftService";

const initialValues = {
  nft_name:"",
  nft_price:'',
  nft_supply:' ',
  nft_type:'',
}


export const useNft = () => {
  const params = useParams()
  const id: string = params?.id!
  
  
  const {data:collection} = useCollectionByIdService({id})
  
  const {project_id} = collection
  
  const [createNftService] = useCreateNftService()
  
  
  const {openModal, closeModal} = useModal()
  const {data, refetch:nftsRefetch} = useNftsService({
	project_id,
	collection_id:id,
	page:1,
	limit:100,
	search_text:""
  })
  
  const [deleteNftById] = useDeleteNftByIdService()
  
  
  const {setSnackbar} = useSnackbarAlert()
  
  
  const openCreateCollectionModal = () => {
	openModal({
	  name:'create-nft-modal',
	})
  }
  
  
  const handleSubmit = async (values: any) => {
	const nftInput = {
	  name:values.nft_name,
	  collection_id:id,
	  project_id,
	  price:values.nft_price,
	  supply:values.nft_supply,
	  nft_type:values.nft_type,
	}
	
	
	const res = await createNftService(nftInput, () => {
	})
	
	if ( !res) {
	  setSnackbar({message:'Failed to create new nft', variant:'error'})
	  closeModal('create-nft-modal')
	  return
	}
	
	if (res) {
	  setSnackbar({
		message:'New nft created',
		variant:'success',
	  })
	  closeModal('create-nft-modal')
	  await nftsRefetch()
	  return
	}
	
  }
  
  const handleDeleteCollection = async (project: any) => {
	openModal({
	  name:'delete-confirmation-modal',
	  data:{
		closeModal:() => closeModal('delete-confirmation-modal'),
		deleteItem:() => {
		  deleteNftById(project.id)
			.then(() => {
			  nftsRefetch()
			  closeModal('delete-confirmation-modal')
			  setSnackbar({
				message:'nft successfully deleted',
				variant:'success',
			  })
			})
			.catch(() => {
			  closeModal('delete-confirmation-modal')
			  setSnackbar({
				message:'nft delete failed',
				variant:'error',
			  })
			})
		},
		label:'Are you sure you want to delete this nft?',
		title:'Delete nft',
	  },
	})
  }
  
  const formik = useFormik({
	initialValues:initialValues,
	onSubmit:async (values) => handleSubmit(values)
	
  })
  
  
  useEffect(() => {
	nftsRefetch()
  }, [])//eslint-disable-line
  
  return {
	formik,
	openCreateCollectionModal,
	data,
	handleDeleteCollection
  }
  
}