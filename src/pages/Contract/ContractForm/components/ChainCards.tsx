import ContractCard from 'pages/Contract/Contracts/ContractCard'
import styled, { css } from 'styled-components'
import { CHAIN_CARDS } from '../CreateContractFormUtils'
import { ContractFormHook } from '../useContractForm'

type ChainCardsProps = {
  form: ContractFormHook
}

const ChainCards = ({ form }: ChainCardsProps) => {
  const selectedChainId = form.watch('chain_id')

  return (
    <>
      {CHAIN_CARDS.map(({ title, subtitle, image, chainId }, index) => (
        <StyledDisabledDiv key={index} disabled={subtitle === 'Coming soon'}>
          <ContractCard
            selected={chainId === selectedChainId}
            onClick={() => form.setValue('chain_id', chainId)}
            image={image}
            title={title}
            subtitle={subtitle}
            isCreate
          />
        </StyledDisabledDiv>
      ))}
    </>
  )
}

export default ChainCards

const StyledDisabledDiv = styled.div<{ disabled: boolean }>`
  ${p =>
    p.disabled &&
    css`
      mix-blend-mode: soft-light;
      pointer-events: none;
    `};
`
