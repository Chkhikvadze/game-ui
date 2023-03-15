import { FormikProvider, useFormik } from 'formik'
import { useCreateContractService } from 'services/useContractService'
import Button from '@l3-lib/ui-core/dist/Button'
import CustomTextField from 'oldComponents/molecules/CustomTextField'
import styled from 'styled-components'

type CreateContractProps = {
  collectionId: string
}

const CreateContract = ({ collectionId }: CreateContractProps) => {
  const [createContract] = useCreateContractService()

  const initialValues = {
    chain: '',
    name: '',
    contract_type: '',
    note: '',
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: values => {
      console.log(values)
    },
  })

  const handleCreateContract = async () => {
    const contract = await createContract({
      collection_id: collectionId,
      name: 'Weapons',
      template: 'Weapon',
      contract_type: 'ERC1155',
      chain: 'polygon-pos',
      environment: 'testnet',
      note: 'Weapon Collection contract',
    })

    console.log(contract)
  }

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
