import { FormikProvider, useField } from "formik"
import { CustomTable } from "oldComponents/atoms/CustomTable"
import Typography from "oldComponents/atoms/Typography"
import styled from "styled-components"
import {
  StyledButton,
  StyledInputContainer,
  StyledTextField,
} from "./teamsStyle"
import useTeams from "./useTeams"

const Teams = () => {
  const { formik, assignedUserList, config, disabled } = useTeams()

  return (
    <StyledContainer>
      <h1 style={{ color: "white", textAlign: "center" }}>Teams</h1>

      <FormikProvider value={formik}>
        <StyledInputContainer>
          <StyledTextField
            name="shared_email"
            placeholder="Enter email"
            label="Enter email address to share account access"
            mandatory
            useField={useField}
          />
          <StyledButton
            color="primary"
            onClick={formik.handleSubmit}
            disabled={!disabled}
          >
            Share
          </StyledButton>
        </StyledInputContainer>

        <Typography variant="h4" mt={50} mb={10} weight={600}>
          Shared list
        </Typography>

        <CustomTable
          templateColumns="1fr"
          size="14px"
          displayHeader
          columnsConfig={config}
          data={assignedUserList}
          alignItems="end"
          rowDifferentColors
          tableWidth="700px"
        />
      </FormikProvider>
    </StyledContainer>
  )
}

export default Teams

const StyledContainer = styled.div`
  /* display: grid;
  align-items: center;
  justify-items: center;
  height: 100%; */
`