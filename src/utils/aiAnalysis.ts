type AiAnalysisErrorType = 'Error' | 'Warning' | 'Info'

export interface AiAnalysisError {
  error: AiAnalysisErrorEnum
}

export type AiAnalysisErrors = AiAnalysisError[] | null

export enum AiAnalysisErrorEnum {
  CollectionNotLinked = 'COLLECTION_NOT_LINKED',
  CollectionAndContractSizeNotEqual = 'COLLECTION_AND_CONTRACT_SIZE_NOT_EQUAL',
  CollectionMediaMissing = 'COLLECTION_MEDIA_MISSING',
  UpdateMetadata = 'UPDATE_METADATA',
  AssetNameMissing = 'ASSET_NAME_MISSING',
  AssetDescriptionMissing = 'ASSET_DESCRIPTION_MISSING',
  AssetPropertyMissing = 'ASSET_PROPERTY_MISSING',
  AssetMediaMissing = 'ASSET_MEDIA_MISSING',
}

const AI_ANALYSIS_ERROR_MAP: Record<
  AiAnalysisErrorEnum,
  { type: AiAnalysisErrorType; description: string }
> = {
  [AiAnalysisErrorEnum.CollectionNotLinked]: {
    type: 'Warning',
    description: 'You have not linked collection to contract',
  },
  [AiAnalysisErrorEnum.CollectionAndContractSizeNotEqual]: {
    type: 'Error',
    description: 'Collection assets count is not equal to collection size of contract',
  },
  [AiAnalysisErrorEnum.CollectionMediaMissing]: {
    type: 'Warning',
    description: 'Collection has no media',
  },
  [AiAnalysisErrorEnum.UpdateMetadata]: {
    type: 'Info',
    description: 'Assets are ready to be updated with new metadata',
  },
  [AiAnalysisErrorEnum.AssetNameMissing]: {
    type: 'Error',
    description: 'Name is missing',
  },
  [AiAnalysisErrorEnum.AssetDescriptionMissing]: {
    type: 'Warning',
    description: 'Description is missing',
  },
  [AiAnalysisErrorEnum.AssetPropertyMissing]: {
    type: 'Warning',
    description: 'Property is missing',
  },
  [AiAnalysisErrorEnum.AssetMediaMissing]: {
    type: 'Error',
    description: 'Media is missing',
  },
}

export function getAnalysisError(error: AiAnalysisError) {
  return AI_ANALYSIS_ERROR_MAP[error.error]
}

interface AiAnalysisMappedError {
  type: AiAnalysisErrorType
  description: string
  error: AiAnalysisErrorEnum
}

export function getAssetGlobalErrors(assets: any) {
  if (!assets) return { errors: [], warnings: [] }

  const errors: AiAnalysisMappedError[] = []
  const warnings: AiAnalysisMappedError[] = []

  assets.forEach((asset: any) => {
    const { ai_analysis, token_id } = asset

    ai_analysis?.forEach((error: AiAnalysisError) => {
      const { type, description } = getAnalysisError(error)

      const text = `${description} on token ID ${token_id}`

      if (type === 'Error') {
        errors.push({
          type,
          description: text,
          error: error.error,
        })
      } else if (type === 'Warning') {
        warnings.push({ type, description: text, error: error.error })
      }
    })
  })

  return { errors, warnings }
}

// export function getAnalysisErrors(analysis: ) {

// }
