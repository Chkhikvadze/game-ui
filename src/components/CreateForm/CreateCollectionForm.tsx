import Heading from '@l3-lib/ui-core/dist/Heading'
import EditableHeading from '@l3-lib/ui-core/dist/EditableHeading'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'

import styled from 'styled-components'

import { useEffect, useState } from 'react'
import { useCollection } from 'pages/Collection/Collections/useCollection'

type CreateCollectionFormProps = {
  closeModal: () => void
  formHook: any
}

const CreateCollectionForm = ({ closeModal, formHook }: CreateCollectionFormProps) => {
  const [startEdit, setStartEdit] = useState(true)

  const { collectionCategories: dataCategories } = useCollection()

  const { watch, setValue } = formHook

  const collectionName = watch('collection_name')

  useEffect(() => {
    formHook.setValue('collection_category', 'Art')
    // formHook.setValue('collection_categories', ['Art'])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [dropdownValue, setDropdownValue] = useState<any>()
  const labeledDataCategories = dataCategories.map((value: string) => {
    return { value: value, label: value }
  })
  const [categoryOptions, setCategoryOptions] = useState<any>(labeledDataCategories)

  const onDropdownChange = (event: any) => {
    if (event === null) {
      setDropdownValue([])
      setValue('collection_categories', [])
    } else {
      setDropdownValue(event)
      const values = event?.map((option: any) => {
        return option.value
      })

      setValue('collection_categories', [...values])
    }
  }

  const onOptionRemove = (item: any) => {
    const newValues = dropdownValue?.filter((oldValues: any) => oldValues !== item)
    setDropdownValue(newValues)
    const filteredNewValues = newValues?.map((option: any) => {
      return option.value
    })
    setValue('collection_categories', [...filteredNewValues])
  }

  const onInputChange = (input: any) => {
    const newOption = { value: input, label: input }
    const newOptions = [...labeledDataCategories, newOption]

    if (labeledDataCategories.some((item: any) => item.value === newOption.value)) {
      return setCategoryOptions(labeledDataCategories)
    }
    setCategoryOptions(newOptions)
  }

  return (
    <StyledFormSection>
      <StyledHeadingWrapper>
        <div>
          <StyledEditableHeading
            editing={startEdit}
            value={collectionName}
            placeholder={`Enter your collection name`}
            onCancelEditing={closeModal}
            type={EditableHeading.types.h1}
            onFinishEditing={(value: string) => {
              if (!value) {
                setValue('collection_name', 'Untitled')
              } else {
                setValue('collection_name', value)
              }
              setStartEdit(false)
            }}
          />
        </div>
      </StyledHeadingWrapper>
      <StyledCategorySection>
        <Heading
          type={Heading.types.h1}
          value='Category'
          size='medium'
          customColor={'rgba(255, 255, 255, 0.4)'}
        />
        <Dropdown
          placeholder='Search or create'
          value={dropdownValue}
          options={categoryOptions}
          multi
          multiline
          onChange={onDropdownChange}
          onOptionRemove={onOptionRemove}
          onInputChange={onInputChange}
        />
      </StyledCategorySection>
    </StyledFormSection>
  )
}

export default CreateCollectionForm

const StyledFormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 55px;
`

const StyledHeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const StyledEditableHeading = styled(EditableHeading)`
  width: fit-content;
  color: rgba(255, 255, 255, 0.6);
`

const StyledCategorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`
