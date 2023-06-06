import withRenderModal from 'hocs/withRenderModal'
import Modal from 'modals/Modal'

import CreateContractFormContainer from 'pages/Contract/ContractForm/CreateContractFormContainer'
import { StyledRoot } from './CreateCollectionModal'

type CreateContractModalProps = {
  data: any
}

const CreateContractModal = ({ data }: CreateContractModalProps) => {
  // console.log(data)
  return (
    <StyledRoot>
      <Modal
        fullscreen={true}
        modalWidth={'100%'}
        backgroundColor={'radial-gradient(107.39% 52.7% at 50% 50%, #3E4EA9 0%, #111B52 100%)'}
      >
        <CreateContractFormContainer data={data} />
      </Modal>
    </StyledRoot>
  )
}

export default withRenderModal('create-contract-modal')(CreateContractModal)
