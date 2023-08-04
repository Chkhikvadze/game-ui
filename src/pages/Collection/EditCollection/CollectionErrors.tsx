import ToastBanner from 'components/ToastBanner/ToastBanner'
import UpdateMetadataInfo from 'components/UpdateMetadataInfo'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { AiAnalysisErrorEnum, getCollectionErrors } from 'utils/aiAnalysis'
import { handleHideWarningsOrErrors, handleShowWarningsOrErrors } from './utils'

type CollectionErrorsProps = {
  collection?: any
}

const CollectionErrors = ({ collection }: CollectionErrorsProps) => {
  const params = useParams()

  const { id: collectionId } = collection

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

  const warningStorage: any = localStorage.getItem('HiddenCollectionWarnings')
  const errorStorage: any = localStorage.getItem('HiddenCollectionErrors')

  const parsedWarningStorage = JSON.parse(warningStorage)
  const parsedErrorStorage = JSON.parse(errorStorage)

  const [hideBanner, setHideBanner] = useState({
    hideError: parsedErrorStorage?.includes(collectionId),
    hideWarning: parsedWarningStorage?.includes(collectionId),
  })

  return (
    <StyledWrapper>
      {/* <button
        style={{ color: '#FFF' }}
        onClick={() => {
          handleShowWarningsOrErrors('HiddenCollectionErrors', collectionId)
          handleShowWarningsOrErrors('HiddenCollectionWarnings', collectionId)
          setHideBanner({ hideError: false, hideWarning: false })
        }}
      >
        test show
      </button> */}
      {errors.length > 0 && !hideBanner.hideError && (
        <ToastBanner
          type='negative'
          menuType='dropDown'
          title={`${errorsCount} Error${errorsCount > 1 ? 's' : ''}`}
          dropDownData={errorsData}
          onClose={() => {
            handleHideWarningsOrErrors('HiddenCollectionErrors', collectionId)
            setHideBanner({ ...hideBanner, hideError: true })
          }}
        />
      )}

      {warnings.length > 0 && !hideBanner.hideWarning && (
        <ToastBanner
          menuType='dropDown'
          type='warning'
          title={`${warningsCount} Warning${warningsCount > 1 ? 's' : ''}`}
          dropDownData={warningsData}
          onClose={() => {
            handleHideWarningsOrErrors('HiddenCollectionWarnings', collectionId)
            setHideBanner({ ...hideBanner, hideWarning: true })
          }}
        />
      )}

      {/* {canUpdateMetadata && collection && (
        <UpdateMetadataInfo collectionId={id} isMetadataUpdating={is_metadata_updating} />
      )} */}
    </StyledWrapper>
  )
}

export default CollectionErrors

const StyledWrapper = styled.div`
  display: flex;
  gap: 40px;
`
