import { FormikProvider } from 'formik'

import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Slider from '@l3-lib/ui-core/dist/Slider'

import Close from '@l3-lib/ui-core/dist/icons/Close'

import BgWrapper from './components/BgWrapper'

import styled from 'styled-components'

import FormikTextField from 'components/TextFieldFormik'

import { useAgents } from 'pages/Agents/useAgents'

const CreateAgentModal = () => {
  const { formik, handleSubmit, closeCreateAgentModal } = useAgents()

  console.log('formik', formik)
  return (
    <Modal fullscreen show isClean backgroundColor='dark' onClose={closeCreateAgentModal}>
      <BgWrapper>
        <FormikProvider value={formik}>
          <StyledIconButtonWrapper>
            <IconButton
              onClick={closeCreateAgentModal}
              icon={() => <Close />}
              kind={IconButton.kinds.TERTIARY}
              size={IconButton.sizes.LARGE}
            />
          </StyledIconButtonWrapper>
          <StyledAgentForm>
            <StyledFormContainer>
              <StyledFormHeader>
                <Typography
                  value='Create New Agent'
                  type={Typography.types.LABEL}
                  size={Typography.sizes.lg}
                  customColor={'#FFF'}
                />
              </StyledFormHeader>
              <StyledFormBody>
                <StyledInputWrapper>
                  <FormikTextField name='agent_name' placeholder='Name' label='Name' />

                  <FormikTextField name='agent_role' placeholder='Role' label='Role' />

                  <FormikTextField
                    name='agent_description'
                    placeholder='Description'
                    label='Description'
                  />

                  <StyledSliderWrapper>
                    <StyledSliderHeader>
                      <Typography
                        value='Temperature'
                        type={Typography.types.LABEL}
                        size={Typography.sizes.md}
                        customColor={'#FFF'}
                      />
                      {formik?.values.agent_temperature ? formik?.values.agent_temperature : 0}/{1}
                    </StyledSliderHeader>
                    <Slider
                      className='slider'
                      color={Slider.colors.POSITIVE}
                      defaultValue={0}
                      min={0}
                      max={10}
                      onChange={(value: number) =>
                        formik?.setFieldValue('agent_temperature', value / 10)
                      }
                    />
                  </StyledSliderWrapper>
                </StyledInputWrapper>
              </StyledFormBody>

              <StyledFormFooter>
                <Button onClick={() => handleSubmit(formik?.values)}>Create Agent</Button>
              </StyledFormFooter>
            </StyledFormContainer>
          </StyledAgentForm>
        </FormikProvider>
      </BgWrapper>
    </Modal>
  )
}

export default withRenderModal('create-agent-modal')(CreateAgentModal)

const StyledAgentForm = styled.div`
  width: 100vw;
  height: 100vh;

  padding: 50px 0;

  display: flex;
  justify-content: center;
`
const StyledIconButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;

  padding: 20px;

  /* z-index: 1; */
`

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
  width: 100%;
  /* min-width: 400px; */
`
const StyledFormHeader = styled.div`
  width: 100%;
  max-width: 600px;
  margin: auto;
`
const StyledFormBody = styled.div`
  width: 100%;
  height: 100%;

  margin: 50px 0px;

  overflow: scroll;
`
const StyledFormFooter = styled.div`
  width: 100%;
  max-width: 600px;
  margin: auto;
`
const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 35px;
  width: 100%;
  max-width: 600px;
  margin: auto;
`
const StyledSliderWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
`
const StyledSliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #fff;
`
