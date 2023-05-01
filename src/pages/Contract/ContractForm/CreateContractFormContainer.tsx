import { useSearchParams } from 'react-router-dom'
import { useContractByIdService } from 'services'
import CreateContractForm from './CreateContractForm'
import { StyledLoader } from './CreateContractFormStyles'
import Loader from '@l3-lib/ui-core/dist/Loader'
import { useState } from 'react'

type CreateContractFormContainerProps = {
  closeModal: () => void
}

const CreateContractFormContainer = (props: CreateContractFormContainerProps) => {
  const [params] = useSearchParams()
  const contractId = params.get('contractId')
  const [isCreateInitially] = useState(!contractId)

  const { data: contract, loading } = useContractByIdService(
    { id: contractId ?? '' },
    { fetchPolicy: isCreateInitially ? 'cache-only' : 'cache-first' },
  )

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
