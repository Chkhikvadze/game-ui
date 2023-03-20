import { FormikProvider } from 'formik'
import Button from '@l3-lib/ui-core/dist/Button'
import CustomTextField from 'oldComponents/molecules/CustomTextField'
import styled from 'styled-components'
import useCreateContract from './useCreateContract'

type CreateContractProps = {
  collectionId: string
  refetch: () => void
}

const CreateContract = ({ collectionId, refetch }: CreateContractProps) => {
  const { formik, handleCreateContract } = useCreateContract({ collectionId, refetch })

  return (
    <FormikProvider value={formik}>
      <StyledContainer>
        <CustomTextField name={'chain'} label={'Chain'} labelColor={'#fff'} />
        <CustomTextField name={'name'} label={'Name'} labelColor={'#fff'} />
        <CustomTextField name={'contract_type'} label={'Contract type'} labelColor={'#fff'} />
        {/* <CustomTextField name={'token_symbol'} label={'Organisation name'} labelColor={'#fff'} /> */}
        {/* <CustomTextField name={'configuration'} label={'Location'} labelColor={'#fff'} /> */}
        <CustomTextField name={'note'} label={'Note'} labelColor={'#fff'} />

        <Button onClick={handleCreateContract} kind={Button.kinds.PRIMARY}>
          Create Contract
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
