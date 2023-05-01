import styled from 'styled-components'
import { ContractFormHook } from '../../useContractForm'
import RoyaltyFeeBadges from './RoyaltyFeeBadges'
import RoyaltyAddresses from './RoyaltyAddresses'

type RoyaltyFieldsProps = {
  formHook: ContractFormHook
}

const RoyaltyFields = ({ formHook }: RoyaltyFieldsProps) => {
  const { is_royalties } = formHook.watch('config')
  const is_royalty_split = formHook.watch('constructor_config.is_royalty_split')

  return (
    <StyledWrapper>
      {is_royalties && <RoyaltyFeeBadges formHook={formHook} />}
      {is_royalty_split && <RoyaltyAddresses formHook={formHook} />}
    </StyledWrapper>
  )
}

export default RoyaltyFields

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
