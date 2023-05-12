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

  console.log(collection?.ai_analysis)

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

  return (
    <StyledWrapper>
      {errors.length > 0 && (
        <ToastBanner type='negative' menuType='dropDown' title='Errors' dropDownData={errorsData} />
      )}

      {warnings.length > 0 && (
        <ToastBanner
          menuType='dropDown'
          type='warning'
          title='Warnings'
          dropDownData={warningsData}
        />
      )}

      {canUpdateMetadata && (
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
      )}
    </StyledWrapper>
  )
}

export default CollectionErrors

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
`
