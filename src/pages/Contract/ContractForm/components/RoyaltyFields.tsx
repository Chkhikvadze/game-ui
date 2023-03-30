import Typography from '@l3-lib/ui-core/dist/Typography'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import TextField from '@l3-lib/ui-core/dist/TextField'
import Tags from '@l3-lib/ui-core/dist/Tags'

import CustomBadge from '../../ContractComponents/CustomBadge'
import styled from 'styled-components'
import { ContractFormHook } from '../useContractForm'
import { useEffect, useState } from 'react'

type RoyaltyFieldsProps = {
  formHook: ContractFormHook
  onChange: (key: string, value: unknown) => void
}

const ROYALTY_FEE_OPTIONS = [
  { label: '2%', value: 200 },
  { label: '5% suggested', value: 500 },
  { label: '7%', value: 700 },
]

interface RoyaltyAddress {
  label: string
  value: string
  percentage?: number
}

type OptionRendererProps = {
  label: string
  text: string
}

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
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

const RoyaltyFields = ({ formHook, onChange }: RoyaltyFieldsProps) => {
  const constructor_args = formHook.watch('constructor_args')

  const onRoyaltyFeeChange = (value: number) => {
    const args = formHook.getValues('constructor_args')
    args[2] = value
    onChange('constructor_args', args)
  }

  const { setValue } = formHook

  const [isCustomRoyalty, setIsCustomRoyalty] = useState(false)

  const royaltyFee = constructor_args[2]

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
    console.log(args)
    onChange('constructor_args', args)
  }, [royaltyAddresses, formHook])

  const onRoyaltyShareChange = (value: number, index: number) => {
    setRoyaltyAddresses(prev => {
      const result = [...prev]
      result[index].percentage = value
      return result
    })

    // const args = formHook.getValues('constructor_args')
    // args[1][index] = value
    // onChange('constructor_args', args)
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

  console.log(royaltyAddresses)

  return (
    <StyledInput>
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
              debounceRate={1000}
              value={royaltyFee}
              onChange={(value: string) => onRoyaltyFeeChange(Number(value) * 100)}
            />
          </StyledTextFieldWrapper>
        )}
      </StyledBadgeWrapper>

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
    </StyledInput>
  )
}

export default RoyaltyFields

const StyledTextFieldWrapper = styled.div`
  width: 80px;
`

const StyledBadgeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

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

const StyledRoyaltyPercentageInput = styled.div`
  max-height: 32px;
`
