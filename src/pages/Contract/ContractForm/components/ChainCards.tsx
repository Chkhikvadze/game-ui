import ContractCard from 'pages/Contract/Contracts/ContractCard'
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
        <ContractCard
          key={index}
          selected={chainId === selectedChainId}
          onClick={() => form.setValue('chain_id', chainId)}
          image={image}
          title={title}
          subtitle={subtitle}
          isCreate
        />
      ))}
    </>
  )
}

export default ChainCards
