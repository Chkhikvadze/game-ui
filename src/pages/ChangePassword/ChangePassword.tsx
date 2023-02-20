import React from 'react'
import { FormikProvider } from 'formik'
import styled from 'styled-components'

import useChangePassword from 'pages/ChangePassword/useChangePassword'

import Button from 'oldComponents/atoms/Button'
import CustomTextField from 'oldComponents/molecules/CustomTextField'

const ChangePassword = () => {
  const { formik } = useChangePassword()

  return (
    <FormikProvider value={formik}>
      <StyledContainer>
        <CustomTextField
          password
          name='currentPassword'
          label='Current Password'
          labelColor={'#fff'}
        />
        <CustomTextField password name='password' label='Password' labelColor={'#fff'} />
        <CustomTextField
          password
          name='confirmPassword'
          label='Confirm Password'
          labelColor={'#fff'}
        />
        {/*<ButtonLink value='Cancel' onClick={props.history.goBack}/>*/}
        <Button onClick={() => formik.handleSubmit()} color='#D7153A'>
          Update Password
        </Button>
      </StyledContainer>
    </FormikProvider>
  )
}

export default ChangePassword

const StyledContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-row-gap: 20px;
  max-width: 25%;
`
