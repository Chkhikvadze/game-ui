import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import Typography from '@l3-lib/ui-core/dist/Typography'

import { ContractFormHook } from '../useContractForm'
import CollectionOptionRenderer from './CollectionOptionRenderer'
import { useCollectionByIdService, useCollectionsService, useContractsService } from 'services'
import { Nullable } from 'types'

type Option = {
  label: string
  value: string
}

type ChooseCollectionProps = {
  formHook: ContractFormHook
  gameId?: string
}

export const CollectionValueRenderer = ({
  name,
  image,
}: {
  name?: string
  image?: Nullable<string>
}) => {
  return (
    <>
      <StyledValueRenderer>
        <StyledImage
          src={
            image ||
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png'
          }
        />
        <StyledValue>
          <Typography
            value={name}
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor={'#FFF'}
          />
          <Typography
            value={'paragraph'}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
            customColor={'rgba(255, 255, 255, 0.8)'}
          />
        </StyledValue>
      </StyledValueRenderer>
    </>
  )
}

const ChooseCollection = ({ formHook, gameId }: ChooseCollectionProps) => {
  const { data: collections } = useCollectionsService({
    page: 1,
    limit: 50,
    search_text: '',
    game_id: gameId,
  })

  const { data: contracts } = useContractsService({
    page: 1,
    limit: 100,
    game_id: gameId,
  })

  const linkedCollections = contracts?.items?.map((contract: any) => contract.collection_id)

  const noLinkedCollections = collections?.items?.filter(
    (collection: any) => !linkedCollections?.includes(collection.id),
  )

  const collectionId = formHook.watch('collection_id')

  const { data: collection } = useCollectionByIdService({
    id: collectionId,
  })

  // TODO: need to fix any after fixing collection types
  const options: Option[] = noLinkedCollections?.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    }
  })

  const onDropdownChange = (option: Option) => {
    if (!option) {
      formHook.setValue('collection_id', option)
    } else {
      formHook.setValue('collection_id', option.value)
    }
  }

  const ValueRenderer = () => {
    return (
      <>
        <CollectionValueRenderer name={collection?.name} image={collection?.main_media} />
      </>
    )
  }

  return (
    <StyledContainer>
      <Heading
        type={Heading.types.h3}
        value='Collection'
        size='medium'
        customColor={'rgba(255, 255, 255, 0.7)'}
      />

      {options && (
        <Dropdown
          searchIcon
          placeholder='Search collection'
          multiLine
          insideOverflowContainer
          value={collections?.items?.find((option: any) => option.id === collectionId)}
          options={options}
          onChange={onDropdownChange}
          optionRenderer={CollectionOptionRenderer}
          valueRenderer={ValueRenderer}
          size={Dropdown.size.LARGE}
        />
      )}
    </StyledContainer>
  )
}

export default ChooseCollection

const StyledContainer = styled.div`
  /* height: 200px; */
  width: 95%;
  padding: 0px 10px;
`
const StyledValueRenderer = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
`
const StyledValue = styled.div`
  display: flex;
  flex-direction: column;

  gap: 2px;
`
const StyledImage = styled.img`
  width: 48px;
  height: 48px;

  border-radius: 2px;
`
