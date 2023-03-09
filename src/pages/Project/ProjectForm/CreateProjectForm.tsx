import { useEffect, useState } from 'react'
// import { AvatarIcon } from '@radix-ui/react-icons'
// import { StyledUploadLogo } from 'modals/CreateProjectModal'
// import CustomTextField from 'oldComponents/molecules/CustomTextField/CustomTextField'
import { GAME_CATEGORY_OPTIONS } from 'utils/constants'

import Button from '@l3-lib/ui-core/dist/Button'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Heading from '@l3-lib/ui-core/dist/Heading'
import EditableHeading from '@l3-lib/ui-core/dist/EditableHeading'
import Tags from '@l3-lib/ui-core/dist/Tags'
import Toast from '@l3-lib/ui-core/dist/Toast'
import LinearProgressBar from '@l3-lib/ui-core/dist/LinearProgressBar'

import PlayOutline from '@l3-lib/ui-core/dist/icons/PlayOutline'
import Close from '@l3-lib/ui-core/dist/icons/Close'

// import TextFieldFormik from 'components/TextFieldFormik'
// import DropDownFormik from 'components/DropDownFormik'
import styled from 'styled-components'

import actionImg from './assets/action.svg'
import racingImg from './assets/racing.svg'
import adventureImg from './assets/adventure.svg'
import { ToastProps } from 'hooks/useToast'

type CreateProjectFormType = {
  closeModal?: () => void
  toast?: ToastProps
  setToast: (props: ToastProps) => void
  formHook?: any
  handleSubmit?: any
}

const CreateProjectForm = ({
  toast,
  setToast,
  closeModal,
  formHook,
  handleSubmit,
}: CreateProjectFormType) => {
  const [startEdit, setStartEdit] = useState(true)
  const [backgroundImg, setBackgroundImg] = useState('')
  const [finish, setFinish] = useState(false)

  let interval: any
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (running) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      interval = setInterval(() => {
        setProgress(prev => prev + 1)
      }, 40)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [running])

  useEffect(() => {
    if (progress === 100) {
      setRunning(false)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress])

  const { setValue, watch } = formHook
  const projectName = watch('project_name')
  const projectCategory = watch('project_category')

  useEffect(() => {
    if (projectCategory === 'Action') {
      setBackgroundImg(actionImg)
    } else if (projectCategory === 'Adventure') {
      setBackgroundImg(adventureImg)
    } else if (projectCategory === 'Racing') {
      setBackgroundImg(racingImg)
    } else {
      setBackgroundImg('')
    }
  }, [projectCategory])

  useEffect(() => {
    if (toast?.open) {
      setFinish(true)
      setRunning(!running)
    }
  }, [toast?.open])

  useEffect(() => {
    setValue('project_category', 'Action')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderTagsComponent = (option?: any, isClickable?: boolean, notSelected?: boolean) => (
    <Tags
      key={option.value}
      label={option.value}
      readOnly
      isClickable={isClickable}
      outlined={option.value !== projectCategory}
      onClick={() => {
        setValue('project_category', option.value)
      }}
      color={notSelected ? 'rgba(255, 255, 255, 0.2)' : Tags.colors.white}
      leftIcon={Close}
    />
  )

  return (
    <StyledRoot>
      <StyledProgressBar value={progress} size={LinearProgressBar.sizes.LARGE} />

      <StyledForm onSubmit={formHook.handleSubmit((data: any) => handleSubmit(data))}>
        <StyledIconButtonWrapper>
          <IconButton
            onClick={closeModal}
            icon={Close}
            kind={IconButton.kinds.TERTIARY}
            size={IconButton.sizes.LARGE}
          />
        </StyledIconButtonWrapper>

        <StyledContainer>
          <StyledFormSection finish={finish}>
            <StyledHeadingWrapper>
              <div>
                {finish ? (
                  <StyledResponseContent>
                    <Heading
                      type={Heading.types.h1}
                      value='Game unlocked'
                      size='medium'
                      customColor={'rgba(255, 255, 255, 0.4)'}
                    />
                    <StyledResponseHeading
                      type={Heading.types.h1}
                      value={projectName}
                      customColor={'#fff'}
                    />
                  </StyledResponseContent>
                ) : (
                  <StyledEditableHeading
                    editing={startEdit}
                    value={projectName}
                    placeholder='Enter your game name'
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
                )}
              </div>
            </StyledHeadingWrapper>

            <StyledCategorySection>
              {!finish && (
                <Heading
                  type={Heading.types.h1}
                  value='Category'
                  size='medium'
                  customColor={'rgba(255, 255, 255, 0.4)'}
                />
              )}
              <StyledTagsWrapper>
                {finish
                  ? GAME_CATEGORY_OPTIONS.filter(
                      (option: any) => option.value === projectCategory,
                    ).map((option: any) => renderTagsComponent(option, false, false))
                  : GAME_CATEGORY_OPTIONS.map((option: any) => {
                      const notSelected = option.value !== projectCategory
                      return renderTagsComponent(option, true, notSelected)
                    })}
              </StyledTagsWrapper>
            </StyledCategorySection>
            {finish && (
              <StyledToast
                label={toast?.message}
                type={toast?.type}
                autoHideDuration={4000}
                open={toast?.open}
                onClose={() => setToast({ open: false })}
              />
            )}
          </StyledFormSection>
          {!finish && (
            <StyledButtonWrapper>
              <Button type='submit' leftIcon={PlayOutline} size={Button.sizes.LARGE}>
                Start
              </Button>
            </StyledButtonWrapper>
          )}
        </StyledContainer>

        <StyledImageDiv image={backgroundImg} />
      </StyledForm>
    </StyledRoot>
  )
}

export default CreateProjectForm

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`

const StyledForm = styled.form`
  position: relative;
  display: flex;

  /* border: 2px red solid; */
  justify-content: flex-end;

  height: 100%;

  /* min-height: 600px;
  min-width: 1000px; */
`
const StyledProgressBar = styled(LinearProgressBar)`
  /* width: 100vw; */
  /* position: absolute; */
`

const StyledIconButtonWrapper = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;

  padding: 20px;

  z-index: 1;
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 30px;

  padding: 64px;

  height: 100%;
  width: 100%;
`

const StyledImageDiv = styled.div<{ image: string }>`
  height: 100%;
  width: 100%;

  background-image: ${p => p.image && `url(${p.image})`};
  background-repeat: no-repeat;
  background-size: cover;

  mix-blend-mode: lighten;

  z-index: 0;
`

const StyledFormSection = styled.div<{ finish?: boolean }>`
  margin-top: auto;

  display: flex;
  flex-direction: column;
  gap: 55px;

  position: ${p => p.finish && 'absolute'};
  margin-left: ${p => p.finish && 'auto'};
  margin-right: ${p => p.finish && 'auto'};
  left: ${p => p.finish && '0'};
  right: ${p => p.finish && '0'};
  /* justify-content: ${p => p.finish && 'center'}; */
  align-items: ${p => p.finish && 'center'};
`

const StyledToast = styled(Toast)``

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

const StyledButtonWrapper = styled.div`
  margin-top: auto;
`
const StyledResponseContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 28px;
`

const StyledResponseHeading = styled(Heading)`
  font-size: 90px;
  line-height: 120px;
`
