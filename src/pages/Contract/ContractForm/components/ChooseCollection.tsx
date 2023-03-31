import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { useCollectionsService } from 'services/useCollectionService'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'

import { ContractFormHook } from '../useContractForm'
import CollectionOptionRenderer from './CollectionOptionRenderer'

type Option = {
  label: string
  value: string
}

type ChooseCollectionProps = {
  formHook: ContractFormHook
}

const ChooseCollection = ({ formHook }: ChooseCollectionProps) => {
  const { projectId } = useParams()

  const { data } = useCollectionsService({
    page: 1,
    limit: 50,
    search_text: '',
    project_id: projectId || '',
  })

  const collectionId = formHook.watch('collection_id')

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
        />
      )}
    </StyledContainer>
  )
}

export default ChooseCollection

const StyledContainer = styled.div`
  height: 200px;
  width: 100%;
`
