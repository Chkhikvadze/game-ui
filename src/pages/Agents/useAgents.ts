import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useModal } from 'hooks'
import { useContext } from 'react'
import { useAgentsService } from 'services/agent/useAgentsService'
import { useCreateAgentService } from 'services/agent/useCreateAgentService'

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

  const initialValues = {
    name: '',
    role: '',
    description: '',
  }

  const handleSubmit = async (values: any) => {
    try {
      const agentInput = {
        name: values.agent_name,
        role: values.agent_role,
        description: values.agent_description,
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

  console.log('agents', agentsData)
  return { agentsData, openCreateAgentModal, formik, closeCreateAgentModal, handleSubmit }
}
