import { FormikProvider } from 'formik'

import withRenderModal from 'hocs/withRenderModal'

import Button from '@l3-lib/ui-core/dist/Button'

import { starsIcon } from 'assets/icons'

import PersonaOutline from '@l3-lib/ui-core/dist/icons/PersonaOutline'
import { useAsset } from 'pages/Asset/Assets/useAsset'
import AssetForm from 'pages/Asset/AssetForm'
import { useTranslation } from 'react-i18next'
import FullScreenModal from 'components/FullScreenModal'
import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'

import {
  StyledCloseBtn,
  StyledHeader,
  StyledHeaderGroup,
  StyledModalBody,
  StyledModalWrapper,
  StyledTypography,
  StyledModalFooter,
} from './modalStyle'

// import { StyledFormSection } from 'pages/ApiKeys/ApiKeysStyle'

const CreateAssetModal = () => {
  const {
    formik,
    handleUploadImages,
    propertiesOptions,
    assetOption,
    loadingMediaUpload,
    closeModal,
  } = useAsset()

  const { t } = useTranslation()

  const closeCreateAssetModal = () => {
    closeModal('create-asset-modal')
  }

  return (
    <FullScreenModal>
      <FormikProvider value={formik}>
        <AssetForm
          formik={formik}
          closeModal={closeCreateAssetModal}
          handleUploadImages={handleUploadImages}
          loadingMediaUpload={loadingMediaUpload}
        />
      </FormikProvider>

      {/* <StyledModalWrapper className='modal_wrapper'>
        <StyledHeader>
          <StyledHeaderGroup>
            <img src={starsIcon} alt='start' />
            <StyledTypography>Add AI Test Asset</StyledTypography>
          </StyledHeaderGroup>
          <StyledCloseBtn onClick={() => closeModal('create-asset-modal')}>
            <CloseIconSvg color='rgba(255, 255, 255, 0.8);' />
          </StyledCloseBtn>
        </StyledHeader>
        <StyledModalBody>
          <FormikProvider value={formik}>
            <AssetForm
              loadingMediaUpload={loadingMediaUpload}
              handleUploadImages={handleUploadImages}
              formik={formik}
              propertiesOptions={propertiesOptions}
              assetOption={assetOption}
            />
          </FormikProvider>
        </StyledModalBody>
        <StyledModalFooter>
          <Button onClick={formik.handleSubmit} leftIcon={PersonaOutline}>
            Create asset
          </Button>
        </StyledModalFooter>
      </StyledModalWrapper> */}

      {/* <Button onClick={formik.handleSubmit} leftIcon={PersonaOutline}>
          Create asset
        </Button> */}
    </FullScreenModal>
  )
}

export default withRenderModal('create-asset-modal')(CreateAssetModal)
