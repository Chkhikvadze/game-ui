import NavigationChevronUp from '@l3-lib/ui-core/dist/icons/NavigationChevronUp'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'

// import Player from '@l3-lib/ui-core/dist/icons/Players'
// import Check from '@l3-lib/ui-core/dist/icons/SpeacialCheck'
// import Royalties from '@l3-lib/ui-core/dist/icons/Royalties'

import { ReactComponent as Percentage } from './svg/percentage.svg'
import { ReactComponent as Subtract } from './svg/Subtract.svg'
import { ReactComponent as Done } from './svg/Done.svg'
import { ReactComponent as Transaction } from './svg/transaction.svg'
import { ReactComponent as Whitelist } from './svg/whitelist.svg'
import { ReactComponent as Vector } from './svg/Vector.svg'
import { ReactComponent as Player } from './svg/Player.svg'

import styled, { css } from 'styled-components'
import { useState } from 'react'
import { ContractFormHook } from '../ContractForm/useContractForm'

type FieldComponentProps = {
  title: string
  added?: boolean
  onClick?: any
  description?: string
  disabled?: boolean
  noButton?: boolean
}

type DetailFieldsProps = {
  formHook: ContractFormHook
}

const FieldComponent = ({
  title,
  onClick,
  added = false,
  description,
  disabled = false,
  noButton,
}: FieldComponentProps) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <StyledMainSection added={added}>
        <StyledTitleWrapper>
          <StyledArtWork added={added} title={title}>
            {title === 'Royalties' && <Vector />}
            {title === 'Player mint fee' && <Done />}
            {title === 'Max assets per player' && <Player />}
            {title === 'Max assets per transaction' && <Transaction />}
            {title === 'Collection size' && <Subtract />}
            {title === 'Royalties Split' && <Percentage />}
            {title === 'Whitelist (Coming soon)' && <Whitelist />}
          </StyledArtWork>
          <Typography
            value={title}
            type={Typography.types.P}
            size={Typography.sizes.md}
            customColor={'#FFF'}
          />
        </StyledTitleWrapper>
        <StyledButtonWrapper>
          {!noButton && (
            <StyledAddWrapper onClick={onClick} disabled={disabled}>
              <Typography
                value={added ? 'Remove' : 'Add'}
                type={Typography.types.P}
                size={Typography.sizes.sm}
                customColor={'#FFF'}
              />
            </StyledAddWrapper>
          )}

          <StyledNavigationWrapper onClick={() => setShow(!show)} show={show}>
            <NavigationChevronUp />
          </StyledNavigationWrapper>
        </StyledButtonWrapper>
      </StyledMainSection>

      <StyledTransitionDiv show={show}>
        <Typography
          value={description}
          type={Typography.types.P}
          size={Typography.sizes.sm}
          customColor={'#FFF'}
        />
      </StyledTransitionDiv>
    </>
  )
}

const PlugInsComponent = ({ formHook }: DetailFieldsProps) => {
  const {
    max_mint_per_transaction,
    max_mint_per_player,
    player_mint_fee,
    is_royalties,
    collection_size,
  } = formHook.watch('config')

  const isRoyaltySplit = formHook.watch('constructor_config.is_royalty_split')

  const fieldComponents = [
    {
      added: max_mint_per_player !== undefined,
      title: 'Max assets per player',
      description:
        'This refers to the maximum number of NFTs that a single player is allowed to create during a public sale. It ensures that everyone has an equal chance to create NFTs and helps prevent any unfair advantage that may arise from one player creating too many NFTs.',
      onClick: () => {
        if (max_mint_per_player !== undefined) {
          formHook.setValue('config.max_mint_per_player', undefined)
        } else {
          formHook.setValue('config.max_mint_per_player', 10)
        }
      },
    },
    {
      added: max_mint_per_transaction !== undefined,
      title: 'Max assets per transaction',
      description: `The plugin can limit the number of NFTs that a player can create at once, which prevents botting and ensures that everyone has an equal opportunity to create their NFTs.`,
      onClick: () => {
        if (max_mint_per_transaction !== undefined) {
          formHook.setValue('config.max_mint_per_transaction', undefined)
        } else {
          formHook.setValue('config.max_mint_per_transaction', 1)
        }
      },
    },
    {
      added: collection_size !== undefined,
      title: 'Collection size',
      description: `Max number of NFTs that can be minted in this collection`,
      onClick: () => {
        if (collection_size !== undefined) {
          formHook.setValue('config.collection_size', undefined)
        } else {
          formHook.setValue('config.collection_size', 1)
        }
      },
    },
    {
      added: isRoyaltySplit,
      title: 'Royalties Split',
      description: `If you are the sole shareholder with 100% ownership of the collection, you can skip the "royalties split" step. However, if there are other shareholders, this feature allows you to split the earnings with them according to the agreed-upon terms. This promotes fairness and collaboration among NFT creators and collectors.`,
      onClick: () => {
        const config = formHook.getValues('constructor_config')
        const { owner_address, is_royalty_split } = config

        const isRoyaltySplitEnabled = !is_royalty_split
        const ownerRoyaltyAddress = owner_address ? [owner_address] : []
        const ownerRoyaltyPercentage = owner_address ? [100] : []

        const newConfig = {
          ...config,
          is_royalty_split: isRoyaltySplitEnabled,
          royalty_addresses: isRoyaltySplitEnabled ? [...ownerRoyaltyAddress] : ownerRoyaltyAddress,
          royalty_percentages: isRoyaltySplitEnabled
            ? [...ownerRoyaltyPercentage]
            : ownerRoyaltyPercentage,
        }

        // const newConfig = {
        //   ...config,
        //   is_royalty_split: isRoyaltySplitEnabled,
        //   royalty_addresses: isRoyaltySplitEnabled ? [] : ownerRoyaltyAddress,
        //   royalty_percentages: isRoyaltySplitEnabled ? [] : ownerRoyaltyPercentage,
        // }

        formHook.setValue('constructor_config', newConfig)
      },
    },
  ]

  // Sort the field components based on the 'added' prop
  const sortedFieldComponents = [...fieldComponents].sort((a, b) => {
    if (a.added && !b.added) {
      return -1
    } else if (!a.added && b.added) {
      return 1
    } else {
      return 0
    }
  })

  return (
    <>
      <div>
        <Heading
          type={Heading.types.h1}
          value='Plug-ins '
          size='medium'
          customColor={'rgba(255, 255, 255, 0.8)'}
        />
      </div>
      <Typography
        value='It’s time to customize your needs. Activate the functions you may need in your contract, and simplify your creation with no-code.'
        type={Typography.types.P}
        size={Typography.sizes.lg}
        customColor={'rgba(255, 255, 255, 0.6)'}
      />

      <StyledInputsWrapper>
        <FieldComponent
          added={is_royalties}
          noButton
          title={'Royalties'}
          description={`The royalty percentage refers to the portion of the sale proceeds that the NFT creator receives each time their NFT is resold on a secondary market. For example, if the royalty percentage is set at 10%, and the NFT sells for $1,000 on a secondary market, the creator would receive $100. This feature ensures that creators continue to earn revenue from their NFTs' resale even after the initial sale and supports their ongoing efforts to create unique and valuable content..`}
        />
        <FieldComponent
          noButton
          title={'Player mint fee'}
          description={`You should define the player mint fee for that collection. It is required and will work with the "Price per asset" plugin. If you do not define a price for any asset, the smart contract will use the "Player mint fee" by default.`}
          added={player_mint_fee !== undefined}
        />

        {sortedFieldComponents.map((field, index) => (
          <FieldComponent key={index} {...field} />
        ))}

        <FieldComponent
          disabled
          title={'Whitelist (Coming soon)'}
          description={`The "Whitelist" feature allows you to give early access to mint NFTs to specific players or groups, such as team members, early supporters, or dedicated players. This feature gives these players a head start in acquiring NFTs before the general public, which can increase their engagement and loyalty to the game or project. Developers can generate buzz and interest around their game or project by building a strong community of early adopters, ultimately leading to a more successful launch.`}
        />
      </StyledInputsWrapper>
    </>
  )
}

export default PlugInsComponent

const StyledInputsWrapper = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`
const StyledMainSection = styled.div<{ added: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  // border: 1px solid transparent;

  padding: 2px 16px;

  ${p =>
    p.added &&
    css`
      border-radius: 4px;
      border-color: #73fafd;
    `};
  /* max-width: 600px;
  min-width: 400px; */
`

const StyledButtonWrapper = styled.div`
  display: flex;
  gap: 8px;

  align-items: center;
`
const StyledArtWork = styled.div<{ added: boolean; title: string }>`
  display: flex;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background: ${props =>
    props.title === 'Royalties' ||
    props.title === 'Max assets per player' ||
    props.title === 'Max assets per transaction' ||
    props.title === 'Royalties Split'
      ? 'linear-gradient(180deg, #73FAFD 0%, #50B1D7 100%)' // Blue color code
      : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 2px;
`

const StyledTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const StyledNavigationWrapper = styled.div<{ show: boolean }>`
  color: #fff;

  cursor: pointer;

  rotate: ${p => !p.show && '180deg'};
`
const StyledTransitionDiv = styled.div<{ show: boolean }>`
  padding: 0px 16px;

  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.3s, opacity 0.3s;
  ${p =>
    p.show &&
    css`
      max-height: 200px;

      opacity: 1;
    `};
`
const StyledAddWrapper = styled.div<{ disabled: boolean }>`
  border-radius: 6px;
  padding: 6px 12px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }

  ${p =>
    p.disabled &&
    css`
      mix-blend-mode: soft-light;
      pointer-events: none;
    `};
`
