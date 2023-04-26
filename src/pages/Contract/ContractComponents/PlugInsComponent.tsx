import NavigationChevronUp from '@l3-lib/ui-core/dist/icons/NavigationChevronUp'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import styled, { css } from 'styled-components'
import { useState } from 'react'
import { ContractFormHook } from '../ContractForm/useContractForm'

type FieldComponentProps = {
  title: string
  added?: boolean
  onClick?: any
  description?: string
  disabled?: boolean
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
}: FieldComponentProps) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <StyledMainSection added={added}>
        <StyledTitleWrapper>
          <StyledArtWork />
          <Typography
            value={title}
            type={Typography.types.P}
            size={Typography.sizes.md}
            customColor={'#FFF'}
          />
        </StyledTitleWrapper>
        <StyledButtonWrapper>
          <StyledAddWrapper onClick={onClick} disabled={disabled}>
            <Typography
              value={added ? 'Remove' : 'Add'}
              type={Typography.types.P}
              size={Typography.sizes.sm}
              customColor={'#FFF'}
            />
          </StyledAddWrapper>

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
  const { max_mint_per_transaction, max_mint_per_player, player_mint_fee, is_royalties } =
    formHook.watch('config')
  const { constructor_args } = formHook.watch()

  const DEFAULT_CONSTRUCTOR_ARGS = [[], [], 500, '', '', false]

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
          added={max_mint_per_player !== undefined}
          title={'Max assets per player'}
          description={`This refers to the maximum number of NFTs that a single player is allowed to create during a public sale. It ensures that everyone has an equal chance to create NFTs and helps prevent any unfair advantage that may arise from one player creating too many NFTs.`}
          onClick={() => {
            if (max_mint_per_player !== undefined) {
              formHook.setValue('config.max_mint_per_player', undefined)
            } else {
              formHook.setValue('config.max_mint_per_player', 0)
            }
          }}
        />
        <FieldComponent
          added={max_mint_per_transaction !== undefined}
          title={'Max assets per transaction'}
          description={`The plugin can limit the number of NFTs that a player can create at once, which prevents botting and ensures that everyone has an equal opportunity to create their NFTs.`}
          onClick={() => {
            if (max_mint_per_transaction !== undefined) {
              formHook.setValue('config.max_mint_per_transaction', undefined)
            } else {
              formHook.setValue('config.max_mint_per_transaction', 0)
            }
          }}
        />
        <FieldComponent
          added={is_royalties}
          title={'Royalties'}
          description={`The royalty percentage refers to the portion of the sale proceeds that the NFT creator receives each time their NFT is resold on a secondary market. For example, if the royalty percentage is set at 10%, and the NFT sells for $1,000 on a secondary market, the creator would receive $100. This feature ensures that creators continue to earn revenue from their NFTs' resale even after the initial sale and supports their ongoing efforts to create unique and valuable content..`}
          onClick={() => {
            formHook.setValue('config.is_royalties', !is_royalties)
          }}
        />
        <FieldComponent
          added={constructor_args[5]}
          title={'Royalties Split'}
          description={`If you are the sole shareholder with 100% ownership of the collection, you can skip the "royalties split" step. However, if there are other shareholders, this feature allows you to split the earnings with them according to the agreed-upon terms. This promotes fairness and collaboration among NFT creators and collectors.`}
          onClick={() => {
            if (constructor_args[5]) {
              formHook.setValue('constructor_args', [[], [], 500, '', '', false])
            } else {
              formHook.setValue('constructor_args', [[], [], 500, '', '', true])
            }
          }}
        />
        {/* <FieldComponent title={'Minting'} /> */}
        <FieldComponent
          title={'Price per asset'}
          added={player_mint_fee !== undefined}
          onClick={() => {
            if (player_mint_fee !== undefined) {
              formHook.setValue('config.player_mint_fee', undefined)
            } else {
              formHook.setValue('config.player_mint_fee', 0)
            }
          }}
        />
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
  border: 1px solid transparent;

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
const StyledArtWork = styled.div`
  width: 48px;
  height: 48px;

  background: rgba(255, 255, 255, 0.2);
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
