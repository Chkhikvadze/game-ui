import ToastBanner from 'components/ToastBanner/ToastBanner'
import { useMemo } from 'react'
import styled from 'styled-components'
import { AiAnalysisErrorEnum, getAssetGlobalErrors, getCollectionErrors } from 'utils/aiAnalysis'
import UpdateMetadataInfo from 'components/UpdateMetadataInfo'

type AssetsErrorsProps = {
  assets?: Record<string, any>[]
  collection: any
}

const AssetsErrors = ({ assets, collection }: AssetsErrorsProps) => {
  const { errors, warnings } = useMemo(() => getAssetGlobalErrors(assets), [assets])

  const { info } = useMemo(() => getCollectionErrors(collection), [collection])

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

  return (
    <StyledActionsSectionEdit>
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

      {canUpdateMetadata && (
        <StyledBannerWrapper>
          <UpdateMetadataInfo
            collectionId={collection.id}
            isMetadataUpdating={collection.is_metadata_updating}
          />
        </StyledBannerWrapper>
      )}
    </StyledActionsSectionEdit>
  )
}

export default AssetsErrors

const StyledActionsSectionEdit = styled.div`
  margin-bottom: 18px;
  padding: 0px 24px;
  display: flex;
  justify-content: flex-start;
  gap: 40px;
`

const StyledBannerWrapper = styled.div`
  max-width: 350px;
  width: 350px;
`
