import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Loader from '@l3-lib/ui-core/dist/Loader'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'

import FormikTextField from 'components/TextFieldFormik'
import { useDataLoadersService } from 'services/datasource/useDataLoadersService'
import { useContext, useRef, useState } from 'react'
import useUploadFile from 'hooks/useUploadFile'

import { ToastContext } from 'contexts'
import UploadedFile from 'components/UploadedFile'
import { useDatasource } from '../useDatasource'
import { FILE_TYPES } from 'modals/AIChatModal/fileTypes'

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
  const uploadRef = useRef(null as any)

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

  const handleUploadButton = async () => {
    uploadRef.current.click()
  }
  return (
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
            <>{category === 'Database' && <div>database</div>}</>
            <>{category === 'Text' && <div>Text</div>}</>
            <>{category === 'Social' && <div>Social</div>}</>
            <>{category === 'Web Page' && <div>Web Page</div>}</>
            <>{category === 'Application' && <div>Application</div>}</>
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
