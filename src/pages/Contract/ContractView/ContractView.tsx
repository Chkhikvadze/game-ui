import styled from 'styled-components'

import Loader from '@l3-lib/ui-core/dist/Loader'

import { useParams } from 'react-router-dom'

import { useContractById } from 'services/useContractService'

import ContractViewDetails from './ContractViewDetails'

const ContractView = () => {
  const { contractId } = useParams()

  const { data: contract, loading } = useContractById({ id: contractId })

  if (loading) {
    return (
      <StyledLoader>
        <Loader />
      </StyledLoader>
    )
  }

  if (!contract) return <p>Contract not found</p>

  return <ContractViewDetails contract={contract} />
}

export default ContractView

export const StyledLoader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    width: 50px;
    height: 50px;
  }
`
