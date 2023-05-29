import Typography from '@l3-lib/ui-core/dist/Typography'
import { useUserByIdService } from 'services'

type CollectionDescriptionProps = {
  collectionName: string
  gameName: string
}
type GameDescriptionProps = {
  gameName: string
  userId: string
}
type MetadataDescriptionProps = {
  collectionName: string
}

export const CollectionDescription = ({ collectionName, gameName }: CollectionDescriptionProps) => {
  return (
    <>
      <Typography
        value={collectionName}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'#FFF'}
      />
      <Typography
        value='was created in'
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'rgba(255, 255, 255, 0.6)'}
      />
      <Typography
        value={gameName}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'#FFF'}
      />
    </>
  )
}

export const GameDescription = ({ userId, gameName }: GameDescriptionProps) => {
  //   const { data: user } = useUserByIdService({ id: '7cca2594-9f58-43bd-969c-d52312de86cf' })
  //   console.log('user', user)
  return (
    <>
      <Typography
        value={gameName}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'#FFF'}
      />
      <Typography
        value='was created by'
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'rgba(255, 255, 255, 0.6)'}
      />
      <Typography
        value={'Levanion'}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'#FFF'}
      />
    </>
  )
}

export const UpdateMetadataDescription = ({ collectionName }: MetadataDescriptionProps) => {
  return (
    <>
      <Typography
        value={'Metadata'}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'#FFF'}
      />
      <Typography
        value='update required in collection'
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'rgba(255, 255, 255, 0.6)'}
      />
      <Typography
        value={collectionName}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'#FFF'}
      />
    </>
  )
}

export const IsUpdatingMetadataDescription = ({ collectionName }: MetadataDescriptionProps) => {
  return (
    <>
      <Typography
        value={'Metadata'}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'#FFF'}
      />
      <Typography
        value='is updating in collection'
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'rgba(255, 255, 255, 0.6)'}
      />
      <Typography
        value={collectionName}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'#FFF'}
      />
    </>
  )
}

export const MetadataUpdatedDescription = ({ collectionName }: MetadataDescriptionProps) => {
  return (
    <>
      <Typography
        value={'Metadata'}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'#FFF'}
      />
      <Typography
        value='updated in collection'
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'rgba(255, 255, 255, 0.6)'}
      />
      <Typography
        value={collectionName}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'#FFF'}
      />
    </>
  )
}
