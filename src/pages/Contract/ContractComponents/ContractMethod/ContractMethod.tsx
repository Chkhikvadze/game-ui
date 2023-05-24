import { ReactNode, useRef, useState } from 'react'

import styled from 'styled-components'

import TextField from '@l3-lib/ui-core/dist/TextField'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'

import Tags from '@l3-lib/ui-core/dist/Tags'
import { Contract, useAssetsService } from 'services'
import useMint from './useMint'
import { usePlayersService } from 'services/usePlayerService'

type ContractMethodProps = {
  buttonName: string
  title: string
  description: string
  disabled?: boolean
  extraDetail?: ReactNode
  contract: Contract
  method: string
}

type CollectionOptionRendererProps = {
  label: string
  text: string
}

const CollectionOptionRenderer = ({ label, text }: CollectionOptionRendererProps) => {
  return (
    <div>
      {text && (
        <Typography
          value={text}
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
          customColor={'#FFF'}
        />
      )}

      <Tags key={label} label={label} readOnly outlined={true} color={Tags.colors.white} />
    </div>
  )
}

type Option = {
  label: string
  value: number | string
}

const ContractMethod = ({
  buttonName,
  title,
  description,
  disabled,
  extraDetail,
  contract,
  method,
}: ContractMethodProps) => {
  const [show, setShow] = useState(false)
  const [amount, setAmount] = useState('')
  const { handleMint } = useMint({ contract, method })
  const selectedAssetId = useRef<number>(1)
  const selectedPlayerId = useRef<string>()

  const { id, collection_id, game_id } = contract

  const { data: assets } = useAssetsService({
    game_id,
    collection_id: collection_id || '',
    page: 1,
    limit: 100,
    search_text: '',
  })

  const { data: players } = usePlayersService({
    game_id,
    page: 1,
    limit: 100,
    search_text: '',
  })

  const assetOptions = assets?.items?.map((item: any) => ({
    label: item.name,
    value: item.token_id,
  }))

  const playerOptions = players?.items?.map((item: any) => ({
    label: item.name || item.username,
    value: item.id,
  }))

  const handleOnSend = async () => {
    if (!game_id || !collection_id || !selectedPlayerId.current) return

    await handleMint({
      contract_id: id,
      game_id,
      collection_id,
      player_id: selectedPlayerId.current,
      asset: {
        token_id: selectedAssetId.current,
        amount: Number(amount),
      },
    })

    setShow(false)
  }

  return (
    <StyledRoot>
      <StyledView show={show}>
        <Tags label='GAS' color={'gradient_yellow'} size='small' readOnly />
        <StyledTextWrapper>
          <div>
            <Heading type={Heading.types.h1} value={title} customColor={'#FFF'} />
            <Typography
              value={description}
              type={Typography.types.P}
              size={Typography.sizes.md}
              customColor={'rgba(255, 255, 255, 0.8)'}
            />
          </div>
        </StyledTextWrapper>
        {extraDetail}
        <StyledButtonWrapper>
          <Button
            disabled={disabled}
            onClick={() => {
              setShow(true)
            }}
          >
            {buttonName}
          </Button>
        </StyledButtonWrapper>
      </StyledView>
      <StyledEdit show={show}>
        <StyledDropdownWrapper>
          <Typography
            value='Player'
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor={'#FFF'}
          />
          <Dropdown
            kind={Dropdown.kind.PRIMARY}
            placeholder='Choose player'
            size={Dropdown.size.SMALL}
            optionRenderer={CollectionOptionRenderer}
            options={playerOptions || []}
            onChange={(option: Option) => {
              selectedPlayerId.current = String(option.value)
            }}
            insideOverflowContainer
          />
        </StyledDropdownWrapper>

        <TextField
          title={'Amount'}
          type='number'
          value={amount}
          onChange={(value: string) => setAmount(value)}
        />

        <StyledDropdownWrapper>
          <Typography
            value='Asset'
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor={'#FFF'}
          />
          <Dropdown
            kind={Dropdown.kind.PRIMARY}
            placeholder='Choose asset'
            size={Dropdown.size.SMALL}
            optionRenderer={CollectionOptionRenderer}
            options={assetOptions || []}
            onChange={(option: Option) => {
              selectedAssetId.current = Number(option.value)
            }}
            insideOverflowContainer
          />
        </StyledDropdownWrapper>
        <StyledButtonWrapper>
          <Button
            kind={Button.kinds.TERTIARY}
            onClick={() => {
              setShow(false)
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleOnSend}>Send</Button>
        </StyledButtonWrapper>
      </StyledEdit>
    </StyledRoot>
  )
}

export default ContractMethod

const StyledRoot = styled.div`
  position: relative;
  height: 400px;
  width: 330px;

  display: flex;

  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
`
const StyledButtonWrapper = styled.div`
  margin-top: auto;
  display: flex;
  gap: 12px;
`
const StyledView = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px;
  gap: 12px;

  opacity: ${p => p.show && '0'};
`

const StyledEdit = styled.div<{ show: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px;
  gap: 12px;

  display: ${p => !p.show && 'none'};
`
const StyledDropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  gap: 8px;
`
const StyledTextWrapper = styled.div`
  border-bottom: 1px rgba(255, 255, 255, 0.3) solid;
  padding-bottom: 10px;

  width: 100%;
`
