import { useEffect, useState } from 'react'
// import { AvatarIcon } from '@radix-ui/react-icons'
// import { StyledUploadLogo } from 'modals/CreateProjectModal'
// import CustomTextField from 'oldComponents/molecules/CustomTextField/CustomTextField'
import { game_category_options } from 'utils/constants'

import Button from '@l3-lib/ui-core/dist/Button'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Heading from '@l3-lib/ui-core/dist/Heading'
import EditableHeading from '@l3-lib/ui-core/dist/EditableHeading'
import Tags from '@l3-lib/ui-core/dist/Tags'
import Toast from '@l3-lib/ui-core/dist/Toast'

import PlayOutline from '@l3-lib/ui-core/dist/icons/PlayOutline'
import Close from '@l3-lib/ui-core/dist/icons/Close'

// import TextFieldFormik from 'components/TextFieldFormik'
// import DropDownFormik from 'components/DropDownFormik'
import styled from 'styled-components'

import actionImg from './assets/action.svg'
import racingImg from './assets/racing.svg'
import adventureImg from './assets/adventure.svg'

type CreateProjectFormType = {
  formik: any
  handleChangeFile: any
  onDeleteImg: any
  fileUploadType: any
  closeModal?: any
  toast?: any
  setToast?: any
  formHook?: any
  handleSubmit?: any
}

const CreateProjectForm = ({
  // formik,
  // handleChangeFile,
  // onDeleteImg,
  // fileUploadType,
  toast,
  setToast,
  closeModal,
  formHook,
  handleSubmit,
}: CreateProjectFormType) => {
  // const {
  //   // logo_image,
  //   project_name,
  //   project_category,
  // } = formik?.values

  const [startEdit, setStartEdit] = useState(true)
  const [backgroundImg, setBackgroundImg] = useState('')
  const [finish, setFinish] = useState(false)

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
    if (toast.open === true) {
      setFinish(true)
    }
  }, [toast.open])

  useEffect(() => {
    setValue('project_category', 'Action')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
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
            {/* {!finish && (
              <div>
                <Heading
                  type={Heading.types.h1}
                  value={"Game's name"}
                  customColor={'rgba(255, 255, 255, 0.6)'}
                />
              </div>
            )} */}
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
                  onFinishEditing={(value: any) => {
                    if (value === '') {
                      // formik.setFieldValue('project_name', 'Untitled')
                      setValue('project_name', 'Untitled')
                    } else {
                      // formik.setFieldValue('project_name', value)
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
                ? game_category_options
                    .filter((option: any) => option.value === projectCategory)
                    .map((option: any) => (
                      <Tags
                        key={option.value}
                        label={option.value}
                        readOnly
                        isClickable={false}
                        outlined={option.value === projectCategory ? false : true}
                        color={Tags.colors.white}
                        leftIcon={Close}
                      />
                    ))
                : game_category_options.map((option: any) => (
                    <Tags
                      key={option.value}
                      label={option.value}
                      readOnly
                      isClickable
                      outlined={option.value === projectCategory ? false : true}
                      color={
                        option.value === projectCategory
                          ? Tags.colors.white
                          : 'rgba(255, 255, 255, 0.2)'
                      }
                      onClick={() => {
                        setValue('project_category', option.value)
                      }}
                      leftIcon={Close}
                    />
                  ))}
            </StyledTagsWrapper>
          </StyledCategorySection>
          {finish && (
            <StyledToast
              label={toast.message}
              type={toast.type}
              autoHideDuration={4000}
              open={toast.open}
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
  )
}

export default CreateProjectForm

const StyledForm = styled.form`
  position: relative;
  display: flex;

  /* border: 2px red solid; */
  justify-content: flex-end;

  height: 100%;

  /* min-height: 600px;
  min-width: 1000px; */
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

const StyledToast = styled(Toast)`
  position: static;
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
