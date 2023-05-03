import styled from 'styled-components'
import { CHAIN_ID_TO_CONTRACT } from 'pages/Contract/Contracts/Contract.utils'
import { useCollectionByIdService } from 'services/useCollectionService'
import { shortenAddress } from 'utils/format'
import { ContractFormHook } from '../../useContractForm'
import DeploySummaryCard from './DeploySummaryCard'

type DeploySummaryProps = {
  formHook: ContractFormHook
}

const DeploySummary = ({ formHook }: DeploySummaryProps) => {
  const { chain_id, collection_id, config, constructor_config } = formHook.watch()
  const { data } = useCollectionByIdService({ id: collection_id })

  const chain = CHAIN_ID_TO_CONTRACT[chain_id]
  const { max_mint_per_player, max_mint_per_transaction, player_mint_fee, collection_size } = config
  const { royalty_addresses, royalty_percentages, royalty_fee } = constructor_config

  const royaltyProperties = royalty_addresses.map((address: string, index: number) => ({
    title: shortenAddress(address),
    value: `${royalty_percentages[index]}%`,
  }))

  return (
    <StyledWrapper>
      <DeploySummaryCard items={[{ title: 'Chain', value: chain.title, isBig: true }]} />

      <DeploySummaryCard
        items={[
          { title: 'Details', isBig: true, hasSeparator: true },
          { title: 'Collection size', value: collection_size },
          { title: 'Max assets per player', value: max_mint_per_player },
          { title: 'Max assets per transaction', value: max_mint_per_transaction },
          { title: 'Player mint fee', value: `${player_mint_fee} ETH` },
        ]}
      />

      {collection_id && (
        <DeploySummaryCard items={[{ title: 'Collection', value: data?.name, isBig: true }]} />
      )}

      <DeploySummaryCard
        items={[
          {
            title: 'Royalties',
            value: `${royalty_fee / 100}%`,
            isBig: true,
            hasSeparator: true,
            isValueBadge: true,
          },
          { title: 'Split', isBig: true },
          ...royaltyProperties,
        ]}
      />
    </StyledWrapper>
  )
}

export default DeploySummary

const StyledWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`
