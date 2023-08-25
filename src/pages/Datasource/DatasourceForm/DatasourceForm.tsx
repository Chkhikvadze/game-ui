import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Loader from '@l3-lib/ui-core/dist/Loader'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import Textarea from '@l3-lib/ui-core/dist/Textarea'

import FormikTextField from 'components/TextFieldFormik'

import UploadedFile from 'components/UploadedFile'

import {
  StyledFormBody,
  StyledFormContainer,
  StyledFormFooter,
  StyledFormHeader,
  StyledInputWrapper,
  StyledSubmitButtonWrapper,
  StyledTextareaWrapper,
} from 'pages/Agents/AgentForm/AgentForm'
import { useDatasourceForm } from './useDatasourceForm'
import UploadButton from './components/UploadButton'
import { useEffect } from 'react'

type DatasourceFormProps = {
  formik: any
  handleSubmit: (values: any) => void
  isEdit?: boolean
  isLoading?: boolean
}

const DatasourceForm = ({ formik, handleSubmit, isLoading, isEdit }: DatasourceFormProps) => {
  const { dataLoaderOptions, pickedLoaderFields, handleUploadFile, fileLoading } =
    useDatasourceForm(formik)

  const { category, fields } = pickedLoaderFields

  const { values, setFieldValue } = formik
  const { datasource_source_type, config_value, datasource_description } = values

  const onDescriptionChange = (value: string) => {
    formik.setFieldValue('datasource_description', value)
  }

  useEffect(() => {
    if (datasource_source_type.length > 0 && !isLoading) {
      setFieldValue('config_key', pickedLoaderFields?.fields[0]?.key)
      setFieldValue('config_key_type', pickedLoaderFields?.fields[0]?.type)
      console.log('isLoading', isLoading)
    }
  }, [datasource_source_type])

  return (
    <StyledDatasourceForm>
      <StyledFormContainer>
        <StyledFormHeader>
          <Typography
            value={isEdit ? 'Edit Datasource' : 'Create Datasource'}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
            customColor={'#FFF'}
          />
        </StyledFormHeader>
        <StyledFormBody>
          <StyledInputWrapper>
            <FormikTextField name='datasource_name' placeholder='name' label='Name' />

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
                name='datasource_description'
                value={datasource_description}
                onChange={onDescriptionChange}
              />
            </StyledTextareaWrapper>

            <StyledDropdownWrapper>
              <Typography
                value={'Source Type'}
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
                customColor={'#FFF'}
              />
              <Dropdown
                menuPlacement={'auto'}
                insideOverflowContainer
                size={Dropdown.size.MEDIUM}
                value={datasource_source_type}
                placeholder={datasource_source_type}
                options={dataLoaderOptions}
                onChange={(option: any) => {
                  setFieldValue('datasource_source_type', option.value)
                  setFieldValue('config_value', '')
                }}
              />
            </StyledDropdownWrapper>

            {category?.length > 0 && (
              <>
                <>
                  {category === 'File' && (
                    <div>
                      {config_value ? (
                        <UploadedFile
                          onClick={() => setFieldValue('config_value', null)}
                          name={'file'}
                        />
                      ) : (
                        <UploadButton onChange={handleUploadFile} isLoading={fileLoading} />
                      )}
                    </div>
                  )}
                </>
                <>{category === 'Database' && <StyledText>Coming Soon</StyledText>}</>
                <>
                  {category === 'Text' && (
                    <StyledTextareaWrapper>
                      <Textarea
                        hint=''
                        placeholder='Description'
                        name='config_value'
                        value={config_value}
                        onChange={(text: string) => {
                          formik.setFieldValue('config_value', text)
                        }}
                      />
                    </StyledTextareaWrapper>
                  )}
                </>
                <>{category === 'Social' && <StyledText>Coming Soon</StyledText>}</>
                <>{category === 'Web Page' && <StyledText>Coming Soon</StyledText>}</>
                <>{category === 'Application' && <StyledText>Coming Soon</StyledText>}</>
              </>
            )}
          </StyledInputWrapper>
        </StyledFormBody>

        <StyledFormFooter>
          <StyledSubmitButtonWrapper>
            <Button onClick={() => handleSubmit(formik?.values)} disabled={isLoading}>
              {!isLoading && (isEdit ? 'Update' : ' Create Datasource')}
              {isLoading && <Loader size={24} />}
            </Button>
          </StyledSubmitButtonWrapper>
        </StyledFormFooter>
      </StyledFormContainer>
    </StyledDatasourceForm>
  )
}

export default DatasourceForm

const StyledDatasourceForm = styled.div`
  width: 100vw;
  height: 100vh;

  padding: 50px 0;

  display: flex;
  justify-content: center;
`
const StyledDropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const StyledText = styled.span`
  color: #fff;
`
