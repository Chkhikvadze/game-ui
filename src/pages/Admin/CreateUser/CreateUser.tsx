import React from "react"
import {
  StyledContainer,
  StyledContent,
  StyledFormContainer,
  StyledRole,
  StyledButtonContainer,
} from "./CreateUserStyle"
import { FormikProvider, useField } from "formik"
import useCreateUser from "./useCreateUser"

import {
  ORGANISATION_INDUSTRY,
  ORGANISATION_ROLE_OPTIONS,
  ORGANISATION_FLEET_SIZE_OPTIONS,
  FLEET_TRANSITION_STATUS,
} from "utils/constants"
import Alert from "oldComponents/atoms/Alert"
import Typography from "oldComponents/atoms/Typography"
import Loader from "oldComponents/atoms/OldComponents/Loader"
import CustomSelect from "oldComponents/atoms/CustomSelect"
import CustomTextField from "oldComponents/molecules/CustomTextField"
import Button from "oldComponents/atoms/Button"
import FormikErrorFocus from "oldHelpers/FormikErrorFocus"

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

  const isUser = formik.values.role === "user"

  return (
    <StyledContainer>
      <StyledContent>
        {alertMessage.message && alertMessage.type && (
          <Alert
            color={alertMessage.type || "danger"}
            closeAlert={handleCloseAlert}
          >
            {alertMessage.message}
          </Alert>
        )}
        <StyledFormContainer>
          <Typography variant="h4" color="#4c4c4c">
            Create user
          </Typography>
          <FormikProvider value={formik}>
            {createUserLoading ? (
              <Loader />
            ) : (
              <>
                <StyledRole>
                  <Typography variant="label">
                    Choose the user role:{" "}
                  </Typography>
                  <CustomSelect
                    name="role"
                    placeholder="Choose a role"
                    options={[
                      { label: "User", value: "user" },
                      { label: "Admin", value: "admin" },
                    ]}
                  />
                </StyledRole>
                <CustomTextField
                  name="first_name"
                  placeholder="First name"
                  label="First name"
                  // mandatory
                />
                <CustomTextField
                  name="last_name"
                  placeholder="Last name"
                  label="Last name"
                  // mandatory
                  // useField={useField}
                />
                {isUser && (
                  <>
                    <CustomTextField
                      name="organisation_name"
                      placeholder="Organisation name"
                      label="Organisation name"
                      mandatory
                      // useField={useField}
                    />
                    <CustomSelect
                      name="organisation_industry"
                      placeholder="Industry"
                      labelColor="#000"
                      options={ORGANISATION_INDUSTRY}
                      mandatory
                      // useField={useField}
                    />
                    <CustomSelect
                      name="organisation_role"
                      placeholder="Please select"
                      label="Role"
                      labelColor="#000"
                      options={ORGANISATION_ROLE_OPTIONS}
                      mandatory
                      // useField={useField}
                    />
                    <CustomSelect
                      name="organisation_fleet_size"
                      placeholder="Please select"
                      label="Fleet size"
                      labelColor="#000"
                      options={ORGANISATION_FLEET_SIZE_OPTIONS}
                      mandatory
                      // useField={useField}
                    />
                    <CustomSelect
                      name="fleet_transition_status"
                      placeholder="Please select"
                      label="Transition status"
                      labelColor="#000"
                      options={FLEET_TRANSITION_STATUS}
                      mandatory
                      // useField={useField}
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
                  // useField={useField}
                />
                <CustomTextField
                  name="contact_number"
                  placeholder="Contact number"
                  label="Contact number"
                  mandatory
                  // useField={useField}
                />
                <CustomTextField
                  name="email"
                  placeholder="Email"
                  label="Email"
                  mandatory
                  // useField={useField}
                />

                <FormikErrorFocus />
              </>
            )}
          </FormikProvider>
          <StyledButtonContainer>
            <Button color="primary" onClick={formik.handleSubmit}>
              Create user
            </Button>
          </StyledButtonContainer>
        </StyledFormContainer>
      </StyledContent>
    </StyledContainer>
  )
}

export default CreateUser
