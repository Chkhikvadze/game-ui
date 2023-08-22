import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Slider from '@l3-lib/ui-core/dist/Slider'
import FormikTextField from 'components/TextFieldFormik'
import { FieldArray } from 'formik'
import CustomField from './components/CustomField'

type AgentFormProps = {
  formik: any
  handleSubmit: (values: any) => void
}

const AgentForm = ({ formik, handleSubmit }: AgentFormProps) => {
  return (
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
                onChange={(value: number) => formik?.setFieldValue('agent_temperature', value / 10)}
              />
            </StyledSliderWrapper>

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
          <Button onClick={() => handleSubmit(formik?.values)}>Create Agent</Button>
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
const StyledFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const StyledCustomFieldWrapper = styled.div`
  display: flex;
  align-items: center;
`
