import { useEffect, useState } from 'react'
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
  percentage?: number
}

const getInitialRoyaltyAddresses = (formHook: ContractFormHook) => {
  const constructor_args = formHook.getValues('constructor_args')
  const royaltyAddresses: string[] = constructor_args[2]
  const royaltyPercentages: number[] = constructor_args[3]

  const result = royaltyAddresses?.map((address, index) => {
    return {
      label: shortenAddress(address),
      value: address,
      tagColor: 'white',
      percentage: royaltyPercentages[index],
    }
  })

  return result
}

const RoyaltySplit = ({ formHook }: RoyaltySplitProps) => {
  const { setValue } = formHook

  const [royaltyAddresses, setRoyaltyAddresses] = useState<RoyaltyAddress[]>(
    getInitialRoyaltyAddresses(formHook),
  )
  const [categoryOptions, setCategoryOptions] = useState<RoyaltyAddress[]>([])

  // Update royalty share address and percentages in constructor_args
  useEffect(() => {
    const royaltyAddressList = royaltyAddresses?.map(item => item.value)
    const royaltyPercentageList = royaltyAddresses?.map(item => item.percentage || 0)

    const args = formHook.getValues('constructor_args')
    args[2] = royaltyAddressList
    args[3] = royaltyPercentageList

    formHook.setValue('constructor_args', args)
  }, [royaltyAddresses, formHook])

  const onRoyaltyShareChange = (value: number, index: number) => {
    setRoyaltyAddresses(prev => {
      const result = [...prev]
      result[index].percentage = value
      return result
    })
  }

  const onDropdownChange = (events: RoyaltyAddress[] | null) => {
    setRoyaltyAddresses(events || [])
  }

  const onOptionRemove = (item: RoyaltyAddress) => {
    const newValues = royaltyAddresses?.filter(oldValues => oldValues !== item)
    setRoyaltyAddresses(newValues)
    const filteredNewValues = newValues?.map(option => {
      return option.value
    })
    setValue('constructor_args', [...filteredNewValues])
  }

  const onInputChange = (input: string) => {
    if (input.length) {
      const newOption = {
        value: input,
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
        value={royaltyAddresses}
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

      {royaltyAddresses.length > 0 && (
        <div>
          <Typography
            value='Set royalty share percentage'
            type={Typography.types.P}
            size={Typography.sizes.lg}
            customColor={'#fff'}
          />

          {royaltyAddresses.map((item, index) => (
            <StyledField key={item.value}>
              <Tags label={item.label} readOnly color={Tags.colors.white} />

              <TextField
                type='number'
                placeholder='0'
                value={royaltyAddresses[index].percentage || '0'}
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
