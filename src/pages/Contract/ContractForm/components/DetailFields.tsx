import Typography from '@l3-lib/ui-core/dist/Typography'
import TextField from '@l3-lib/ui-core/dist/TextField'

import styled from 'styled-components'
import { ContractFormHook } from '../useContractForm'
import RoyaltyFields from './Royalty/RoyaltySplit'

type DetailFieldsProps = {
  formHook: ContractFormHook
}

const DetailFields = ({ formHook }: DetailFieldsProps) => {
  const { collection_size, max_mint_per_transaction, max_mint_per_player, player_mint_fee } =
    formHook.watch('config')
  const {
    formState: { errors },
  } = formHook

  return (
    <StyledInputsWrapper>
      {collection_size !== undefined && (
        <StyledInput>
          <Typography
            value='Collection size'
            type={Typography.types.P}
            size={Typography.sizes.lg}
            customColor={'#fff'}
          />
          <StyledTextFieldWrapper>
            <TextField
              placeholder='0'
              type='number'
              value={collection_size}
              onChange={(value: string) => {
                formHook.setValue('config.collection_size', Number(value), {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }}
              validation={{
                text: errors.config?.collection_size?.message,
                status: errors.config?.collection_size && 'error',
              }}
            />
          </StyledTextFieldWrapper>
        </StyledInput>
      )}

      {max_mint_per_player !== undefined && (
        <StyledInput>
          <Typography
            value='Max assets per player'
            type={Typography.types.P}
            size={Typography.sizes.lg}
            customColor={'#fff'}
          />
          <StyledTextFieldWrapper>
            <TextField
              placeholder='0'
              type='number'
              value={max_mint_per_player}
              onChange={(value: string) =>
                formHook.setValue('config.max_mint_per_player', Number(value), {
                  shouldValidate: true,
                })
              }
              validation={{
                text: errors.config?.max_mint_per_player?.message,
                status: errors.config?.max_mint_per_player && 'error',
              }}
            />
          </StyledTextFieldWrapper>
        </StyledInput>
      )}

      {max_mint_per_transaction !== undefined && (
        <StyledInput>
          <Typography
            value='Max assets per transaction'
            type={Typography.types.P}
            size={Typography.sizes.lg}
            customColor={'#fff'}
          />
          <StyledTextFieldWrapper>
            <TextField
              placeholder='0'
              type='number'
              value={max_mint_per_transaction}
              onChange={(value: string) =>
                formHook.setValue('config.max_mint_per_transaction', Number(value), {
                  shouldValidate: true,
                })
              }
              validation={{
                text: errors.config?.max_mint_per_transaction?.message,
                status: errors.config?.max_mint_per_transaction && 'error',
              }}
            />
          </StyledTextFieldWrapper>
        </StyledInput>
      )}

      {player_mint_fee !== undefined && (
        <StyledInput>
          <Typography
            value='Player mint fee'
            type={Typography.types.P}
            size={Typography.sizes.lg}
            customColor={'#fff'}
          />
          <StyledTextFieldWrapper>
            <TextField
              placeholder='0'
              type='number'
              value={player_mint_fee}
              onChange={(value: string) =>
                formHook.setValue('config.player_mint_fee', Number(value), { shouldValidate: true })
              }
              validation={{
                text: errors.config?.player_mint_fee?.message,
                status: errors.config?.player_mint_fee && 'error',
              }}
            />
          </StyledTextFieldWrapper>
        </StyledInput>
      )}

      <RoyaltyFields formHook={formHook} />
    </StyledInputsWrapper>
  )
}

export default DetailFields

const StyledTextFieldWrapper = styled.div`
  width: 200px;
`

const StyledInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
