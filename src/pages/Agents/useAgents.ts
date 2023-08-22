import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useModal } from 'hooks'
import { useContext } from 'react'
import { useAgentsService } from 'services/agent/useAgentsService'
import { useCreateAgentService } from 'services/agent/useCreateAgentService'
import { useDeleteAgentByIdService } from 'services/agent/useDeleteAgentByIdService'

export const useAgents = () => {
  const { setToast } = useContext(ToastContext)

  const { openModal, closeModal } = useModal()

  const openCreateAgentModal = () => {
    openModal({ name: 'create-agent-modal' })
  }
  const closeCreateAgentModal = () => {
    closeModal('create-agent-modal')
  }

  const { data: agentsData, refetch: refetchAgents } = useAgentsService()
  const [createAgentService] = useCreateAgentService()
  const { deleteAgentById } = useDeleteAgentByIdService()

  const initialValues = {
    agent_name: '',
    agent_role: '',
    agent_description: '',
    agent_temperature: 0,
  }

  const handleSubmit = async (values: any) => {
    try {
      const agentInput = {
        name: values.agent_name,
        role: values.agent_role,
        description: values.agent_description,
        temperature: values.agent_temperature,
      }
      await createAgentService(agentInput)
      setToast({
        message: 'New Agent was Created!',
        type: 'positive',
        open: true,
      })
      closeCreateAgentModal()
      refetchAgents()
    } catch (e) {
      console.log('rrorr', e)
      closeCreateAgentModal()
      setToast({
        message: 'Failed to create Agent!',
        type: 'negative',
        open: true,
      })
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async values => handleSubmit(values),
    // validationSchema: gameValidationSchema,
    // enableReinitialize: true,
  })

  const deleteAgentHandler = (id: string) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        deleteItem: async () => {
          try {
            await deleteAgentById(id)
            await refetchAgents()
            closeModal('delete-confirmation-modal')
            setToast({
              message: 'Agent was deleted!',
              type: 'positive',
              open: true,
            })
          } catch (e) {
            setToast({
              message: 'Failed to delete Agent!',
              type: 'negative',
              open: true,
            })
            closeModal('delete-confirmation-modal')
          }
        },
        closeModal: () => {
          closeModal('delete-confirmation-modal')
        },
        label: 'Delete Agent?',
        title: 'Delete Agent?',
      },
    })
  }

  console.log('agents', agentsData)
  return {
    agentsData,
    openCreateAgentModal,
    formik,
    closeCreateAgentModal,
    handleSubmit,
    deleteAgentHandler,
  }
}
