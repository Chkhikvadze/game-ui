import styled from 'styled-components'

import Avatar from '@l3-lib/ui-core/dist/Avatar'
import Button from '@l3-lib/ui-core/dist/Button'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import Tags from '@l3-lib/ui-core/dist/Tags'
import TextFieldController from 'components'
import { getIconByText } from 'helpers'
import {
  StyledAvatarGroup,
  StyledDevicesSection,
  StyledFieldGroupContainer,
  StyledHeaderGroup,
  StyledTextFieldGroup,
} from 'pages/Game/EditGame/GeneralForm/GeneralForm'
import { StyledTextHeaderWrapper } from 'pages/Game/EditGame/Appearance/Appearance'
import { useGeneralForm } from './useGeneralForm'
import CollectionWidget from 'pages/Collection/CollectionComponents/CollectionWidget'
import { Avatar_1, Avatar_2, Avatar_3 } from 'assets/avatars'
import { useLocation, useParams } from 'react-router-dom'
import { useEditCollection } from '../useEditCollection'
import {
  useCollectionByIdService,
  useCollectionCategoriesService,
} from 'services/useCollectionService'
import { useEffect, useState } from 'react'

type OptionRendererProps = {
  label: string
  text: string
}

const GeneralForm = () => {
  const { fields, control, onSubmit, watch, handleSubmit } = useGeneralForm()
  const params = useParams()
  const { collection, updateCollectionCategory } = useEditCollection()

  const id: string = collection?.game_id
  const { data: collectionCategories } = useCollectionCategoriesService(id)

  console.log('collection', collection)

  const [dropdownValue, setDropdownValue] = useState<any>([])
  const [categoryOptions, setCategoryOptions] = useState<any>([])
  const [labeledDataCategories, setLabeledDataCategories] = useState<any>([])

  useEffect(() => {
    if (collectionCategories) {
      const labeledDataCategories = collectionCategories
        .map((value: any) => {
          if (typeof value === 'string') {
            return { value, label: value, tagColor: 'white' }
          }
          // If the value is not a string, handle it accordingly or skip it
          return null
        })
        .filter(Boolean) // Remove any null or undefined values from the array
      setLabeledDataCategories(labeledDataCategories)
      setCategoryOptions(labeledDataCategories)
    }
  }, [collectionCategories])

  useEffect(() => {
    if (collection?.categories) {
      const selectedOptions = collection?.categories?.map((category: any) => ({
        value: category.value || category,
        label: category.value || category,
        tagColor: 'white',
      }))
      setDropdownValue(selectedOptions)
    }
  }, [collection])

  const onInputChange = (input: string) => {
    if (input.length) {
      const newOption = {
        value: input,
        label: input,
        text: 'Create',
        tagColor: 'white',
      }

      if (labeledDataCategories.some((item: any) => item.value === newOption.value)) {
        return setCategoryOptions(labeledDataCategories)
      }

      const newOptions = [newOption, ...categoryOptions]
      setCategoryOptions(newOptions)
    } else {
      // Clear the manually entered option from the category options
      const filteredOptions = categoryOptions.filter((option: any) => !option.text)
      setCategoryOptions(filteredOptions)
    }
  }

  const onOptionRemove = (item: any) => {
    const newValues = dropdownValue.filter((oldValues: any) => oldValues.value !== item.value)
    setDropdownValue(newValues)
  }

  const onChangeDropdown = (newValue: any) => {
    // console.log('newValue', newValue)
    setDropdownValue(newValue)
    const selectedCategories = newValue.map((option: any) => ({ value: option.value }))
    updateCollectionCategory(selectedCategories)
    // console.log('selectedCategories', selectedCategories)
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

  return (
    <>
      <div className='key_section'>
        <Heading
          value={'Key insights'}
          type={Heading.types.h1}
          customColor='#FFFFFF'
          size='medium'
        />
        <Typography
          value={'Check the most relevant information with custom widgets, add or remove them.'}
          type={Heading.types.p}
          size={Typography.sizes.lg}
          customColor='rgba(255, 255, 255, 0.6)'
        />
        <div
          style={{ display: 'flex', gap: '16px', marginTop: '24px', justifyContent: 'flex-start' }}
        >
          <StyledWidgetWrapper>
            <CollectionWidget title={'Chain'} value={'123k'} />
            <CollectionWidget title={'Royalty'} value={'5%'} />
            <CollectionWidget size='medium' title={'Contract Type'} value={'ERC-1155'} />
          </StyledWidgetWrapper>
          <StyledWidgetWrapper>
            <CollectionWidget title={'Volume'} value={'123k'} />
            <CollectionWidget title={'Min. Price'} value={'1.23'} />
            <CollectionWidget
              size='medium'
              value={'123k'}
              customTitle={
                <StyledHeaderGroup>
                  <StyledAvatarGroup>
                    <Avatar
                      size={Avatar.sizes.SMALL}
                      src={Avatar_1}
                      type={Avatar.types.IMG}
                      rectangle
                    />
                    <Avatar
                      size={Avatar.sizes.SMALL}
                      src={Avatar_2}
                      type={Avatar.types.IMG}
                      rectangle
                    />
                    <Avatar
                      size={Avatar.sizes.SMALL}
                      src={Avatar_3}
                      type={Avatar.types.IMG}
                      rectangle
                    />
                  </StyledAvatarGroup>
                  <Heading
                    value={'Players'}
                    type={Heading.types.h1}
                    customColor='rgba(255, 255, 255, 0.6)'
                    style={{ fontSize: 24, lineHeight: '32px' }}
                  />
                </StyledHeaderGroup>
              }
            />
          </StyledWidgetWrapper>
          <StyledWidgetWrapper>
            <CollectionWidget size='large' title={'Assets(122)'} value={''} />
          </StyledWidgetWrapper>
        </div>
      </div>

      <StyledDevicesSection>
        <StyledTextWrapper>
          <Heading value={'Category'} type={Heading.types.h1} customColor='#FFFFFF' size='medium' />
        </StyledTextWrapper>
        <Dropdown
          searchIcon
          placeholder='Search or create'
          value={dropdownValue}
          options={categoryOptions}
          multi
          multiline
          onChange={onChangeDropdown}
          onOptionRemove={onOptionRemove}
          onInputChange={onInputChange}
          optionRenderer={OptionRenderer}
          // menuRenderer={MenuRenderer}
          onFocus={() => setCategoryOptions(labeledDataCategories)}
          // menuIsOpen={true}
        />
      </StyledDevicesSection>

      <StyledDevicesSection>
        <StyledTextHeaderWrapper>
          <Heading
            value={'Social links'}
            type={Heading.types.h1}
            customColor='#FFFFFF'
            size='medium'
          />
          <Button kind={Button.kinds.SECONDARY} onClick={handleSubmit(onSubmit)}>
            Add
          </Button>
        </StyledTextHeaderWrapper>
        <Heading />
        <Typography
          value={
            'Add custom social URLs to let your players find and discover specific communities, content and more.'
          }
          type={Heading.types.p}
          size={Typography.sizes.lg}
          customColor='rgba(255, 255, 255, 0.6)'
        />

        <StyledFieldGroupContainer>
          {fields.map((field, index) => {
            const field_value = watch(`socialLinks.${index}.url`)
            return (
              <StyledTextFieldGroup key={field.id}>
                <img src={getIconByText(field_value)} alt='' />
                <TextFieldController field_name={`socialLinks.${index}.url`} control={control} />
              </StyledTextFieldGroup>
            )
          })}
        </StyledFieldGroupContainer>
      </StyledDevicesSection>

      <StyledDevicesSection>
        <Heading
          value={'Other information'}
          type={Heading.types.h1}
          customColor='#FFFFFF'
          size='medium'
        />
        <Heading />
        <Typography
          value={
            'Add custom social URLs to let your players find and discover specific communities, content and more. '
          }
          type={Heading.types.p}
          size={Typography.sizes.lg}
          customColor='rgba(255, 255, 255, 0.6)'
        />

        <StyledOwnersWrapper>
          <Heading
            value={'Creator'}
            type={Heading.types.h1}
            size='medium'
            customColor='rgba(255, 255, 255, 0.8)'
          />
          <StyledCreatorWrapper>
            <Avatar
              size={Avatar.sizes.MEDIUM}
              src={'https://images.wsj.net/im-491405?width=1280&size=1'}
              type={Avatar.types.IMG}
              borderColor='pink'
              rectangle
            />
            <StyledCreatorText>
              <Typography
                value={'John'}
                type={Heading.types.p}
                size={Typography.sizes.lg}
                customColor='#FFF'
              />
              <Typography
                value={'x0912dsawdsdfefdfx'}
                type={Heading.types.p}
                size={Typography.sizes.lg}
                customColor='rgba(255, 255, 255, 0.8)'
              />
            </StyledCreatorText>
          </StyledCreatorWrapper>
        </StyledOwnersWrapper>
        <StyledOwnersWrapper>
          <Heading
            value={'Collaborators'}
            type={Heading.types.h1}
            size='medium'
            customColor='rgba(255, 255, 255, 0.8)'
          />
          <StyledAvatarGroup>
            <Avatar
              size={Avatar.sizes.SMALL}
              src={'https://images.wsj.net/im-491405?width=1280&size=1'}
              type={Avatar.types.IMG}
              borderColor='pink'
              rectangle
            />
            <Avatar
              size={Avatar.sizes.SMALL}
              src={'https://images.wsj.net/im-491405?width=1280&size=1'}
              type={Avatar.types.IMG}
              borderColor='green'
              rectangle
            />
            <Avatar
              size={Avatar.sizes.SMALL}
              src={'https://images.wsj.net/im-491405?width=1280&size=1'}
              type={Avatar.types.IMG}
              borderColor='orange'
              rectangle
            />
            <Avatar
              size={Avatar.sizes.SMALL}
              src={'https://images.wsj.net/im-491405?width=1280&size=1'}
              type={Avatar.types.IMG}
              borderColor='pink'
              rectangle
            />
          </StyledAvatarGroup>
        </StyledOwnersWrapper>
        <StyledOwnersWrapper>
          <Heading
            value={'Created On'}
            type={Heading.types.h1}
            size='medium'
            customColor='rgba(255, 255, 255, 0.8)'
          />
          <Typography
            value={'Jan 2023'}
            type={Heading.types.p}
            size={Typography.sizes.lg}
            customColor='#FFF'
          />
        </StyledOwnersWrapper>
      </StyledDevicesSection>
    </>
  )
}

export default GeneralForm

const StyledWidgetWrapper = styled.div`
  display: flex;
  gap: 16px;
  max-width: 330px;
  flex-wrap: wrap;
`

const StyledOwnersWrapper = styled.div`
  margin-top: 28px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`
const StyledCreatorWrapper = styled.div`
  display: flex;
  gap: 20px;
`
const StyledCreatorText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const StyledTextWrapper = styled.div`
  margin-bottom: 12px;
`
const StyledNewCategory = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
