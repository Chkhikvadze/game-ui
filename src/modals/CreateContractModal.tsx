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
      <Modal secondaryBg>
        <CreateContractFormContainer data={data} />
      </Modal>
    </StyledRoot>
  )
}

export default withRenderModal('create-contract-modal')(CreateContractModal)
