import useEditPlayer from './useEditPlayer'

import PlayerForm from '../PlayerForm'
import { FormikProvider } from 'formik'

import Button from 'oldComponents/atoms/Button'
import { StyledFormSection } from 'modals/modalStyle'
// import { TextField } from '@mui/material'
import Typography from 'oldComponents/atoms/Typography'
import styled from 'styled-components'
import { CustomTable } from 'oldComponents/atoms/CustomTable'
import columnConfig from './columnConfig'

const config = columnConfig()

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
          {/* {transactionsByPlayer?.items?.map((item: any, index: any) => (
            <TextField value={`${item.id}`} label={`Transaction ${index + 1}`} disabled />
          ))} */}
          <CustomTable
            templateColumns="1fr repeat(1, 1fr)  repeat(1,1fr)"
            size="14px"
            displayHeader
            columnsConfig={config}
            data={transactionsByPlayer?.items || []}
            alignItems="end"
            rowDifferentColors
          />
        </StyledContent>
      </StyledWrapper>
    </FormikProvider>
  )
}
export default EditPlayer

const StyledWrapper = styled.div`
  display: flex;
  /* justify-content: space-between; */
  gap: 200px;
`

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`
