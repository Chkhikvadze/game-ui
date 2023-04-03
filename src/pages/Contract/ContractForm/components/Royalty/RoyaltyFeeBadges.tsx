import { useState } from 'react'
import styled from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'
import TextField from '@l3-lib/ui-core/dist/TextField'
import CustomBadge from '../../../ContractComponents/CustomBadge'
import { ContractFormHook } from '../../useContractForm'

type RoyaltyFeeBadgesProps = {
  formHook: ContractFormHook
}

const ROYALTY_FEE_OPTIONS = [
  { label: '2%', value: 200 },
  { label: '5% suggested', value: 500 },
  { label: '7%', value: 700 },
]

const ROYALTY_FEE_VALUES = ROYALTY_FEE_OPTIONS.map(({ value }) => value)

const RoyaltyFeeBadges = ({ formHook }: RoyaltyFeeBadgesProps) => {
  const constructor_args = formHook.getValues('constructor_args')
  const royaltyFee = constructor_args[2]

  const [isCustomRoyalty, setIsCustomRoyalty] = useState(!ROYALTY_FEE_VALUES.includes(royaltyFee))

  const onRoyaltyFeeChange = (value: number) => {
    const args = formHook.getValues('constructor_args')
    args[2] = value
    formHook.setValue('constructor_args', args)
  }

  return (
    <>
      <Typography
        value='Royalties'
        type={Typography.types.P}
        size={Typography.sizes.lg}
        customColor={'#fff'}
      />

      <StyledBadgeWrapper>
        {ROYALTY_FEE_OPTIONS.map(({ label, value }) => (
          <CustomBadge
            key={value}
            onClick={() => {
              onRoyaltyFeeChange(value)
              setIsCustomRoyalty(false)
            }}
            label={label}
            selected={royaltyFee === value}
          />
        ))}

        <CustomBadge
          onClick={() => {
            setIsCustomRoyalty(true)
            onRoyaltyFeeChange(0)
          }}
          label='Custom'
          selected={isCustomRoyalty}
        />

        {isCustomRoyalty && (
          <StyledTextFieldWrapper>
            <TextField
              placeholder='0'
              value={royaltyFee / 100}
              onChange={(value: string) => onRoyaltyFeeChange(Number(value) * 100)}
            />
          </StyledTextFieldWrapper>
        )}
      </StyledBadgeWrapper>
    </>
  )
}

export default RoyaltyFeeBadges

const StyledTextFieldWrapper = styled.div`
  width: 80px;
`

const StyledBadgeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`