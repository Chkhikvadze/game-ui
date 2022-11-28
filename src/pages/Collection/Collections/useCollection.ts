import useSnackbarAlert from 'hooks/useSnackbar'
import { useFormik } from "formik";
import { useModal } from "hooks";
import { useEffect, useState } from "react";
import {
  useCollectionsService,
  useCreateCollectionService,
  useDeleteCollectionByIdService
} from "services/useCollectionService";
import { useParams } from "react-router-dom";
import useUploadFile from "hooks/useUploadFile";

const initialValues = {
  collection_name:'',
  collection_category:'',
  collection_description:'',
  project_id:'',
  banner_image:"",
}


export const useCollection = () => {
  const params = useParams()
  const id: string = params?.projectId!
  
  const [loader, setLoader] = useState(false)
  
  
  const [createCollection] = useCreateCollectionService()
  const {openModal, closeModal} = useModal()
  const {data, refetch:refetchCollection} = useCollectionsService({project_id:id, page:1, limit:100, search_text:""})
  
  const [deleteCollectionById] = useDeleteCollectionByIdService()
  
  const {uploadFile, uploadProgress} = useUploadFile()
  
  const {setSnackbar} = useSnackbarAlert()
  
  
  const openCreateCollectionModal = () => {
	openModal({
	  name:'create-collection-modal',
	})
  }
  
  
  const handleSubmit = async (values: any) => {
	console.log(values, 'values');
	const projectInput = {
	  name:values.collection_name,
	  category:values.collection_category,
	  description:values.collection_description,
	  project_id:id,
	  banner_image:values.banner_image
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
  
  
  const handleChangeFile = async (e: React.SyntheticEvent<EventTarget>) => {
	const {files}: any = e.target
	
	const fileObj = {
	  fileName:files[ 0 ].name,
	  type:files[ 0 ].type,
	  fileSize:files[ 0 ].size,
	  locationField:'collection'
	}
	setLoader(true)
	
	const res = await uploadFile(fileObj, files[ 0 ],)
	
	if (res) {
	  setLoader(false)
	}
	
	await formik.setFieldValue('banner_image', res)
	console.log(uploadProgress, "progress")
	
	
	// uploadFile(file, files[0], 'scenario', () => {})
  }
  
  useEffect(() => {
	refetchCollection()
  }, [])//eslint-disable-line
  
  return {
	formik,
	openCreateCollectionModal,
	data,
	handleDeleteCollection,
	handleChangeFile,
	loader
  }
  
}