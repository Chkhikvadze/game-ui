import { FormikProvider } from 'formik'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Alert from 'oldComponents/atoms/Alert'

import useLogin from 'pages/Auth/Login/useLogin'
import TextFieldFormik from 'components/TextFieldFormik'
import { StyledCenterFormContainer } from 'styles/globalStyle.css'

import Checkbox from '@l3-lib/ui-core/dist/Checkbox'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'

import './login.css'

const ErrorResendVerification = ({ resendVerifyEmail }: any) => (
  <Alert color='danger'>
    <p className='mb-0'>
      Please verify your email, didn’t receive verification email link?
      <StyledNavLink onClick={() => resendVerifyEmail()} className='text-secondary d-inline-block'>
        <u> Resend</u>
      </StyledNavLink>
    </p>
  </Alert>
)

const Login = () => {
  const { formik, alertMessage, showResendAlert, resendVerifyEmailHandle, handleCloseAlert } =
    useLogin()
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <StyledCenterFormContainer>
      {alertMessage.message && alertMessage.type && (
        <Alert color={alertMessage.type || 'danger'} closeAlert={handleCloseAlert}>
          {alertMessage.message}
        </Alert>
      )}

      {showResendAlert && <ErrorResendVerification resendVerifyEmail={resendVerifyEmailHandle} />}

      <StyledDisplay>Complete your mission</StyledDisplay>

      <StyledFormContainer>
        <FormikProvider value={formik}>
          <TextFieldFormik field_name='email' placeholder='Email*' size='large' />
          <TextFieldFormik
            field_name='password'
            placeholder='Password*'
            type='password'
            size='large'
          />
        </FormikProvider>
        <StyledColumnContainer>
          <Checkbox
            size='small'
            kind='secondary'
            label='You will keep this between us 😉'
            labelClassName='checkbox_label'
          />
        </StyledColumnContainer>

        <Typography
          value='Forget password?'
          type={Typography.types.label}
          size={Typography.sizes.lg}
          as={'a'}
          customColor='#FFFFFF'
          style={{
            textDecorationLine: 'underline',
            cursor: 'pointer',
            textAlign: 'center',
            textUnderlineOffset: 5,
            marginTop: 18,
          }}
        />

        <Button
          style={{ width: 'fit-content', justifySelf: 'center', marginTop: 66 }}
          onClick={() => formik.handleSubmit()}
        >
          Start
        </Button>
      </StyledFormContainer>
    </StyledCenterFormContainer>
  )
}

export default Login

const StyledFormContainer = styled.div`
  margin-top: 64px;
  display: grid;
  grid-row-gap: 16px;
  padding: 0 87px;
`
const ButtonContainer = styled.div`
  align-self: flex-start;
  display: flex;
  align-items: center;
`
const StyledNavLink = styled.a`
  color: #19b3ff;
  cursor: pointer;
`

const StyledDisplay = styled.h1`
  font-weight: 500;
  font-size: 52px;
  line-height: 64px;
  color: rgba(255, 255, 255, 0.4);
`

const StyledColumnContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 9px;
  padding-left: 9px;
`
