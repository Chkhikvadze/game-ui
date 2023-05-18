import ToastBanner from 'components/ToastBanner/ToastBanner'
import UpdateMetadataInfo from 'components/UpdateMetadataInfo'
import { useMemo } from 'react'
import styled from 'styled-components'
import { AiAnalysisErrorEnum, getCollectionErrors } from 'utils/aiAnalysis'

type CollectionErrorsProps = {
  collection?: any
}

const CollectionErrors = ({ collection }: CollectionErrorsProps) => {
  const { errors, warnings, info } = useMemo(() => getCollectionErrors(collection), [collection])

  const canUpdateMetadata = info.some(err => err.error === AiAnalysisErrorEnum.UpdateMetadata)

  const errs = errors.map(err => ({
    value: err.name,
    info: err.description || '',
  }))

  const errorsData = {
    header_title: 'Missing required fields',
    data: errs,
  }

  const warns = warnings.map(err => ({
    value: err.name,
    info: err.description || '',
  }))

  const warningsData = {
    header_title: 'Missing fields',
    data: warns,
  }

  const errorsCount = errors.length
  const warningsCount = warnings.length

  const { id, is_metadata_updating } = collection

  return (
    <StyledWrapper>
      {errors.length > 0 && (
        <StyledBannerWrapper>
          <ToastBanner
            type='negative'
            menuType='dropDown'
            title={`${errorsCount} Error${errorsCount > 1 ? 's' : ''}`}
            dropDownData={errorsData}
          />
        </StyledBannerWrapper>
      )}

      {warnings.length > 0 && (
        <StyledBannerWrapper>
          <ToastBanner
            menuType='dropDown'
            type='warning'
            title={`${warningsCount} Warning${warningsCount > 1 ? 's' : ''}`}
            dropDownData={warningsData}
          />
        </StyledBannerWrapper>
      )}

      {canUpdateMetadata && collection && (
        <StyledBannerWrapper>
          <UpdateMetadataInfo collectionId={id} isMetadataUpdating={is_metadata_updating} />
        </StyledBannerWrapper>
      )}
    </StyledWrapper>
  )
}

export default CollectionErrors

const StyledWrapper = styled.div`
  display: flex;
  gap: 40px;
`

const StyledBannerWrapper = styled.div`
  max-width: 350px;
  width: 350px;
`
