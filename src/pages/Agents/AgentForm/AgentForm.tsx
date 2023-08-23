import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Slider from '@l3-lib/ui-core/dist/Slider'
import Textarea from '@l3-lib/ui-core/dist/Textarea'

import FormikTextField from 'components/TextFieldFormik'

import CustomField from './components/CustomField'
import AgentSlider from './components/AgentSlider'

type AgentFormProps = {
  formik: any
  handleSubmit: (values: any) => void
  isEdit?: boolean
}

const AgentForm = ({ formik, handleSubmit, isEdit }: AgentFormProps) => {
  const onTextareaChange = (e: any) => {
    formik.setFieldValue('agent_description', e)
  }

  return (
    <StyledAgentForm>
      <StyledFormContainer>
        <StyledFormHeader>
          <Typography
            value={isEdit ? 'Edit Agent' : 'Create New Agent'}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
            customColor={'#FFF'}
          />
        </StyledFormHeader>
        <StyledFormBody>
          <StyledInputWrapper>
            <FormikTextField name='agent_name' placeholder='Name' label='Name' />

            <FormikTextField name='agent_role' placeholder='Role' label='Role' />

            <StyledTextareaWrapper>
              <Typography
                value='Description'
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
                customColor={'#FFF'}
              />
              <Textarea
                hint=''
                placeholder='Description'
                name='agent_description'
                onChange={onTextareaChange}
              />
            </StyledTextareaWrapper>

            <AgentSlider formik={formik} />

            <CustomField formik={formik} formikField={'agent_goals'} placeholder={'Goal'} />

            <CustomField
              formik={formik}
              formikField={'agent_constraints'}
              placeholder={'Constraint'}
            />

            <CustomField formik={formik} formikField={'agent_tools'} placeholder={'Tools'} />

            <CustomField
              formik={formik}
              formikField={'agent_datasources'}
              placeholder={'Datasource'}
            />
            <CustomField
              formik={formik}
              formikField={'agent_instructions'}
              placeholder={'Instructions'}
            />

            <FormikTextField name='agent_model_version' placeholder='GPT-4' label='Model' />

            <FormikTextField name='agent_mode_provider' placeholder='OpenAI' label='Mode' />
          </StyledInputWrapper>
        </StyledFormBody>

        <StyledFormFooter>
          <Button onClick={() => handleSubmit(formik?.values)}>
            {isEdit ? 'Update' : 'Create Agent'}
          </Button>
        </StyledFormFooter>
      </StyledFormContainer>
    </StyledAgentForm>
  )
}

export default AgentForm

const StyledAgentForm = styled.div`
  width: 100vw;
  height: 100vh;

  padding: 50px 0;

  display: flex;
  justify-content: center;
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
const StyledTextareaWrapper = styled.div`
  font: var(--font-general-label);
  line-height: 22px;
  font-size: 10px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  .components-Textarea-Textarea-module__textarea--Qy3d2 {
    font-size: 14px;
  }
`
