import ToastBanner from 'components/ToastBanner/ToastBanner'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { AiAnalysisErrorEnum, getAssetGlobalErrors, getCollectionErrors } from 'utils/aiAnalysis'
import UpdateMetadataInfo from 'components/UpdateMetadataInfo'
import { handleHideWarningsOrErrors } from 'pages/Collection/EditCollection/utils'

type AssetsErrorsProps = {
  assets?: Record<string, any>[]
  collection: any
}

const AssetsErrors = ({ assets, collection }: AssetsErrorsProps) => {
  const { errors, warnings } = useMemo(() => getAssetGlobalErrors(assets), [assets])

  const { info } = useMemo(() => getCollectionErrors(collection), [collection])

  const { id: collectionId } = collection

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

  const warningStorage: any = localStorage.getItem('HiddenAssetsWarnings')
  const errorStorage: any = localStorage.getItem('HiddenAssetsErrors')

  const parsedWarningStorage = JSON.parse(warningStorage)
  const parsedErrorStorage = JSON.parse(errorStorage)

  const [hideBanner, setHideBanner] = useState({
    hideError: parsedErrorStorage?.includes(collectionId),
    hideWarning: parsedWarningStorage?.includes(collectionId),
  })

  return (
    <StyledActionsSectionEdit>
      {/* <button
        style={{ color: '#FFF' }}
        onClick={() => {
          handleShowWarningsOrErrors('HiddenAssetsErrors', collectionId)
          handleShowWarningsOrErrors('HiddenAssetsWarnings', collectionId)
          setHideBanner({ hideError: false, hideWarning: false })
        }}
      >
        test show
      </button> */}
      {errors.length > 0 && !hideBanner.hideError && (
        <StyledBannerWrapper>
          <ToastBanner
            type='negative'
            menuType='dropDown'
            title={`${errorsCount} Error${errorsCount > 1 ? 's' : ''}`}
            dropDownData={errorsData}
            onClose={() => {
              handleHideWarningsOrErrors('HiddenAssetsErrors', collectionId)
              setHideBanner({ ...hideBanner, hideError: true })
            }}
          />
        </StyledBannerWrapper>
      )}

      {warnings.length > 0 && !hideBanner.hideWarning && (
        <StyledBannerWrapper>
          <ToastBanner
            menuType='dropDown'
            type='warning'
            title={`${warningsCount} Warning${warningsCount > 1 ? 's' : ''}`}
            dropDownData={warningsData}
            onClose={() => {
              handleHideWarningsOrErrors('HiddenAssetsWarnings', collectionId)
              setHideBanner({ ...hideBanner, hideWarning: true })
            }}
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
