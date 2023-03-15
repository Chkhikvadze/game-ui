import Heading from '@l3-lib/ui-core/dist/Heading'

import EditableHeading from '@l3-lib/ui-core/dist/EditableHeading'

import styled from 'styled-components'

import FormTag from './FormTag'
import { GAME_CATEGORY_OPTIONS } from 'utils/constants'
import { useEffect, useState } from 'react'

type CreateProjectFormProps = {
  closeModal: () => void
  formHook: any
}

const CreateProjectForm = ({ closeModal, formHook }: CreateProjectFormProps) => {
  const [startEdit, setStartEdit] = useState(true)

  const { watch, setValue } = formHook

  const projectName = watch('project_name')
  const projectCategory = watch('project_category')

  useEffect(() => {
    formHook.setValue('project_category', 'Action')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StyledFormSection>
      <StyledHeadingWrapper>
        <div>
          <StyledEditableHeading
            editing={startEdit}
            value={projectName}
            placeholder={`Enter your game name`}
            onCancelEditing={closeModal}
            type={EditableHeading.types.h1}
            onFinishEditing={(value: string) => {
              if (!value) {
                setValue('project_name', 'Untitled')
              } else {
                setValue('project_name', value)
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
            const selected = option.value === projectCategory
            return (
              <FormTag
                key={option.value}
                value={option.value}
                selected={selected}
                isClickable
                onClick={() => setValue('project_category', option.value)}
              />
            )
          })}
        </StyledTagsWrapper>
      </StyledCategorySection>
    </StyledFormSection>
  )
}

export default CreateProjectForm

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
`
