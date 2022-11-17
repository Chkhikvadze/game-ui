import useSnackbarAlert from 'hooks/useSnackbar'
import { useFormik } from "formik";
import { useModal } from "hooks";
import { useEffect } from "react";
import {
  useCollectionsService,
  useCreateCollectionService,
  useDeleteCollectionByIdService
} from "services/useCollectionService";
import { useParams } from "react-router-dom";

const initialValues = {
  collection_name:'',
  collection_category:'',
  collection_description:'',
  project_id:''
}


export const useCollection = () => {
  const params = useParams()
  const id: string = params?.id!
  const [createCollection] = useCreateCollectionService()
  const {openModal, closeModal} = useModal()
  const {data, refetch:refetchCollection} = useCollectionsService({project_id:id, page:1, limit:100, search_text:""})
  
  const [deleteCollectionById] = useDeleteCollectionByIdService()
  
  
  const {setSnackbar} = useSnackbarAlert()
  
  
  const openCreateCollectionModal = () => {
	openModal({
	  name:'create-collection-modal',
	})
  }
  
  
  const handleSubmit = async (values: any) => {
	const projectInput = {
	  name:values.collection_name,
	  category:values.collection_category,
	  description:values.collection_description,
	  project_id:id,
	}
	
	
	const res = await createCollection(projectInput, () => {
	})
	
	if ( !res) {
	  setSnackbar({message:'Failed to create new collection', variant:'error'})
	  closeModal('create-project-modal')
	  return
	}
	
	if (res) {
	  setSnackbar({
		message:'New Collection created',
		variant:'success',
	  })
	  closeModal('create-collection-modal')
	  await refetchCollection()
	  return
	}
	
  }
  
  const handleDeleteCollection = async (project: any) => {
	openModal({
	  name:'delete-confirmation-modal',
	  data:{
		closeModal:() => closeModal('delete-confirmation-modal'),
		deleteItem:() => {
		  deleteCollectionById(project.id)
			.then(() => {
			  refetchCollection()
			  closeModal('delete-confirmation-modal')
			  setSnackbar({
				message:'Collection successfully deleted',
				variant:'success',
			  })
			})
			.catch(() => {
			  closeModal('delete-confirmation-modal')
			  setSnackbar({
				message:'Collection delete failed',
				variant:'error',
			  })
			})
		},
		label:'Are you sure you want to delete this collection?',
		title:'Delete collection',
	  },
	})
  }
  
  const formik = useFormik({
	initialValues:initialValues,
	onSubmit:async (values) => handleSubmit(values)
	
  })
  
  
  useEffect(() => {
	refetchCollection()
  }, [])//eslint-disable-line
  
  return {
	formik,
	openCreateCollectionModal,
	data,
	handleDeleteCollection
  }
  
}