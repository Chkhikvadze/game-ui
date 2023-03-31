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

  return (
    <StyledInputsWrapper>
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
            value={collection_size}
            onChange={(value: string) => formHook.setValue('config.collection_size', Number(value))}
          />
        </StyledTextFieldWrapper>
      </StyledInput>

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
            value={max_mint_per_player}
            onChange={(value: string) =>
              formHook.setValue('config.max_mint_per_player', Number(value))
            }
          />
        </StyledTextFieldWrapper>
      </StyledInput>

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
            value={max_mint_per_transaction}
            onChange={(value: string) =>
              formHook.setValue('config.max_mint_per_transaction', Number(value))
            }
          />
        </StyledTextFieldWrapper>
      </StyledInput>

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
            value={player_mint_fee}
            onChange={(value: string) => formHook.setValue('config.player_mint_fee', Number(value))}
          />
        </StyledTextFieldWrapper>
      </StyledInput>

      <RoyaltyFields formHook={formHook} />
    </StyledInputsWrapper>
  )
}

export default DetailFields

const StyledTextFieldWrapper = styled.div`
  width: 80px;
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
