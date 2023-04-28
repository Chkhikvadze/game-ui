import styled from 'styled-components'
import { ContractFormHook } from '../../useContractForm'
import RoyaltyFeeBadges from './RoyaltyFeeBadges'
import RoyaltySplit from './RoyaltyAddresses'

type RoyaltyFieldsProps = {
  formHook: ContractFormHook
}

const RoyaltyFields = ({ formHook }: RoyaltyFieldsProps) => {
  const { is_royalties } = formHook.watch('config')
  const { constructor_args } = formHook.watch()

  return (
    <StyledWrapper>
      {is_royalties && <RoyaltyFeeBadges formHook={formHook} />}
      {constructor_args[5] && <RoyaltySplit formHook={formHook} />}
    </StyledWrapper>
  )
}

export default RoyaltyFields

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
