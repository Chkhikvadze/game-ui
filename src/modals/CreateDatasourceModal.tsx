import { FormikProvider } from 'formik'
import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Loader from '@l3-lib/ui-core/dist/Loader'

import BgWrapper from './components/BgWrapper'

import styled from 'styled-components'
import { useDatasource } from 'pages/Datasource/useDatasource'
import {
  StyledFormBody,
  StyledFormContainer,
  StyledFormFooter,
  StyledFormHeader,
  StyledInputWrapper,
  StyledSubmitButtonWrapper,
} from 'pages/Agents/AgentForm/AgentForm'
import FormikTextField from 'components/TextFieldFormik'

const CreateDatasourceModal = () => {
  const { closeDatasourceModal, formik, handleSubmit, isLoading } = useDatasource()

  return (
    <Modal fullscreen show isClean backgroundColor='dark' onClose={closeDatasourceModal}>
      <BgWrapper>
        <FormikProvider value={formik}>
          <StyledButtonWrapper>
            <Button kind={Button.kinds.TERTIARY} onClick={closeDatasourceModal}>
              <Typography
                value='Close'
                type={Typography.types.HEADING}
                size={Typography.sizes.xss}
                customColor={'color: rgba(255, 255, 255, 0.6)'}
              />
            </Button>
          </StyledButtonWrapper>
          <StyledDatasourceForm>
            <StyledFormContainer>
              <StyledFormHeader>
                <Typography
                  value={'Create Datasource'}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.lg}
                  customColor={'#FFF'}
                />
              </StyledFormHeader>
              <StyledFormBody>
                <StyledInputWrapper>
                  <FormikTextField name='datasource_name' placeholder='name' label='Name' />
                  <FormikTextField
                    name='datasource_description'
                    placeholder='description'
                    label='Description'
                  />
                  <FormikTextField
                    name='datasource_source_type'
                    placeholder='source_type'
                    label='Source Type'
                  />
                </StyledInputWrapper>
              </StyledFormBody>

              <StyledFormFooter>
                <StyledSubmitButtonWrapper>
                  <Button onClick={() => handleSubmit(formik?.values)} disabled={isLoading}>
                    {!isLoading && ' Create Datasource'}
                    {isLoading && <Loader size={24} />}
                  </Button>
                </StyledSubmitButtonWrapper>
              </StyledFormFooter>
            </StyledFormContainer>
          </StyledDatasourceForm>
        </FormikProvider>
      </BgWrapper>
    </Modal>
  )
}

export default withRenderModal('create-datasource-modal')(CreateDatasourceModal)

export const StyledButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;

  padding: 20px;

  /* z-index: 1; */
`
const StyledDatasourceForm = styled.div`
  width: 100vw;
  height: 100vh;

  padding: 50px 0;

  display: flex;
  justify-content: center;
`
