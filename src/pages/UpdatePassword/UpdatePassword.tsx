import React from "react"
// import TextField from 'bf-ui/dist/TextField'
import { FormikProvider } from "formik"
import styled from "styled-components"
// import Typography from 'bf-ui/dist/Typography'
// import Button from 'bf-ui/dist/Button'
import useUpdatePassword from "./useUpdatePassword"
import Typography from "oldComponents/atoms/Typography"
import CustomTextField from "oldComponents/molecules/CustomTextField"
import Button from "oldComponents/atoms/Button"

const UpdatePassword = () => {
  const { formik } = useUpdatePassword()

  return (
    <StyledContainer>
      <Typography variant="h4" color="#4c4c4c">
        Update password
      </Typography>
      <br />
      <StyledFormContainer>
        <FormikProvider value={formik}>
          <CustomTextField
            name="password"
            placeholder="New password*"
            password
          />

          <CustomTextField
            name="confirm_password"
            placeholder="Confirm password*"
            password
          />
        </FormikProvider>
        <ButtonContainer>
          <Button color="primary" onClick={formik.handleSubmit}>
            Submit
          </Button>
        </ButtonContainer>
      </StyledFormContainer>
    </StyledContainer>
  )
}

export default UpdatePassword

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
