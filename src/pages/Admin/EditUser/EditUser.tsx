import React from "react"
import {
  StyledContent,
  StyledFormContainer,
  StyledCheckBoxField,
  StyledField,
} from "./EditUserStyle"
import { FormikProvider } from "formik"
import useEditUser from "./useEditUser"

import {
  ORGANISATION_INDUSTRY,
  ORGANISATION_ROLE_OPTIONS,
  ORGANISATION_FLEET_SIZE_OPTIONS,
  FLEET_TRANSITION_STATUS,
} from "utils/constants"
import Loader from "atoms/Loader"
import Typography from "oldComponents/atoms/Typography"
import CustomTextField from "oldComponents/molecules/CustomTextField"
import Button from "oldComponents/atoms/Button"
import CustomSelect from "oldComponents/atoms/CustomSelect"

const EditUser = () => {
  const { formik, loading, countries, isUser } = useEditUser()

  if (loading) return <Loader />

  return (
    <>
      <StyledContent>
        <StyledFormContainer>
          <Typography mb={20} variant="h3">
            Edit User
          </Typography>
          <FormikProvider value={formik}>
            <CustomTextField
              name="first_name"
              placeholder="First name"
              label="First name"
              mandatory
            />
            <CustomTextField
              name="last_name"
              placeholder="Last name"
              label="Last name"
              mandatory
            />
            {isUser && (
              <>
                <CustomTextField
                  name="organisation_name"
                  placeholder="Organisation name"
                  label="Organisation name"
                  mandatory
                />
                <CustomSelect
                  name="organisation_industry"
                  placeholder="Please select"
                  label="Industry"
                  labelColor="#000"
                  options={ORGANISATION_INDUSTRY}
                  mandatory
                />
                <CustomSelect
                  name="organisation_role"
                  placeholder="Please select"
                  label="Role"
                  labelColor="#000"
                  options={ORGANISATION_ROLE_OPTIONS}
                  mandatory
                />
                <CustomSelect
                  name="organisation_fleet_size"
                  placeholder="Please select"
                  label="Fleet size"
                  labelColor="#000"
                  options={ORGANISATION_FLEET_SIZE_OPTIONS}
                  mandatory
                />
                <CustomSelect
                  name="fleet_transition_status"
                  placeholder="Please select"
                  label="Transition status"
                  labelColor="#000"
                  options={FLEET_TRANSITION_STATUS}
                  mandatory
                />
              </>
            )}
            <CustomSelect
              name="location"
              placeholder="Please select"
              label="Location"
              labelColor="#000"
              options={countries}
              mandatory
              isSearchable
            />
            <CustomTextField
              name="contact_number"
              placeholder="Contact number"
              label="Contact number"
              mandatory
            />
            <CustomTextField
              name="email"
              placeholder="Email"
              label="Email"
              mandatory
              disabled
            />
            <StyledCheckBoxField>
              <StyledField type="checkbox" name="enable_2fa" />
              <Typography mt={5} ml={5} variant="label">
                2FA: Active/Disable
              </Typography>
            </StyledCheckBoxField>

            <Button
              color="primary"
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting}
            >
              Update User
            </Button>
          </FormikProvider>
        </StyledFormContainer>
      </StyledContent>
    </>
  )
}

export default EditUser
