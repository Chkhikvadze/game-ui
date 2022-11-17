import { useCreateProjectService, useDeleteProjectByIdService, useProjectsService } from "services/useProjectService";
import useSnackbarAlert from 'hooks/useSnackbar'
import { useFormik } from "formik";
import { useModal } from "hooks";
import { useEffect } from "react";

const initialValues = {
  project_name:'',
  project_category:'',
  project_description:'',
}


export const useProjects = () => {
  const [createProjectService] = useCreateProjectService()
  const {openModal, closeModal} = useModal()
  const {data, refetch:refetchProjects} = useProjectsService({page:1, limit:100, search_text:""})
  const [deleteProjectById] = useDeleteProjectByIdService()
  
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
		deleteItem:() => {
		  deleteProjectById(project.id)
			.then(() => {
			  refetchProjects()
			  closeModal('delete-confirmation-modal')
			  setSnackbar({
				message:'Game successfully deleted',
				variant:'success',
			  })
			})
			.catch(() => {
			  closeModal('delete-confirmation-modal')
			  setSnackbar({
				message:'Game delete failed',
				variant:'error',
			  })
			})
		},
		label:'Are you sure you want to delete this game?',
		title:'Delete game',
	  },
	})
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
	handleDeleteProject
  }
  
}