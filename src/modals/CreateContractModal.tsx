import withRenderModal from 'hocs/withRenderModal'
import Modal from 'oldComponents/molecules/Modal'
import CreateContractForm from 'pages/Contract/ContractForm'

import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'

type CreateContractModalProps = {
  closeModal: () => void
}

const CreateContractModal = ({ closeModal }: CreateContractModalProps) => {
  return (
    <StyledRoot>
      <Modal
        fullscreen={true}
        modalWidth={'100%'}
        close={closeModal}
        backgroundColor={'radial-gradient(107.39% 52.7% at 50% 50%, #3E4EA9 0%, #111B52 100%)'}
      >
        <CreateContractForm closeModal={closeModal} />
      </Modal>
    </StyledRoot>
  )
}

export default withRenderModal('create-contract-modal')(CreateContractModal)
