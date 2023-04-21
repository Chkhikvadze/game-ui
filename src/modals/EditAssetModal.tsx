import { FormikProvider } from 'formik'

import styled from 'styled-components'
import withRenderModal from 'hocs/withRenderModal'

import { useEditAsset } from '../pages/Asset/EditAsset/useEditAsset'

import AssetForm from 'pages/Asset/AssetForm'

import ButtonLink from 'oldComponents/atoms/ButtonLink'
import Button from '@l3-lib/ui-core/dist/Button'
import PersonaOutline from '@l3-lib/ui-core/dist/icons/PersonaOutline'
import FullScreenModal from 'components/FullScreenModal'
import FileUploadField from 'atoms/FileUploadField'

import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'

import {
  StyledCloseBtn,
  StyledHeader,
  StyledModalBody,
  StyledModalWrapper,
  StyledModalFooter,
} from './modalStyle'

type EditAssetModalProps = {
  data: {
    assetId: any
  }
}

const EditAssetModal = ({ data }: EditAssetModalProps) => {
  const { assetId } = data
  const { formik, propertiesOptions, assetOption, closeModal } = useEditAsset(assetId)
  // console.log('formik', formik)
  return (
    <FullScreenModal>
      <StyledModalWrapper className='modal_wrapper'>
        <StyledHeader>
          <StyledCloseBtn onClick={() => closeModal('edit-asset-modal')}>
            <CloseIconSvg color='rgba(255, 255, 255, 0.8);' />
          </StyledCloseBtn>
        </StyledHeader>
        <StyledModalBody>
          <FormikProvider value={formik}>
            <AssetForm
              formik={formik}
              propertiesOptions={propertiesOptions}
              assetOption={assetOption}
              isEdit={true}
            />
          </FormikProvider>
        </StyledModalBody>
        <StyledModalFooter>
          <Button onClick={formik.handleSubmit} leftIcon={PersonaOutline}>
            Create asset
          </Button>
        </StyledModalFooter>
      </StyledModalWrapper>
    </FullScreenModal>
  )
}

export default withRenderModal('edit-asset-modal')(EditAssetModal)

export const StyledForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 16px;
  width: 600px;
`

export const StyledActionsContainer = styled.div`
  display: flex;
  justify-items: flex-end;
`

export const StyledModalButtonLink = styled(ButtonLink)`
  text-decoration: none;
  margin-right: 12px;
  margin-top: 3px;
`

export const StyledUploadImg = styled(FileUploadField)`
  width: 100%;
  height: 300px;
`
