import withRenderModal from 'hocs/withRenderModal'
import Modal from '@l3-lib/ui-core/dist/Modal'

import CreateContractFormContainer from 'pages/Contract/ContractForm/CreateContractFormContainer'

type CreateContractModalProps = {
  data: any
}

const CreateContractModal = ({ data }: CreateContractModalProps) => {
  return (
    <Modal fullscreen show isClean>
      <CreateContractFormContainer data={data} />
    </Modal>
  )
}

export default withRenderModal('create-contract-modal')(CreateContractModal)
