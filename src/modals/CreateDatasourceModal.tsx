import { FormikProvider } from 'formik'
import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import ModalFooter from '@l3-lib/ui-core/dist/ModalFooter'
import Loader from '@l3-lib/ui-core/dist/Loader'
import Toast from '@l3-lib/ui-core/dist/Toast'

import { useDatasource } from 'pages/Datasource/useDatasource'
import DatasourceForm from 'pages/Datasource/DatasourceForm'
import { StyledFooterWrapper } from './CreateAgentModal'

const CreateDatasourceModal = () => {
  const { closeDatasourceModal, formik, handleSubmit, isLoading } = useDatasource()

  return (
    <Modal hideCloseButton show title={'Create Datasource'} onClose={closeDatasourceModal}>
      <FormikProvider value={formik}>
        <DatasourceForm formik={formik} isLoading={isLoading} />
      </FormikProvider>

      <ModalFooter className='modalFooter'>
        <StyledFooterWrapper>
          <Button kind={Button.kinds.TERTIARY} onClick={closeDatasourceModal}>
            <Typography
              value='Cancel'
              type={Typography.types.HEADING}
              size={Typography.sizes.md}
              customColor={'color: rgba(255, 255, 255, 0.6)'}
            />
          </Button>
          <Button onClick={() => handleSubmit(formik?.values)} disabled={isLoading}>
            {!isLoading && 'Create Datasource'}
            {isLoading && <Loader size={24} />}
          </Button>
        </StyledFooterWrapper>
      </ModalFooter>
    </Modal>
  )
}

export default withRenderModal('create-datasource-modal')(CreateDatasourceModal)
