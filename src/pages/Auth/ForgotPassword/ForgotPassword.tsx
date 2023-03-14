import useForgotPassword from 'pages/Auth/ForgotPassword/useForgotPassword'
import { FormikProvider } from 'formik'
import styled from 'styled-components'
import Button from '@l3-lib/ui-core/dist/Button'

import Alert from 'oldComponents/atoms/Alert'
import Heading from '@l3-lib/ui-core/dist/Heading'
import TextFieldFormik from 'components/TextFieldFormik'
import { StyledCenterFormContainer } from 'styles/globalStyle.css'
import Checkbox from '@l3-lib/ui-core/dist/Checkbox'

const ForgotPassword = () => {
  const { formik, alertMessage, handleCloseAlert } = useForgotPassword()
  return (
    <StyledCenterFormContainer>
      {alertMessage.message && alertMessage.type && (
        <Alert color={alertMessage.type || 'danger'} closeAlert={handleCloseAlert}>
          {alertMessage.message}
        </Alert>
      )}

      <Heading
        value={'Add email'}
        type={Heading.types.h1}
        customColor='rgba(255, 255, 255, 0.4)'
        style={{ fontSize: 52, lineHeight: 'normal' }}
      />
      <StyledFormContainer>
        <FormikProvider value={formik}>
          <TextFieldFormik field_name='email' placeholder='Email*' size='large' />
        </FormikProvider>

        <Button
          style={{ width: 'fit-content', justifySelf: 'center', marginTop: 66 }}
          onClick={() => formik.handleSubmit()}
          size={Button.sizes.LARGE}
        >
          Send
        </Button>
      </StyledFormContainer>
    </StyledCenterFormContainer>
  )
}

export default ForgotPassword

const StyledFormContainer = styled.div`
  margin-top: 64px;
  display: grid;
  grid-row-gap: 16px;
  padding: 0 87px;
  width: 550px;
  max-width: 550px;
`

const StyledNavLink = styled.a`
  color: #19b3ff;
  cursor: pointer;
`

const StyledColumnContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 9px;
  padding-left: 9px;
`
