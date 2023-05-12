import ToastBanner from 'components/ToastBanner/ToastBanner'
import { useMemo } from 'react'
import styled from 'styled-components'
import { AiAnalysisErrorEnum, getCollectionErrors } from 'utils/aiAnalysis'
// import useUpdateMetadata from './useUpdateMetadata'

type CollectionErrorsProps = {
  collection?: Record<string, any>
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

  // const { updateMetadata } = useUpdateMetadata()

  const errorsCount = errors.length
  const warningsCount = warnings.length

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

      {canUpdateMetadata && (
        <StyledBannerWrapper>
          <ToastBanner
            type='normal'
            title='Metadata Update'
            menuType='insideContent'
            description='Update metadata after updating the assets to see the changes on contract.'
            buttonOption={{
              button_title: 'Update',
              // button_func: updateMetadata,
            }}
          />
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
