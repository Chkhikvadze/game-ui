import { FormikProvider } from 'formik'
import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Loader from '@l3-lib/ui-core/dist/Loader'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import Toast from '@l3-lib/ui-core/dist/Toast'

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
import { useDataLoadersService } from 'services/datasource/useDataLoadersService'
import { useContext, useRef, useState } from 'react'
import useUploadFile from 'hooks/useUploadFile'
import { FILE_TYPES } from './AIChatModal/fileTypes'
import { ToastContext } from 'contexts'
import UploadedFile from 'components/UploadedFile'

const CreateDatasourceModal = () => {
  const { closeDatasourceModal, formik, handleSubmit, isLoading } = useDatasource()

  const { data: dataLoaders } = useDataLoadersService()

  const dataLoaderOptions = dataLoaders?.map((loader: any) => {
    const { source_type } = loader
    return { value: source_type, label: source_type }
  })

  const { values, setFieldValue } = formik
  const { datasource_source_type } = values

  const pickedLoaderFields = dataLoaders
    ?.filter((loader: any) => loader.source_type === formik?.values?.datasource_source_type)
    .map((loader: any) => {
      return { fields: loader.fields, category: loader.Category }
    })[0] || { category: '', fields: [] }

  console.log('dataLoaders', dataLoaders)
  console.log('dataLoaderOptions', dataLoaderOptions)
  console.log('pickedLoaderFields', pickedLoaderFields)

  const { category, fields } = pickedLoaderFields

  const { setToast, toast } = useContext(ToastContext)

  const uploadRef = useRef(null as any)

  const handleUploadButton = async () => {
    uploadRef.current.click()
  }
  const { uploadFile } = useUploadFile()
  const [uploadedFileObject, setUploadedFileObject] = useState<any | null>(null)
  const [fileLoading, setFileLoading] = useState(false)

  const handleUploadFile = async (event: any) => {
    setFileLoading(true)
    const { files }: any = event.target

    if (!FILE_TYPES.includes(files[0].type)) {
      setToast({
        message: 'Format is not supported!',
        type: 'negative',
        open: true,
      })

      setFileLoading(false)
    } else {
      const fileObj = {
        fileName: files[0].name,
        type: files[0].type,
        fileSize: files[0].size,
        locationField: 'chat',
        game_id: 'ce134c05-5be7-4cc0-8515-86908cce0753',
      }

      const fileName = files[0].name

      const res = await uploadFile(fileObj, files)
      setFileLoading(false)

      setUploadedFileObject({ url: res, fileName: fileName })
    }
  }

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
                  {/* 
                  <FormikTextField
                    name='datasource_source_type'
                    placeholder='source_type'
                    label='Source Type'
                  /> */}

                  <>
                    {category === 'File' && (
                      <div>
                        <input
                          type='file'
                          ref={uploadRef}
                          style={{ display: 'none' }}
                          onChange={handleUploadFile}
                        />

                        {uploadedFileObject ? (
                          <UploadedFile
                            onClick={() => setUploadedFileObject(null)}
                            name={uploadedFileObject.fileName}
                          />
                        ) : (
                          <Button
                            onClick={handleUploadButton}
                            disabled={fileLoading}
                            kind={Button.kinds.SECONDARY}
                            size={Button.sizes.SMALL}
                          >
                            <span>Upload File</span>
                            {/* {!fileLoading && 'Upload File'} */}
                            {fileLoading && <Loader size={24} />}
                          </Button>
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
        </FormikProvider>
        <Toast
          label={toast?.message}
          type={toast?.type}
          autoHideDuration={2500}
          open={toast?.open}
          onClose={() => setToast({ open: false })}
        />
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
