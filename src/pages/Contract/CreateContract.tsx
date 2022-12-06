import { FormikProvider } from "formik"
import CustomTextField from "oldComponents/molecules/CustomTextField"
import styled from "styled-components"
import useContract from "pages/Contract/useCreateContract"
import Button from "oldComponents/atoms/Button"


const CreateContract = () => {
  const {formik} = useContract()
  
  return (
	
    <FormikProvider value={formik}>
	  <StyledContainer>
        <CustomTextField name={'name'} label={'Name'} labelColor={"#fff"}/>
        <CustomTextField name={'contract_type'} label={'Contract type'} labelColor={"#fff"}/>
        <CustomTextField name={'token_symbol'} label={'Organisation name'} labelColor={"#fff"}/>
        <CustomTextField name={'blockchains'} label={'Blockchains'} labelColor={"#fff"}/>
        <CustomTextField name={'configuration'} label={'Location'} labelColor={"#fff"}/>
        <CustomTextField name={'note'} label={'Note'} labelColor={"#fff"}/>
        <Button color={'primary'} onClick={() =>  console.log('click') //eslint-disable-line
        }>Create contract</Button>
	  </StyledContainer>
	
    </FormikProvider>
  )
}

export default CreateContract


const StyledContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-row-gap: 20px;
  max-width: 25%;
`
