import Heading from '@l3-lib/ui-core/dist/Heading'

import EditableHeading from '@l3-lib/ui-core/dist/EditableHeading'

import styled from 'styled-components'

import FormTag from './FormTag'
import { GAME_CATEGORY_OPTIONS } from 'utils/constants'
import { useEffect, useState } from 'react'

type CreateGameFormProps = {
  closeModal: () => void
  formHook: any
}

const CreateGameForm = ({ closeModal, formHook }: CreateGameFormProps) => {
  const [startEdit, setStartEdit] = useState(true)

  const { watch, setValue } = formHook

  const gameName = watch('game_name')
  const gameCategory = watch('game_category')

  useEffect(() => {
    formHook.setValue('game_category', 'Action')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StyledFormSection>
      <StyledHeadingWrapper>
        <div>
          <StyledEditableHeading
            editing={startEdit}
            value={gameName}
            placeholder={`Enter your game name`}
            onCancelEditing={closeModal}
            type={EditableHeading.types.h1}
            onFinishEditing={(value: string) => {
              if (!value) {
                setValue('game_name', 'Untitled')
              } else {
                setValue('game_name', value)
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

        <StyledTagsWrapper>
          {GAME_CATEGORY_OPTIONS.map((option: any) => {
            const selected = option.value === gameCategory
            return (
              <FormTag
                key={option.value}
                value={option.value}
                selected={selected}
                isClickable
                onClick={() => setValue('game_category', option.value)}
              />
            )
          })}
        </StyledTagsWrapper>
      </StyledCategorySection>
    </StyledFormSection>
  )
}

export default CreateGameForm

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

const StyledTagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  overflow-y: scroll;
  max-height: 150px;
  ::-webkit-scrollbar {
    display: none;
  }
`
