import React from 'react'
import withRenderModal from 'hocs/withRenderModal'
import { FormikProvider } from 'formik'
import styled from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Heading from '@l3-lib/ui-core/dist/Heading'
import useChangePassword from 'pages/ChangePassword/useChangePassword'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Close from '@l3-lib/ui-core/dist/icons/CloseOutline'
import Button from '@l3-lib/ui-core/dist/Button'
// import Button from 'oldComponents/atoms/Button'
import CustomTextField from 'oldComponents/molecules/CustomTextField'
import FullScreenModal from 'components/FullScreenModal'
import { FLexSpaceBetween, StyleHeaderGroup } from 'styles/globalStyle.css'
import TextField from '@l3-lib/ui-core/dist/TextField'
import FormikTextField from 'components/TextFieldFormik/TextFieldFormik'

type CreateChangePasswordModalProps = {
  closeModal: () => void
}

const ChangePassword = ({ closeModal }: CreateChangePasswordModalProps) => {
  const { formik } = useChangePassword()

  return (
    <FullScreenModal>
      <StyleHeaderGroup>
        <StyledCloseButton>
          <IconButton
            onClick={closeModal}
            icon={Close}
            kind={IconButton.kinds.TERTIARY}
            size={IconButton.sizes.LARGE}
          />
        </StyledCloseButton>
      </StyleHeaderGroup>
      <StyledContainerWrapper>
        <StyledContainer1>
          <StyledTextWrapper>
            {/* <Typography
                value='Change password'
                type={Typography.types.HEADING}
                size={Typography.sizes.lg}
                customColor={'#FFFFFF'}
              /> */}
            <Heading
              type={Heading.types.h1}
              size={Heading.sizes.lg}
              value='Change password'
              customColor={'#FFFFFF'}
            />
          </StyledTextWrapper>
          <StyledPasswordDetailsWrapper>
            <StyledPassword>
              <Typography
                value='Password must contain:'
                type={Typography.types.LABEL}
                size={Typography.sizes.lg}
                customColor={'rgba(255, 255, 255, 0.8)'}
              />
            </StyledPassword>
            <StyledPasswordDetails>
              <StyledPasswordRequirementsList>
                <StyledPasswordRequirement>
                  <Typography
                    value='At least 6 characters'
                    type={Typography.types.LABEL}
                    size={Typography.sizes.lg}
                    customColor={'rgba(255, 255, 255, 0.8)'}
                  />
                </StyledPasswordRequirement>
                <StyledPasswordRequirement>
                  <Typography
                    value='At least 1 upper case letter ( A-Z ) '
                    type={Typography.types.LABEL}
                    size={Typography.sizes.lg}
                    customColor={'rgba(255, 255, 255, 0.8)'}
                  />
                </StyledPasswordRequirement>
                <StyledPasswordRequirement>
                  <Typography
                    value='At least 1 lower case letter ( a-z )'
                    type={Typography.types.LABEL}
                    size={Typography.sizes.lg}
                    customColor={'rgba(255, 255, 255, 0.8)'}
                  />
                </StyledPasswordRequirement>
                <StyledPasswordRequirement>
                  <Typography
                    value='At least 1 number ( 0..9 )'
                    type={Typography.types.LABEL}
                    size={Typography.sizes.lg}
                    customColor={'rgba(255, 255, 255, 0.8)'}
                  />
                </StyledPasswordRequirement>
              </StyledPasswordRequirementsList>
            </StyledPasswordDetails>
          </StyledPasswordDetailsWrapper>
        </StyledContainer1>
        <StyledContainer2>
          <FormikProvider value={formik}>
            <StyledContainer>
              <FormikTextField
                field_name='current_password'
                type={Typography.types.LABEL}
                placeholder={'Current password'}
                size={Typography.sizes.lg}
              />

              <FormikTextField
                field_name='new_password'
                type={Typography.types.LABEL}
                placeholder={'Create password'}
                size={Typography.sizes.lg}
              />

              <FormikTextField
                field_name='confirm_password'
                type={Typography.types.LABEL}
                placeholder={'Confirm password'}
                size={Typography.sizes.lg}
              />

              <StyledButtonWrapper>
                <Button
                  onClick={() => formik.handleSubmit()}
                  kind={Button.kinds.PRIMARY}
                  size={Button.sizes.LARGE}
                >
                  <Typography
                    value='Update Password'
                    type={Typography.types.LABEL}
                    size={Typography.sizes.sm}
                    customColor={'rgba(255, 255, 255, 0.8)'}
                  />
                </Button>
              </StyledButtonWrapper>
            </StyledContainer>
          </FormikProvider>
        </StyledContainer2>
      </StyledContainerWrapper>
    </FullScreenModal>
  )
}

export default withRenderModal('create-change-password-modal')(ChangePassword)

const StyledContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-row-gap: 20px;
  // max-width: 25%;
  margin-top: 95px;
  width: 376px;
`
const StyledModalWrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`
const StyledCloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
`
const StyledContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 100px;
  align-items: center;
  justify-content: center;
`
const StyledTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 285px;
  height: 44px;
`
const StyledContainer1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 100%;
  margin: 0 10px;
`
const StyledContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 100%;
  margin: 0 10px;
`
const StyledPasswordDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 32px;
  justify-content: flex-start;
  width: 335px;
  height: 164px;
`
const StyledPassword = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 250px;
  height: auto;
`

const StyledPasswordDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  justify-content: flex-start;
  width: 335px;
  height: auto;
`
const StyledButtonWrapper = styled.div`
  display: flex;
  margin-top: 64px;

  justify-content: center;
  align-items: center;
  width: 375px;
  height: 56px;
`
const StyledPasswordRequirementsList = styled.ul`
  list-style-type: none; /* Remove default bullet styles */
`

const StyledPasswordRequirement = styled.li`
  position: relative;
  padding-left: 20px; /* Add some padding to create space for the marker */

  /* Custom bullet marker styles */
  &:before {
    content: '•'; /* Use a custom symbol as the marker, e.g., a bullet • */
    position: absolute;
    left: 0;
    color: rgba(255, 255, 255, 0.8); /* Change the color to your desired color */
  }
`
