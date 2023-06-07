import React from 'react'
import {
  StyledContent,
  StyledFormContainer,
  StyledRole,
  StyledButtonContainer,
} from './CreateUserStyle'
import { FormikProvider } from 'formik'
import useCreateUser from './useCreateUser'

import { COMPANY_ROLE_OPTIONS, COMPANY_SIZE_OPTIONS } from 'utils/constants'
import CustomSelect from 'oldComponents/atoms/CustomSelect'
import TextField from '@l3-lib/ui-core/dist/TextField'

import Button from '@l3-lib/ui-core/dist/Button'

import Loader from '@l3-lib/ui-core/dist/Loader'

// import FormikErrorFocus from 'helpers/FormikErrorFocus'
// import SpinnerLoader from 'bf-ui/dist/SpinnerLoader'

const CreateUser = () => {
  const {
    formik,
    alertMessage,
    countries,
    loading: createUserLoading,
    handleCloseAlert,
  } = useCreateUser()

  const isUser = formik.values.role === 'user'

  return (
    <>
      <StyledContent>
        <StyledFormContainer>
          <span>Create user</span>
          <FormikProvider value={formik}>
            {createUserLoading ? (
              <Loader />
            ) : (
              <>
                <StyledRole>
                  <span>Choose the user role: </span>
                  <CustomSelect
                    name='role'
                    placeholder='Choose a role'
                    options={[
                      { label: 'User', value: 'user' },
                      { label: 'Admin', value: 'admin' },
                    ]}
                  />
                </StyledRole>
                <TextField
                  name='first_name'
                  placeholder='First name'
                  label='First name'
                  // mandatory
                />
                <TextField
                  name='last_name'
                  placeholder='Last name'
                  label='Last name'
                  // mandatory
                  // useField={useField}
                />
                {isUser && (
                  <>
                    <TextField
                      name='company_name'
                      placeholder='Company name'
                      label='Company name'
                      mandatory
                      // useField={useField}
                    />
                    <CustomSelect
                      name='company_role'
                      placeholder='Please select'
                      label='Role'
                      labelColor='#000'
                      options={COMPANY_ROLE_OPTIONS}
                      mandatory
                      // useField={useField}
                    />
                    <CustomSelect
                      name='company_size'
                      placeholder='Please select'
                      label='Company size'
                      labelColor='#000'
                      options={COMPANY_SIZE_OPTIONS}
                      mandatory
                      // useField={useField}
                    />
                  </>
                )}
                <CustomSelect
                  name='location'
                  placeholder='Please select'
                  label='Location'
                  labelColor='#000'
                  options={countries}
                  mandatory
                  isSearchable
                  // useField={useField}
                />
                <TextField
                  name='contact_number'
                  placeholder='Contact number'
                  label='Contact number'
                  mandatory
                  // useField={useField}
                />
                <TextField
                  name='email'
                  placeholder='Email'
                  label='Email'
                  mandatory
                  // useField={useField}
                />
              </>
            )}
          </FormikProvider>
          <StyledButtonContainer>
            <Button onClick={formik.handleSubmit}>Create user</Button>
          </StyledButtonContainer>
        </StyledFormContainer>
      </StyledContent>
    </>
  )
}

export default CreateUser
