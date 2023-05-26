import useAccount from 'pages/Account/useAccount'
import { FormikProvider } from 'formik'
import CustomTextField from 'oldComponents/molecules/CustomTextField'
import FormikTextField from 'components/TextFieldFormik/TextFieldFormik'
import TextField from '@l3-lib/ui-core/dist/TextField'
import styled from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Button from '@l3-lib/ui-core/dist/Button'
import MenuButton from '@l3-lib/ui-core/dist/MenuButton'
import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'
import { FLexSpaceBetween, StyleHeaderGroup } from 'styles/globalStyle.css'
import profile from '../../assets/images/large.png'
import LogOut from '@l3-lib/ui-core/dist/icons/LogOut'
import { useNavigate } from 'react-router-dom'
import { logout as logOutCookies } from 'helpers/authHelper'
import { useLogoutService } from 'services'
import ChangePassword from 'pages/ChangePassword'
import { useState } from 'react'
import useChangePassword from 'pages/ChangePassword/useChangePassword'

const Account = () => {
  const { formik } = useAccount()
  const navigate = useNavigate()
  const [logout] = useLogoutService()
  const { openCreateChangePasswordModal } = useChangePassword()

  const handleLogout = async () => {
    try {
      await logout()
      logOutCookies()
      localStorage.clear()
      window.location.href = '/'
    } catch (err) {
      logOutCookies()
      localStorage.clear()
      window.location.href = '/'
    }
  }

  return (
    <>
      <StyleHeaderGroup>
        <StyledTextHeaderWrapper>
          <Heading type={Heading.types.h1} size={Heading.sizes.lg} value='My Profile' />
        </StyledTextHeaderWrapper>
        <StyledButtonsContainer>
          <StyledChangePasswordButton
            onClick={openCreateChangePasswordModal}
            kind={Button.kinds.PRIMARY}
            size={Button.sizes.SMALL}
          >
            <Typography
              value='Change password'
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
              customColor={'#FFFFFF'}
            />
          </StyledChangePasswordButton>
          {/* <MenuButton component={MenuDots}>
            <StyledButtonsWrapper>
              <StyledClickableDiv></StyledClickableDiv>
            </StyledButtonsWrapper>
          </MenuButton> */}
        </StyledButtonsContainer>
      </StyleHeaderGroup>
      <StyledContainerWrapper>
        <StyledImageWrapper>
          <img src={profile} alt='profile' />
        </StyledImageWrapper>
        <StyledContainer>
          {/* <StyledTextWrapper>
            <Typography
              value={`${formik.values.company_name}`}
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
              customColor={'rgba(255, 255, 255, 0.6)'}
            />
          </StyledTextWrapper> */}
          {/* <StyledTextWrapper>
            <Typography
              value='Jan 22, 2021'
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
              customColor={'#FFFFFF'}
            />
          </StyledTextWrapper> */}
        </StyledContainer>
        <FormikProvider value={formik}>
          <StyledFormContainer>
            <StyledCustomTextField>
              <StyledTypographyWrapper>
                <Typography
                  value='Full Name'
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                  customColor={'rgba(255, 255, 255, 0.6)'}
                />
              </StyledTypographyWrapper>
              <TextField
                name='first_name'
                value={`${formik.values.first_name} ${formik.values.last_name}`}
                placeholder={'value'}
                size={TextField.sizes.SMALL}
              />
            </StyledCustomTextField>
            <StyledCustomTextField>
              <StyledTypographyWrapper>
                <Typography
                  value='Company name'
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                  customColor={'rgba(255, 255, 255, 0.6)'}
                />
              </StyledTypographyWrapper>
              <TextField
                name='company_name'
                value={`${formik.values.company_name}`}
                placeholder={'value'}
                size={TextField.sizes.SMALL}
              />
            </StyledCustomTextField>

            <StyledCustomTextField>
              <StyledTypographyWrapper>
                <Typography
                  value='Email'
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                  customColor={'rgba(255, 255, 255, 0.6)'}
                />
              </StyledTypographyWrapper>
              <TextField
                name='email'
                value={`${formik.values.email}`}
                placeholder={'value'}
                size={TextField.sizes.SMALL}
              />
            </StyledCustomTextField>

            <StyledButton>
              <Button
                onClick={handleLogout}
                leftIcon={LogOut}
                kind={Button.kinds.TERTIARY}
                size={Button.sizes.SMALL}
              >
                <Typography
                  value='Log out'
                  type={Typography.types.LABEL}
                  size={Typography.sizes.sm}
                  customColor={'rgba(255, 255, 255, 0.8)'}
                />
              </Button>
            </StyledButton>
          </StyledFormContainer>
        </FormikProvider>
      </StyledContainerWrapper>
      <ChangePassword />
    </>
  )
}

export default Account

const StyledContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  // width: 1440px;
  // height: 900px;
  // margin-left: 100px;
  justify-content: center;
`

const StyledImageWrapper = styled.div`
  width: 206px;
  height: 184px;
`

const StyledFormContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-row-gap: 20px;
  // max-width: 25%;
  width: fit-content;
  height: 100%;
`

const StyledTextHeaderWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  color: #ffffff;
  width: 180px;
  height: 40px;
  flex: 1;
`
const StyledChangePasswordButton = styled(Button)`
  padding: 10px 26px;
`

const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`

const StyledButtonsWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  background: rgba(0, 0, 0, 0.2);
  padding: 16px;
  box-shadow: 2px 6px 15px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(50px);
  border-radius: 6px;
`

const StyledClickableDiv = styled.div`
  cursor: pointer;
`
const StyledCustomTextField = styled.div`
  display: grid;
  margin-top: 12px;
  margin-bottom: 26px;
  gap: 12px;
  width: 375px;
  height: 44px;
`
const StyledTypographyWrapper = styled.div`
  display: flex;
  height: 20px;
  width: fit-content;
  align-items: center;
`
const StyledContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: Center;
  width: 200px;
  height: 100px;
`
const StyledTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100px;
  height: 20px;
  align-items: center;
`
const StyledButton = styled.div`
  display: flex;
  align-items: center;
  margin-top: 44.5px;
  justify-content: center;
  width: 375px;
  height: 40px;
`
