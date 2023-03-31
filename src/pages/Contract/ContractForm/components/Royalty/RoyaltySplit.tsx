import styled from 'styled-components'
import { ContractFormHook } from '../../useContractForm'
import RoyaltyFeeBadges from './RoyaltyFeeBadges'
import RoyaltySplit from './RoyaltyAddresses'

type RoyaltyFieldsProps = {
  formHook: ContractFormHook
}

const RoyaltyFields = ({ formHook }: RoyaltyFieldsProps) => {
  return (
    <StyledWrapper>
      <RoyaltyFeeBadges formHook={formHook} />
      <RoyaltySplit formHook={formHook} />
    </StyledWrapper>
  )
}

export default RoyaltyFields

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
