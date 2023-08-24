import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Loader from '@l3-lib/ui-core/dist/Loader'
import Textarea from '@l3-lib/ui-core/dist/Textarea'

import FormikTextField from 'components/TextFieldFormik'

import CustomField from './components/CustomField'
import AgentSlider from './components/AgentSlider'
import { useAgentForm } from './useAgentForm'
import AgentDropdown from './components/AgentDropdown'

type AgentFormProps = {
  formik: any
  handleSubmit: (values: any) => void
  isEdit?: boolean
  isLoading?: boolean
}

const AgentForm = ({ formik, handleSubmit, isEdit, isLoading }: AgentFormProps) => {
  const onTextareaChange = (e: any) => {
    formik.setFieldValue('agent_description', e)
  }

  const { providerOptions, modelOptions } = useAgentForm(formik)

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

            <AgentDropdown
              label={'Mode Provider'}
              value={formik?.values?.agent_mode_provider}
              options={providerOptions}
              placeholder={formik.values.agent_mode_provider}
              onChange={(option: any) => {
                formik.setFieldValue('agent_model_version', '')
                formik.setFieldValue('agent_mode_provider', option.value)
              }}
            />

            <AgentDropdown
              label={'Model Version'}
              value={formik?.values?.agent_model_version}
              options={modelOptions}
              placeholder={formik.values.agent_model_version}
              onChange={(option: any) => formik.setFieldValue('agent_model_version', option.value)}
            />
          </StyledInputWrapper>
        </StyledFormBody>

        <StyledFormFooter>
          <StyledSubmitButtonWrapper>
            <Button onClick={() => handleSubmit(formik?.values)} disabled={isLoading}>
              {!isLoading && (isEdit ? 'Update' : 'Create Agent')}
              {isLoading && <Loader size={24} />}
            </Button>
          </StyledSubmitButtonWrapper>
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

export const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
  width: 100%;
  /* min-width: 400px; */
`
export const StyledFormHeader = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
`
export const StyledFormBody = styled.div`
  width: 100%;
  height: 100%;

  margin: 50px 0px;

  overflow: scroll;
`
export const StyledFormFooter = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
`
export const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 35px;
  width: 100%;
  max-width: 600px;
  margin: auto;

  padding: 20px;
`

export const StyledTextareaWrapper = styled.div`
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
export const StyledSubmitButtonWrapper = styled.div`
  width: 600px;
  padding-left: 20px;
`
