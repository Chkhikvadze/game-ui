import styled from 'styled-components'
import Loader from '@l3-lib/ui-core/dist/Loader'
import { useParams } from 'react-router-dom'

import { useContractByIdService } from 'services'
import ContractViewDetails from './ContractViewDetails'
import { StyledInnerGroup, StyledInnerWrapper } from 'styles/globalStyle.css'

const ContractView = () => {
  const { contractId } = useParams()

  const { data: contract, loading } = useContractByIdService({ id: contractId })

  if (loading) {
    return (
      <StyledLoader>
        <Loader />
      </StyledLoader>
    )
  }

  if (!contract) return <p>Contract not found</p>

  return (
    <StyledInnerGroup>
      <StyledInnerWrapper>
        <ContractViewDetails contract={contract} />
      </StyledInnerWrapper>
    </StyledInnerGroup>
  )
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
