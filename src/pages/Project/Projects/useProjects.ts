import { useCreateProjectService, useDeleteProjectByIdService, useProjectsService } from "services/useProjectService";
import useSnackbarAlert from 'hooks/useSnackbar'
import { useFormik } from "formik";
import { useModal } from "hooks";
import { useEffect, useState } from "react";
import useUploadFile from "hooks/useUploadFile";


const initialValues = {
  project_name:'',
  project_category:'',
  project_description:'',
  banner_image:"",
  logo_image:"",
  background_image:"",
}


export const useProjects = () => {
  const [fileUploadLoader, setFileUploadLoader] = useState(false)
  
  
  const [createProjectService] = useCreateProjectService()
  const {openModal, closeModal} = useModal()
  const {data, refetch:refetchProjects} = useProjectsService({page:1, limit:100, search_text:""})
  const {deleteProjectById, loading} = useDeleteProjectByIdService()
  const {uploadFile, uploadProgress} = useUploadFile()
  
  // const {data:projectById} = useProjectByIdService({id:"1"})
  // const [updateProjectById] = useUpdateProjectByIdService()
  
  
  const {setSnackbar} = useSnackbarAlert()
  
  
  const openCreateProjectModal = () => {
	openModal({
	  name:'create-project-modal',
	})
  }
  
  
  const handleSubmit = async (values: any) => {
	const projectInput = {
	  name:values.project_name,
	  category:values.project_category,
	  description:values.project_description,
	  banner_image:values.banner_image,
	  logo_image:values.logo_image,
	  background_image:values.background_image,
	}
	
	
	const res = await createProjectService(projectInput, () => {
	})
	
	if ( !res) {
	  setSnackbar({message:'Failed to Add new API Key', variant:'error'})
	  closeModal('create-project-modal')
	  return
	}
	
	if (res) {
	  setSnackbar({
		message:'New game was created',
		variant:'success',
	  })
	  closeModal('create-project-modal')
	  refetchProjects()
	  return
	}
	
  }
  
  const handleDeleteProject = async (project: any) => {
	openModal({
	  name:'delete-confirmation-modal',
	  data:{
		closeModal:() => closeModal('delete-confirmation-modal'),
		deleteItem:async () => {
		  const res = await deleteProjectById(project.id)
		  if (res.success) {
			await refetchProjects()
			setSnackbar({
			  message:'Game successfully deleted',
			  variant:'success',
			})
			await closeModal('delete-confirmation-modal')
		  }
		  if ( !res.success) {
			setSnackbar({
			  message:'Game delete failed',
			  variant:'error',
			})
		  }
		},
		label:'Are you sure you want to delete this game?',
		title:'Delete game',
	  },
	})
  }
  
  const handleChangeFile = async (e: React.SyntheticEvent<EventTarget>, fieldName: string) => {
	const {files}: any = e.target
	
	const fileObj = {
	  fileName:files[ 0 ].name,
	  type:files[ 0 ].type,
	  fileSize:files[ 0 ].size,
	  locationField:'collection'
	}
	
	setFileUploadLoader(true)
	
	const res = await uploadFile(fileObj, files[ 0 ],)
	
	
	if (res) {
	  setFileUploadLoader(false)
	}
	
	await formik.setFieldValue(fieldName, res)
	
  }
  
  const formik = useFormik({
	initialValues:initialValues,
	onSubmit:async (values) => handleSubmit(values)
	
  })
  
  
  useEffect(() => {
	refetchProjects()
  }, [])//eslint-disable-line
  
  return {
	formik,
	openCreateProjectModal,
	data,
	handleDeleteProject,
	fileUploadLoader,
	handleChangeFile
  }
  
}