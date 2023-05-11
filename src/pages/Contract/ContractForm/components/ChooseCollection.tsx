import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { useCollectionsService, useCollectionByIdService } from 'services/useCollectionService'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import Typography from '@l3-lib/ui-core/dist/Typography'

import { ContractFormHook } from '../useContractForm'
import CollectionOptionRenderer from './CollectionOptionRenderer'

type Option = {
  label: string
  value: string
}

type ChooseCollectionProps = {
  formHook: ContractFormHook
  gameId?: string
}

const ChooseCollection = ({ formHook, gameId }: ChooseCollectionProps) => {
  const { data } = useCollectionsService({
    page: 1,
    limit: 50,
    search_text: '',
    game_id: gameId,
  })

  const collectionId = formHook.watch('collection_id')

  const { data: collection } = useCollectionByIdService({
    id: collectionId,
  })

  // TODO: need to fix any after fixing collection types
  const options: Option[] = data?.items?.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    }
  })

  const onDropdownChange = (option: Option) => {
    formHook.setValue('collection_id', option.value)
  }

  const CollectionValueRenderer = ({ label }: any) => {
    return (
      <>
        <StyledValueRenderer>
          <StyledImage
            src={
              collection?.main_media ||
              'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png'
            }
          />
          <StyledValue>
            <Typography
              value={label}
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
          value={options.find(option => option.value === collectionId)}
          options={options}
          onChange={onDropdownChange}
          optionRenderer={CollectionOptionRenderer}
          valueRenderer={CollectionValueRenderer}
          size={Dropdown.size.LARGE}
        />
      )}
    </StyledContainer>
  )
}

export default ChooseCollection

const StyledContainer = styled.div`
  /* height: 200px; */
  width: 100%;
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
