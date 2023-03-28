import Typography from '@l3-lib/ui-core/dist/Typography'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import TextField from '@l3-lib/ui-core/dist/TextField'

import CustomBadge from '../../ContractComponents/CustomBadge'
import styled from 'styled-components'

type DetailFieldsProps = {
  onChange: (key: string, value: unknown) => void
}

const DetailFields = ({ onChange }: DetailFieldsProps) => {
  return (
    <StyledInputsWrapper>
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
            debounceRate={500}
            onChange={(value: string) => onChange('config.max_mint_per_player', Number(value))}
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
            debounceRate={500}
            onChange={(value: string) => onChange('config.max_mint_per_transaction', Number(value))}
          />
        </StyledTextFieldWrapper>
      </StyledInput>
      <StyledInput>
        <Typography
          value='Royalties'
          type={Typography.types.P}
          size={Typography.sizes.lg}
          customColor={'#fff'}
        />
        <StyledBadgeWrapper>
          <CustomBadge value={'2%'} />
          <CustomBadge value={'5% suggested'} selected />
          <CustomBadge value={'7%'} />
          <CustomBadge value={'Custom'} />
        </StyledBadgeWrapper>

        <Typography
          value='Royalty split'
          type={Typography.types.P}
          size={Typography.sizes.lg}
          customColor={'#fff'}
        />

        <Dropdown placeholder='Select or Add new wallet' size={Dropdown.size.SMALL} />
      </StyledInput>
    </StyledInputsWrapper>
  )
}

export default DetailFields

const StyledBadgeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

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
