import { FormikProvider } from 'formik'
import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'

import Toast from '@l3-lib/ui-core/dist/Toast'

import BgWrapper from './components/BgWrapper'

import styled from 'styled-components'
import { useDatasource } from 'pages/Datasource/useDatasource'
import DatasourceForm from 'pages/Datasource/DatasourceForm'
import { useEditDatasource } from 'pages/Datasource/useEditDatasource'

type EditDatasourceModalProps = {
  data: {
    closeModal: () => void
    datasource: any
  }
}

const EditDatasourceModal = ({ data }: EditDatasourceModalProps) => {
  const { formik, closeEditDatasourceModal, handleSubmit, toast, setToast, isLoading } =
    useEditDatasource(data.datasource)

  return (
    <Modal fullscreen show isClean backgroundColor='dark' onClose={closeEditDatasourceModal}>
      <BgWrapper>
        <FormikProvider value={formik}>
          <StyledButtonWrapper>
            <Button kind={Button.kinds.TERTIARY} onClick={closeEditDatasourceModal}>
              <Typography
                value='Close'
                type={Typography.types.HEADING}
                size={Typography.sizes.xss}
                customColor={'color: rgba(255, 255, 255, 0.6)'}
              />
            </Button>
          </StyledButtonWrapper>

          <DatasourceForm
            isEdit
            formik={formik}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </FormikProvider>
        <Toast
          label={toast?.message}
          type={toast?.type}
          autoHideDuration={2500}
          open={toast?.open}
          onClose={() => setToast({ open: false })}
        />
      </BgWrapper>
    </Modal>
  )
}

export default withRenderModal('edit-datasource-modal')(EditDatasourceModal)

export const StyledButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;

  padding: 20px;

  /* z-index: 1; */
`
