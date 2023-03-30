import styled from 'styled-components'
import { ContractFormHook } from '../../useContractForm'
import RoyaltyFeeBadges from './RoyaltyFeeBadges'
import RoyaltySplit from './RoyaltyAddresses'

type RoyaltyFieldsProps = {
  formHook: ContractFormHook
  onChange: (key: string, value: unknown) => void
}

const RoyaltyFields = ({ formHook, onChange }: RoyaltyFieldsProps) => {
  return (
    <StyledWrapper>
      <RoyaltyFeeBadges formHook={formHook} onChange={onChange} />
      <RoyaltySplit formHook={formHook} onChange={onChange} />
    </StyledWrapper>
  )
}

export default RoyaltyFields

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
