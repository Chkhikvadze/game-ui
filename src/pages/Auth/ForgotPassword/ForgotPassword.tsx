import React from 'react'
import TextField from 'oldComponents/molecules/TextField'
import useForgotPassword from 'pages/Auth/ForgotPassword/useForgotPassword'
import { FormikProvider } from 'formik'
import styled from 'styled-components'
import Typography from 'oldComponents/atoms/Typography'
import Button from 'oldComponents/atoms/Button'
import Alert from 'oldComponents/atoms/Alert'

const ForgotPassword = () => {
  const { formik, alertMessage, handleCloseAlert } = useForgotPassword()
  return (
    <StyledContainer>
      {alertMessage.message && alertMessage.type && (
        <Alert color={alertMessage.type || 'danger'} closeAlert={handleCloseAlert}>
          {alertMessage.message}
        </Alert>
      )}
      <Typography variant='h4' color='#4c4c4c'>
        Forgot password
      </Typography>
      <br />
      <Typography variant='caption' color='#4c4c4c' style={{ size: '12px' }}>
        Forgot your password? Type in your email address in the form below to reset your password.
      </Typography>
      <StyledFormContainer>
        <FormikProvider value={formik}>
          <TextField name='email' placeholder='Email*' />
        </FormikProvider>
        <ButtonContainer>
          <Button color='primary' onClick={formik.handleSubmit}>
            Submit
          </Button>
        </ButtonContainer>
      </StyledFormContainer>
    </StyledContainer>
  )
}

export default ForgotPassword

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
