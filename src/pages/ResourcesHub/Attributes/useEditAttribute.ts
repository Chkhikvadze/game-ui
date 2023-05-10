import {
  useAttributeIdService,
  useUpdateCacheThenServerAttribute,
} from 'services/useAssetResourcesService'

export const useEditAttributes = (attributeId?: number) => {
  const { data: attribute } = useAttributeIdService({
    id: attributeId || '',
  })

  const cellEditFn = useUpdateCacheThenServerAttribute()

  return {
    attribute,
    cellEditFn,
  }
}
