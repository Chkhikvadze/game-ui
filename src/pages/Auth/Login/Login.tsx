import React from 'react'
import TextField from 'oldComponents/molecules/TextField'
import useLogin from 'pages/Auth/Login/useLogin'
import { FormikProvider } from 'formik'
import styled from 'styled-components'
import Typography from 'oldComponents/atoms/Typography'
import Button from 'oldComponents/atoms/Button'
import ButtonLink from 'oldComponents/atoms/ButtonLink'
import { useNavigate } from 'react-router-dom'
import Alert from 'oldComponents/atoms/Alert'
import { useTranslation } from 'react-i18next'


const ErrorResendVerification = ({
  resendVerifyEmail,
  setShowResendAlert,
}: any) => (
  <Alert
	color='danger'
  >
	<p className='mb-0'>
	  Please verify your email, didn’t receive verification email link?
	  <StyledNavLink
		onClick={() => resendVerifyEmail()}
		className='text-secondary d-inline-block'
	  >
		<u> Resend</u>
	  </StyledNavLink>
	</p>
  </Alert>
)

const Login = () => {
  const {formik, alertMessage, showResendAlert, resendVerifyEmailHandle, handleCloseAlert} = useLogin()
  const navigate = useNavigate()
  const {t} = useTranslation()
  
  
  return (
	<StyledContainer>
	  {alertMessage.message && alertMessage.type && (
		<Alert color={alertMessage.type || 'danger'} closeAlert={handleCloseAlert}>
		  {alertMessage.message}
		</Alert>
	  )}
	  
	  {showResendAlert &&
          <ErrorResendVerification resendVerifyEmail={resendVerifyEmailHandle}/>
	  }
	  <Typography variant='h4' color='#4c4c4c'>
		{t('login')}
	  </Typography>
	  <StyledFormContainer>
		<FormikProvider value={formik}>
		  <TextField
			name='loginId'
			placeholder='Email*'
		  />
		  
		  
		  <TextField
			name='password'
			placeholder='Password*'
			password
		  />
		
		</FormikProvider>
		<ButtonContainer>
		  <Button color='primary' onClick={formik.handleSubmit} type='submit'>Submit</Button>
		  <ButtonLink onClick={() => navigate('/forgot-password')} style={{marginLeft:'10px'}}>
			Forgot your password?
		  </ButtonLink>
		
		</ButtonContainer>
		<ButtonContainer>
		  <Typography variant='caption' color='#4c4c4c' style={{size:'12px'}}>
			Don't have an account?
		  </Typography>
		  <ButtonLink onClick={() => navigate('/register')} style={{marginLeft:'10px'}}>
			Create an account?
		  </ButtonLink>
		</ButtonContainer>
	  </StyledFormContainer>
	</StyledContainer>
  )
}

export default Login

const StyledContainer = styled.div`
  padding-top: 40px;
`
const StyledFormContainer = styled.div`
  margin-top: 30px;
  display: grid;
  grid-row-gap: 20px;
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


// const { t , i18n } = useTranslation()

// this function change languages uk and en
// const changeLanguage = (language: string) => {
//   i18n.changeLanguage(language)
// }


// <button onClick={() => changeLanguage('en')}>EN</button>
// <button onClick={() => changeLanguage('uk')}>Uk</button>
