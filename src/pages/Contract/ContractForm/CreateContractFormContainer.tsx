import { useSearchParams } from 'react-router-dom'
import { useContractById } from 'services/useContractService'
import CreateContractForm from './CreateContractForm'
import { StyledLoader } from './CreateContractFormStyles'
import Loader from '@l3-lib/ui-core/dist/Loader'

type CreateContractFormContainerProps = {
  closeModal: () => void
}

const CreateContractFormContainer = (props: CreateContractFormContainerProps) => {
  const [params, setSearchParams] = useSearchParams()
  const contractId = params.get('contractId')
  const { data: contract, loading } = useContractById({ id: contractId ?? '' })

  if (loading) {
    return (
      <StyledLoader>
        <Loader />
      </StyledLoader>
    )
  }

  return <CreateContractForm {...props} contractId={contractId} contract={contract} />
}

export default CreateContractFormContainer
