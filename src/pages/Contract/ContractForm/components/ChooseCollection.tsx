import { useParams } from 'react-router-dom'
import { useState } from 'react'
import styled from 'styled-components'

import { useCollectionsService } from 'services/useCollectionService'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import Tags from '@l3-lib/ui-core/dist/Tags'
import Typography from '@l3-lib/ui-core/dist/Typography'
import { ContractFormHook } from '../useContractForm'

type Option = {
  label: string
  value: string
}

type OptionRendererProps = {
  label: string
  text: string
}

type ChooseCollectionProps = {
  onChange: (name: string, value: string) => void
  formHook: ContractFormHook
}

const ChooseCollection = ({ onChange, formHook }: ChooseCollectionProps) => {
  const { projectId } = useParams()
  const [searchText, setSearchText] = useState('')

  const { data, loading } = useCollectionsService({
    page: 1,
    limit: 50,
    search_text: '',
    project_id: projectId || '',
  })

  const collectionId = formHook.watch('collection_id')

  const options: Option[] = data?.items?.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    }
  })

  const onDropdownChange = (option: Option) => {
    onChange('collection_id', option.value)
  }

  const OptionRenderer = ({ label, text }: OptionRendererProps) => {
    return (
      <div>
        {text && (
          <Typography
            value={text}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
            customColor={'#FFF'}
          />
        )}

        <Tags key={label} label={label} readOnly outlined={true} color={Tags.colors.white} />
      </div>
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
          value={options.find(option => option.value === collectionId) || options[0]}
          options={options}
          onChange={onDropdownChange}
          optionRenderer={OptionRenderer}
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
