import { FormikProvider } from 'formik'
import TextField from '@l3-lib/ui-core/dist/TextField'

import styled from 'styled-components'
import useContract from 'pages/Contract/useCreateContract'
import Button from '@l3-lib/ui-core/dist/Button'

const CreateContract = () => {
  const { formik } = useContract()

  return (
    <FormikProvider value={formik}>
      <StyledContainer>
        <TextField name={'name'} label={'Name'} />
        <TextField name={'contract_type'} label={'Contract type'} />
        <TextField name={'token_symbol'} label={'Token Symbol'} />
        <TextField name={'blockchains'} label={'Blockchains'} />
        <TextField name={'configuration'} label={'Location'} />
        <TextField name={'note'} label={'Note'} />
        <Button
          onClick={
            () => console.log('click') //eslint-disable-line
          }
        >
          Create contract
        </Button>
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
