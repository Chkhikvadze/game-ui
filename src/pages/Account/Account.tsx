import useAccount from "pages/Account/useAccount"
import { FormikProvider } from "formik"
import CustomTextField from "oldComponents/molecules/CustomTextField"
import styled from "styled-components"


const Account = () => {
  const {formik} = useAccount()
  
  return (
	
    <FormikProvider value={formik}>
	  <StyledContainer>
        <CustomTextField name={'email'} label={'Email'} labelColor={"#fff"} disabled/>
        <CustomTextField name={'first_name'} label={'First name'} labelColor={"#fff"} disabled/>
        <CustomTextField name={'last_name'} label={'Last name'} labelColor={"#fff"} disabled/>
        <CustomTextField name={'organisation_name'} label={'Organisation name'} labelColor={"#fff"} disabled/>
        <CustomTextField name={'location'} label={'Location'} labelColor={"#fff"} disabled/>
	  </StyledContainer>
    </FormikProvider>
  )
}

export default Account


const StyledContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-row-gap: 20px;
  max-width: 25%;
`
