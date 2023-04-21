import { useEffect, useRef, useState } from 'react'

import Heading from '@l3-lib/ui-core/dist/Heading'
import EditableHeading from '@l3-lib/ui-core/dist/EditableHeading'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import Tags from '@l3-lib/ui-core/dist/Tags'
import Typography from '@l3-lib/ui-core/dist/Typography'

import styled from 'styled-components'

import FormikTextField from 'components/TextFieldFormik'

import info from '../../../assets/images/info.png'
import TextareaFormik from 'components/TextareaFormik'
import useCreateApiKey from './useCreateApiKey'

type CreateApiKeysFormProps = {
  closeModal: () => void
  formHook: any
}

type OptionRendererProps = {
  label: string
  text: string
}

const CreateApiKeysForm = ({ closeModal, formHook }: CreateApiKeysFormProps) => {
  const [startEdit, setStartEdit] = useState(true)

  const { gamesOptions } = useCreateApiKey()

  const { watch, setValue } = formHook

  const [dropdownValue, setDropdownValue] = useState<any>()
  const [categoryOptions, setCategoryOptions] = useState<any>(gamesOptions)

  const onDropdownChange = (event: any) => {
    if (event === null) {
      setDropdownValue([])
      setValue('apiKeys_categories', [])
    } else {
      setDropdownValue(event)
      const values = event?.map((option: any) => {
        return option.value
        console.log(values)
      })
      setValue('apiKeys_categories', [...values])
    }
  }
  const onOptionRemove = (item: any) => {
    const newValues = dropdownValue?.filter((oldValues: any) => oldValues !== item)
    setDropdownValue(newValues)
    const filteredNewValues = newValues?.map((option: any) => {
      return option.value
    })
    setValue('apiKeys_categories', [...filteredNewValues])
  }

  const onInputChange = (input: string) => {
    if (input.length) {
      const newOption = {
        value: input,
        label: input,
        text: 'Create',
        tagColor: 'white',
      }
      const newOptions = [newOption, ...gamesOptions]

      if (gamesOptions.some((item: any) => item.value === newOption.value)) {
        return setCategoryOptions(gamesOptions)
      }
      setCategoryOptions(newOptions)
    }
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

  type Option = {
    label: string
    value: number | string
  }

  return (
    <StyledCreateModalForm>
      <StyledNameTextWrapper>
        <Typography value='Name' type={Typography.types.LABEL} size={Typography.sizes.lg} />
      </StyledNameTextWrapper>
      <FormikTextField field_name='name' type={Typography.types.LABEL} size={Typography.sizes.md} />
      <StyledTextFieldDate>
        <StyledExpirationTextWrapper>
          <Typography value='Expiration' type={Typography.types.LABEL} size={Typography.sizes.lg} />
        </StyledExpirationTextWrapper>
        <FormikTextField type='date' field_name='expiration' />
      </StyledTextFieldDate>

      <StyledTextWrapper>
        <Typography value='Choose games' type={Typography.types.LABEL} size={Typography.sizes.lg} />
        <StyledImgWrapper>
          <img src={info} alt='info' />
        </StyledImgWrapper>
      </StyledTextWrapper>
      {/* <Dropdown placeholder='Select' options={gamesOptions || []} multi multiLine /> */}
      <Dropdown
        placeholder='Select'
        value={dropdownValue}
        multi
        multiline
        onChange={onDropdownChange}
        onOptionRemove={onOptionRemove}
        options={gamesOptions || []}
        optionRenderer={OptionRenderer}
      />
      <StyledTextWrapper>
        <Typography value='Note' type={Typography.types.LABEL} size={Typography.sizes.lg} />
      </StyledTextWrapper>
      <StyledTextAreaWrapper>
        <TextareaFormik
          color='#FFFFFF'
          field_name='note'
          placeholder='An optional description of what this webhook endpoint is used for.'
        />
      </StyledTextAreaWrapper>
    </StyledCreateModalForm>
  )
}
export default CreateApiKeysForm

export const StyledActionsContainer = styled.div`
  display: flex;
  position: relative;
  justify-items: flex-end;
  gap: 42px;
`

export const StyledCreateModalForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 24px;
  width: 100%;
  height: 100%;
  color: rgba(255, 255, 255, 0.8);
`
export const StyledTextFieldDate = styled.div`
  width: 199px;
  margin-top: 24px;
  color: rgba(255, 255, 255, 0.8);
`
export const StyledTextWrapper = styled.div`
  width: 296px;
  height: 24px;
  margin-top: 24px;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.8);
`
export const StyledImgWrapper = styled.div`
  margin-top: -20px;
  margin-left: 130px;
`

export const StyledNameTextWrapper = styled.div`
  width: 296px;
  height: 24px;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.8);
`
export const StyledExpirationTextWrapper = styled.div`
  width: 296px;
  height: 24px;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.8);
`

export const StyledTextAreaWrapper = styled.div`
  height: 130px;
`
export const StyledModalHeading = styled(Heading)`
  font-size: 24px !important;
  line-height: 32px !important;
  font-weight: 500 !important;
`

export const StyledLabelTypography = styled(Typography)`
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
`
const StyledNewCategory = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
