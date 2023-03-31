import { useModal } from 'hooks'

export const useContracts = () => {
  const { openModal, closeModal } = useModal()

  const openCreateContractModal = () => {
    openModal({
      name: 'create-contract-modal',
    })
  }

  return {
    openCreateContractModal,
  }
}
