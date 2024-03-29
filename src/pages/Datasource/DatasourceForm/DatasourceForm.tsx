import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Loader from '@l3-lib/ui-core/dist/Loader'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'

import FormikTextField from 'components/TextFieldFormik'

import UploadedFile from 'components/UploadedFile'

import {
  StyledFormBody,
  StyledFormContainer,
  StyledFormFooter,
  StyledFormHeader,
  StyledInputWrapper,
  StyledSubmitButtonWrapper,
} from 'pages/Agents/AgentForm/AgentForm'
import { useDatasourceForm } from './useDatasourceForm'
import UploadButton from './components/UploadButton'

type DatasourceFormProps = {
  formik: any
  handleSubmit: (values: any) => void
  isEdit?: boolean
  isLoading?: boolean
}

const DatasourceForm = ({ formik, handleSubmit, isLoading, isEdit }: DatasourceFormProps) => {
  const {
    dataLoaderOptions,
    pickedLoaderFields,
    uploadedFileObject,
    setUploadedFileObject,
    handleUploadFile,
    fileLoading,
  } = useDatasourceForm(formik)

  const { category, fields } = pickedLoaderFields

  const { values, setFieldValue } = formik
  const { datasource_source_type } = values

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
            <FormikTextField
              name='datasource_description'
              placeholder='description'
              label='Description'
            />

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
                }}
              />
            </StyledDropdownWrapper>
            {/* 
          <FormikTextField
            name='datasource_source_type'
            placeholder='source_type'
            label='Source Type'
          /> */}

            <>
              {category === 'File' && (
                <div>
                  {uploadedFileObject ? (
                    <UploadedFile
                      onClick={() => setUploadedFileObject(null)}
                      name={uploadedFileObject.fileName}
                    />
                  ) : (
                    <UploadButton onChange={handleUploadFile} isLoading={fileLoading} />
                  )}
                </div>
              )}
            </>
            <>{category === 'Database' && <StyledText>Coming Soon</StyledText>}</>
            <>{category === 'Text' && <StyledText>Coming Soon</StyledText>}</>
            <>{category === 'Social' && <StyledText>Coming Soon</StyledText>}</>
            <>{category === 'Web Page' && <StyledText>Coming Soon</StyledText>}</>
            <>{category === 'Application' && <StyledText>Coming Soon</StyledText>}</>
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
