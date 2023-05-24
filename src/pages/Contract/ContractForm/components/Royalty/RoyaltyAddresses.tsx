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
  const { royalty_addresses, royalty_percentages, owner_address } =
    formHook.watch('constructor_config')

  const [splitError, setSplitError] = useState(false)

  const onRoyaltyShareChange = (value: number, index: number) => {
    const percentages = formHook.getValues('constructor_config.royalty_percentages')
    percentages[index] = value
    formHook.setValue('constructor_config.royalty_percentages', percentages)
  }

  // const calculateShare = (totalAmount: number, itemCount: number) => {
  //   if (itemCount === 1) {
  //     return [totalAmount]
  //   } else if (itemCount === 2) {
  //     const share = Math.floor((totalAmount / itemCount) * 100) / 100
  //     return [share, share]
  //   } else {
  //     const equalShare = Math.floor(totalAmount / itemCount)
  //     const remainingAmount = totalAmount - equalShare * (itemCount - 1)
  //     const shares = Array(itemCount).fill(equalShare)
  //     shares[itemCount - 1] = Math.floor(remainingAmount * 100) / 100
  //     return shares
  //   }
  // }

  function divideIntoParts(total: number, numParts: number) {
    if (numParts === 0) return []
    const eachPart = parseFloat((total / numParts).toFixed(2))
    const lastPart = parseFloat((total - eachPart * (numParts - 1)).toFixed(2))

    const result = Array(numParts - 1).fill(eachPart)
    result.push(lastPart)

    return result
  }

  const onDropdownChange = (values: RoyaltyAddress[] | null) => {
    values = values || []

    const itemShares = divideIntoParts(100, values?.length)

    const addressRegex = /^0x[a-fA-F0-9]{40}$/

    const validAddresses = values?.map(value => {
      if (addressRegex.test(value.value)) {
        setSplitError(false)
        return value
      } else {
        return setSplitError(true)
      }
    })

    formHook.setValue(
      'constructor_config.royalty_addresses',
      validAddresses?.map((value: any) => value.value),
      { shouldValidate: true },
    )

    formHook.setValue('constructor_config.royalty_percentages', itemShares)
  }

  const onOptionRemove = (item: any) => {
    const newValues = royalty_addresses?.filter(oldValues => oldValues !== item.value)

    const itemShares = divideIntoParts(100, newValues?.length)

    formHook.setValue(
      'constructor_config.royalty_addresses',
      newValues.map(newValue => newValue),
    )
    formHook.setValue('constructor_config.royalty_percentages', itemShares)

    if (splitError) {
      setSplitError(false)
    }
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

      <StyledDropdownWrapper>
        <div style={{ color: '#d83a52', fontSize: '14px', height: '20px' }}>
          {splitError && 'invalid address'}
        </div>

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
          multiline
          insideOverflowContainer
          onChange={onDropdownChange}
          onOptionRemove={onOptionRemove}
          onInputChange={onInputChange}
          optionRenderer={RoyaltyOptionRenderer}
          onFocus={() => setCategoryOptions([])}
        />
      </StyledDropdownWrapper>

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
const StyledDropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`
