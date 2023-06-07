import React from 'react'
import {
  StyledContent,
  StyledFormContainer,
  StyledCheckBoxField,
  StyledField,
} from './EditUserStyle'
import { FormikProvider } from 'formik'
import useEditUser from './useEditUser'

import { COMPANY_ROLE_OPTIONS, COMPANY_SIZE_OPTIONS } from 'utils/constants'
import Loader from 'atoms/Loader'

import TextField from '@l3-lib/ui-core/dist/TextField'

import Button from '@l3-lib/ui-core/dist/Button'

import CustomSelect from 'oldComponents/atoms/CustomSelect'

const EditUser = () => {
  const { formik, loading, countries, isUser } = useEditUser()

  if (loading) return <Loader />

  return (
    <>
      <StyledContent>
        <StyledFormContainer>
          <span>Edit User</span>
          <FormikProvider value={formik}>
            <TextField name='first_name' placeholder='First name' label='First name' />
            <TextField name='last_name' placeholder='Last name' label='Last name' />
            {isUser && (
              <>
                <TextField name='company_name' placeholder='Company name' label='Company name' />

                <CustomSelect
                  name='company_role'
                  placeholder='Please select'
                  label='Role'
                  labelColor='#000'
                  options={COMPANY_ROLE_OPTIONS}
                  mandatory
                />
                <CustomSelect
                  name='company_size'
                  placeholder='Please select'
                  label='Company size'
                  labelColor='#000'
                  options={COMPANY_SIZE_OPTIONS}
                  mandatory
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
            />
            <TextField name='contact_number' placeholder='Contact number' label='Contact number' />
            <TextField name='email' placeholder='Email' label='Email' disabled />
            <StyledCheckBoxField>
              <StyledField type='checkbox' name='enable_2fa' />
              <span>2FA: Active/Disable</span>
            </StyledCheckBoxField>

            <Button onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
              Update User
            </Button>
          </FormikProvider>
        </StyledFormContainer>
      </StyledContent>
    </>
  )
}

export default EditUser
