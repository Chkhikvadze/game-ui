import useEditPlayer from './useEditPlayer'

import PlayerForm from '../PlayerForm'
import { FormikProvider } from 'formik'

import Button from 'oldComponents/atoms/Button'
import { StyledFormSection } from 'modals/modalStyle'
import { TextField } from '@mui/material'
import Typography from 'oldComponents/atoms/Typography'
import styled from 'styled-components'

const EditPlayer = () => {
  const {
    formik,
    handleChangeFile,
    onDeleteImg,
    fileUploadType,
    walletByPlayer,
    addPLayerWallet,
    transactionsByPlayer,
  } = useEditPlayer()

  return (
    <FormikProvider value={formik}>
      <StyledWrapper>
        <StyledFormSection>
          <PlayerForm
            formik={formik}
            handleChangeFile={handleChangeFile}
            onDeleteImg={onDeleteImg}
            fileUploadType={fileUploadType}
            walletByPlayer={walletByPlayer}
            addPLayerWallet={addPLayerWallet}
            isEdit={true}
          />
          <Button color="primary" onClick={formik.handleSubmit}>
            Save
          </Button>
        </StyledFormSection>
        <StyledContent>
          <Typography variant="h1">Tranasactions</Typography>
          {transactionsByPlayer?.items?.map((item: any, index: any) => (
            <TextField value={`${item.id}`} label={`Transaction ${index + 1}`} disabled />
          ))}
        </StyledContent>
      </StyledWrapper>
    </FormikProvider>
  )
}
export default EditPlayer

const StyledWrapper = styled.div`
  display: flex;
  /* justify-content: space-between; */
  gap: 500px;
`

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`
