import { useEffect, useState } from 'react'

import Heading from '@l3-lib/ui-core/dist/Heading'
import EditableHeading from '@l3-lib/ui-core/dist/EditableHeading'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import Tags from '@l3-lib/ui-core/dist/Tags'
import Typography from '@l3-lib/ui-core/dist/Typography'

import styled from 'styled-components'

import { useCollection } from 'pages/Collection/Collections/useCollection'

type CreateCollectionFormProps = {
  closeModal: () => void
  formHook: any
}

type OptionRendererProps = {
  label: string
  text: string
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
    return { value: value, label: value, tagColor: 'white' }
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
    console.log(item)
    const newValues = dropdownValue?.filter((oldValues: any) => oldValues !== item)
    setDropdownValue(newValues)
    const filteredNewValues = newValues?.map((option: any) => {
      return option.value
    })
    setValue('collection_categories', [...filteredNewValues])
  }

  const onInputChange = (input: string) => {
    if (input.length) {
      const newOption = {
        value: input,
        label: input,
        text: 'Create',
        tagColor: 'white',
      }
      const newOptions = [newOption, ...labeledDataCategories]

      if (labeledDataCategories.some((item: any) => item.value === newOption.value)) {
        return setCategoryOptions(labeledDataCategories)
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

  // const MenuRenderer = (props: any) => {
  //   // console.log('propssss', props)
  //   const childd = React.Children.toArray(props.children).filter((child: any, i) => {
  //     console.log('culdprrrr', child?.props)
  //   })
  //   // console.log('childd', childd)
  //   return (
  //     <div style={{ display: 'flex', flexDirection: 'row' }}>
  //       <div>Created</div>
  //       {React.Children.map(props.children, child => {
  //         // console.log('child', child.props.options)
  //         return <div>{child}</div>
  //       })}
  //     </div>
  //   )
  // }

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
          searchIcon
          placeholder='Search or create'
          value={dropdownValue}
          options={categoryOptions}
          multi
          multiline
          onChange={onDropdownChange}
          onOptionRemove={onOptionRemove}
          onInputChange={onInputChange}
          optionRenderer={OptionRenderer}
          // menuRenderer={MenuRenderer}
          onFocus={() => setCategoryOptions(labeledDataCategories)}
          // menuIsOpen={true}
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
const StyledNewCategory = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
