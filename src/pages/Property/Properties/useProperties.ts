import useSnackbarAlert from 'hooks/useSnackbar'
import { useFormik } from "formik";
import { useModal } from "hooks";
import { useEffect } from "react";
import {
  useCollectionByIdService,
} from "services/useCollectionService";
import { useParams } from "react-router-dom";
import {
  useCreatePropertyService,
  useDeletePropertyByIdService,
  usePropertiesService
} from "services/usePropertyService";

const initialValues = {
  property_name:"",
  property_type:'',
  property_description:""
}


export const useProperties = () => {
  const params = useParams()
  const collectionId: string = params?.collectionId!
  
  const [deletePropertById] = useDeletePropertyByIdService()
  const {setSnackbar} = useSnackbarAlert()
  const {data:collection} = useCollectionByIdService({id:collectionId})
  const {project_id} = collection
  
  const [createPropertyService] = useCreatePropertyService()
  
  const {openModal, closeModal} = useModal()
  
  const {data, refetch:nftsRefetch} = usePropertiesService({
	project_id,
	collection_id:collectionId,
	page:1,
	limit:100,
	search_text:""
  })
  
  const openCreateCollectionModal = () => {
	openModal({
	  name:'create-property-modal',
	})
  }
  
  const handleSubmit = async (values: any) => {
	const propertyInput = {
	  collection_id:collectionId,
	  project_id,
	  name:values.property_name,
	  description:values.property_description,
	  property_type:values.property_type,
	}
	
	
	const res = await createPropertyService(propertyInput, () => {
	})
	
	if ( !res) {
	  setSnackbar({message:'Failed to create new propery', variant:'error'})
	  closeModal('create-property-modal')
	  return
	}
	
	if (res) {
	  setSnackbar({
		message:'New property created',
		variant:'success',
	  })
	  closeModal('create-property-modal')
	  await nftsRefetch()
	  return
	}
	
  }
  
  const handleDeleteCollection = async (property: any) => {
	openModal({
	  name:'delete-confirmation-modal',
	  data:{
		closeModal:() => closeModal('delete-confirmation-modal'),
		deleteItem:() => {
		  deletePropertById(property.id)
			.then(() => {
			  nftsRefetch()
			  closeModal('delete-confirmation-modal')
			  setSnackbar({
				message:'Property successfully deleted',
				variant:'success',
			  })
			})
			.catch(() => {
			  closeModal('delete-confirmation-modal')
			  setSnackbar({
				message:'Property delete failed',
				variant:'error',
			  })
			})
		},
		label:'Are you sure you want to delete this property?',
		title:'Delete property',
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