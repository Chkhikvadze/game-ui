import { FormikProvider } from 'formik'
import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Loader from '@l3-lib/ui-core/dist/Loader'
import ModalFooter from '@l3-lib/ui-core/dist/ModalFooter'
import Toast from '@l3-lib/ui-core/dist/Toast'

import DatasourceForm from 'pages/Datasource/DatasourceForm'
import { useEditDatasource } from 'pages/Datasource/useEditDatasource'
import { StyledFooterWrapper } from './CreateAgentModal'

type EditDatasourceModalProps = {
  data: {
    closeModal: () => void
    datasource: any
  }
}

const EditDatasourceModal = ({ data }: EditDatasourceModalProps) => {
  const { formik, closeEditDatasourceModal, handleSubmit, isLoading } = useEditDatasource(
    data.datasource,
  )

  return (
    <Modal hideCloseButton show title={'Edit Datasource'} onClose={closeEditDatasourceModal}>
      <FormikProvider value={formik}>
        <DatasourceForm formik={formik} isLoading={isLoading} />

        <ModalFooter className='modalFooter'>
          <StyledFooterWrapper>
            <Button kind={Button.kinds.TERTIARY} onClick={closeEditDatasourceModal}>
              <Typography
                value='Cancel'
                type={Typography.types.HEADING}
                size={Typography.sizes.md}
                customColor={'color: rgba(255, 255, 255, 0.6)'}
              />
            </Button>
            <Button onClick={() => handleSubmit(formik?.values)} disabled={isLoading}>
              {!isLoading && 'Update'}
              {isLoading && <Loader size={24} />}
            </Button>
          </StyledFooterWrapper>
        </ModalFooter>
      </FormikProvider>
    </Modal>
  )
}

export default withRenderModal('edit-datasource-modal')(EditDatasourceModal)
