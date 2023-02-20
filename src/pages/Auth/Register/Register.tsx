import React from 'react'
import { FormikProvider } from 'formik'
import styled from 'styled-components'

import FormikErrorFocus from 'oldHelpers/FormikErrorFocus'
import useRegister from 'pages/Auth/Register/useRegister'
import {
  FLEET_TRANSITION_STATUS,
  ORGANISATION_FLEET_SIZE_OPTIONS,
  ORGANISATION_INDUSTRY,
  ORGANISATION_ROLE_OPTIONS,
} from 'utils/constants'

import CustomTextField from 'oldComponents/molecules/CustomTextField'

import CheckboxField from 'oldComponents/atoms/CheckboxField'
import Typography from 'oldComponents/atoms/Typography'
import Button from 'oldComponents/atoms/Button'
import Alert from 'oldComponents/atoms/Alert'
import CustomSelect from 'oldComponents/atoms/CustomSelect'

const Register = () => {
  const { formik, alertMessage, countries } = useRegister()

  return (
    <StyledContainer>
      {alertMessage.message && alertMessage.type && (
        <Alert color={alertMessage.type || 'danger'}>{alertMessage.message}</Alert>
      )}
      <Typography variant='h4' color='#4c4c4c'>
        Register
      </Typography>
      <StyledFormContainer>
        <FormikProvider value={formik}>
          <CustomTextField
            name='first_name'
            placeholder='First name'
            label='First name'
            mandatory
          />
          <CustomTextField name='last_name' placeholder='Last name' label='Last name' mandatory />
          <CustomTextField
            name='organisation_name'
            placeholder='Organisation name'
            label='Organisation name'
            mandatory
          />
          <CustomSelect
            name='organisation_industry'
            placeholder='Please select'
            label='Industry'
            labelColor='#000'
            options={ORGANISATION_INDUSTRY}
            mandatory
          />
          <CustomSelect
            name='organisation_role'
            placeholder='Please select'
            label='Role'
            labelColor='#000'
            options={ORGANISATION_ROLE_OPTIONS}
            mandatory
          />
          <CustomSelect
            name='organisation_fleet_size'
            placeholder='Please select'
            label='Fleet size'
            labelColor='#000'
            options={ORGANISATION_FLEET_SIZE_OPTIONS}
            mandatory
          />
          <CustomSelect
            name='fleet_transition_status'
            placeholder='Please select'
            label='Transition status'
            labelColor='#000'
            options={FLEET_TRANSITION_STATUS}
            mandatory
          />
          <CustomSelect
            name='location'
            placeholder='Please select'
            label='Location'
            labelColor='#000'
            options={countries}
            mandatory
            isSearchable
          />
          <CustomTextField
            name='contact'
            placeholder='Contact number'
            label='Contact number'
            mandatory
          />
          <CustomTextField name='email' placeholder='Email' label='Email' mandatory />
          <CustomTextField
            name='password'
            placeholder='Password'
            label='Password'
            password
            mandatory
          />
          <CustomTextField
            name='confirm_password'
            placeholder='Confirm password'
            label='Confirm password'
            password
            mandatory
          />
          <CheckboxField
            name='industry_update'
            value='fringe_benefit_tax'
            label='Please click here if you do not want to receive the latest industry updates and resources'
          />
          <FormikErrorFocus />
        </FormikProvider>
        <ButtonContainer>
          <Button color='primary' onClick={formik.handleSubmit}>
            Register
          </Button>
        </ButtonContainer>
      </StyledFormContainer>
    </StyledContainer>
  )
}

export default Register

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
`
