import withRenderModal from 'hocs/withRenderModal'
import Modal from 'oldComponents/molecules/Modal'

import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'
import CreateContractFormContainer from 'pages/Contract/ContractForm/CreateContractFormContainer'

type CreateContractModalProps = {
  data: any
}

const CreateContractModal = ({ data }: CreateContractModalProps) => {
  console.log(data)
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
