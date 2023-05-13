import { useState } from 'react'
import styled from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import TextField from '@l3-lib/ui-core/dist/TextField'
import Tags from '@l3-lib/ui-core/dist/Tags'

import { ContractFormHook } from '../../useContractForm'
import RoyaltyOptionRenderer from './RoyaltyOptionRenderer'
import { shortenAddress } from 'utils/format'

type RoyaltySplitProps = {
  formHook: ContractFormHook
}

interface RoyaltyAddress {
  label: string
  value: string
}

const RoyaltySplit = ({ formHook }: RoyaltySplitProps) => {
  const [categoryOptions, setCategoryOptions] = useState<RoyaltyAddress[]>([])
  const { royalty_addresses, royalty_percentages } = formHook.watch('constructor_config')

  const onRoyaltyShareChange = (value: number, index: number) => {
    const percentages = formHook.getValues('constructor_config.royalty_percentages')
    percentages[index] = value
    formHook.setValue('constructor_config.royalty_percentages', percentages)
  }

  const onDropdownChange = (values: RoyaltyAddress[] | null) => {
    values = values || []
    const percentageOfEach = 100 / values.length

    formHook.setValue(
      'constructor_config.royalty_addresses',
      values.map(value => value.value),
    )

    formHook.setValue(
      'constructor_config.royalty_percentages',
      values.map(() => percentageOfEach),
    )
  }

  const onOptionRemove = (item: any) => {
    const newValues = royalty_addresses?.filter(oldValues => oldValues !== item.value)
    const percentageOfEach = 100 / newValues.length

    formHook.setValue(
      'constructor_config.royalty_addresses',
      newValues.map(newValue => newValue),
    )
    formHook.setValue(
      'constructor_config.royalty_percentages',
      newValues.map(() => percentageOfEach),
    )
  }

  const onInputChange = (input: string) => {
    if (input.length) {
      const newOption = {
        value: input.toLowerCase(),
        label: shortenAddress(input).toLowerCase(),
        text: 'Create',
        tagColor: 'white',
      }

      setCategoryOptions([newOption])
    } else {
      setCategoryOptions([])
    }
  }

  return (
    <>
      <Typography
        value='Royalty split'
        type={Typography.types.P}
        size={Typography.sizes.lg}
        customColor={'#fff'}
      />

      <Dropdown
        searchIcon
        placeholder='Add wallet address'
        value={royalty_addresses.map(address => ({
          value: address,
          label: shortenAddress(address),
        }))}
        options={categoryOptions}
        size={Dropdown.size.LARGE}
        multi
        multiLine
        insideOverflowContainer
        onChange={onDropdownChange}
        onOptionRemove={onOptionRemove}
        onInputChange={onInputChange}
        optionRenderer={RoyaltyOptionRenderer}
        onFocus={() => setCategoryOptions([])}
      />

      {royalty_addresses.length > 0 && (
        <div>
          <Typography
            value='Set royalty share percentage'
            type={Typography.types.P}
            size={Typography.sizes.lg}
            customColor={'#fff'}
          />

          {royalty_addresses.map((address, index) => (
            <StyledField key={address}>
              <Tags
                label={shortenAddress(address).toLowerCase()}
                readOnly
                color={Tags.colors.white}
              />

              <TextField
                type='number'
                placeholder='0'
                value={royalty_percentages[index] || '0'}
                onChange={(value: string) => onRoyaltyShareChange(Number(value), index)}
              />
            </StyledField>
          ))}
        </div>
      )}
    </>
  )
}

export default RoyaltySplit

const StyledField = styled.div`
  display: grid;
  grid-template-columns: 125px 150px;
  gap: 32px;
  margin-top: 16px;
  place-items: center;
`
