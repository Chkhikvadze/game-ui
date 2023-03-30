import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import TextField from '@l3-lib/ui-core/dist/TextField'
import Tags from '@l3-lib/ui-core/dist/Tags'

import { ContractFormHook } from '../../useContractForm'

type RoyaltySplitProps = {
  formHook: ContractFormHook
}

interface RoyaltyAddress {
  label: string
  value: string
  percentage?: number
}

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

type OptionRendererProps = {
  label: string
  text: string
}

const OptionRenderer = ({ label, text }: OptionRendererProps) => {
  return (
    <StyledNewCategory>
      {text && (
        <Typography
          value={text}
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
          customColor={'#FFF'}
        />
      )}

      <Tags key={label} label={label} readOnly outlined={true} color={Tags.colors.white} />
    </StyledNewCategory>
  )
}

const getInitialRoyaltyAddresses = (formHook: ContractFormHook) => {
  const constructor_args = formHook.getValues('constructor_args')
  const royaltyAddresses: string[] = constructor_args[0]
  const royaltyPercentages: number[] = constructor_args[1]

  const result = royaltyAddresses.map((address, index) => {
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
    const royaltyAddressList = royaltyAddresses.map(item => item.value)
    const royaltyPercentageList = royaltyAddresses.map(item => item.percentage || 0)
    const args = formHook.getValues('constructor_args')
    args[0] = royaltyAddressList
    args[1] = royaltyPercentageList
    // formHook.setValue('constructor_args', args)
    formHook.setValue('constructor_args', args)
  }, [royaltyAddresses, formHook])

  const onRoyaltyShareChange = (value: number, index: number) => {
    setRoyaltyAddresses(prev => {
      const result = [...prev]
      result[index].percentage = value
      return result
    })
  }

  const onDropdownChange = (events: RoyaltyAddress[]) => {
    console.log('onDropdownchange', events)
    const constructor_args = formHook.getValues('constructor_args')

    if (events === null) {
      setRoyaltyAddresses([])
      constructor_args[0] = []
      setValue('constructor_args', constructor_args)
    } else {
      setRoyaltyAddresses(events)
      const values = events?.map(option => {
        return option.value
      })

      constructor_args[0] = [...values]
      setValue('constructor_args', constructor_args)
    }
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

      // const newOptions = [newOption, ...labeledDataCategories]

      // if (labeledDataCategories.some((item: any) => item.value === newOption.value)) {
      //   return setCategoryOptions(labeledDataCategories)
      // }
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
        size={Dropdown.size.SMALL}
        multi
        multiLine
        insideOverflowContainer
        onChange={onDropdownChange}
        onOptionRemove={onOptionRemove}
        onInputChange={onInputChange}
        optionRenderer={OptionRenderer}
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
            <StyledRoyaltyPercentage key={item.value}>
              <Tags label={item.label} readOnly color={Tags.colors.white} />

              <TextField
                placeholder='0'
                debounceRate={1500}
                value={royaltyAddresses[index].percentage || '0'}
                onChange={(value: string) => onRoyaltyShareChange(Number(value), index)}
              />
            </StyledRoyaltyPercentage>
          ))}
        </div>
      )}
    </>
  )
}

export default RoyaltySplit

const StyledNewCategory = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const StyledRoyaltyPercentage = styled.div`
  display: grid;
  grid-template-columns: 125px 150px;
  gap: 32px;
  margin-top: 16px;
`
