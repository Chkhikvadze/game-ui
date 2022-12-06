import React from 'react'
import searchIcon from 'assets/old/images/search.svg'

import {
  StyledSearchRoot,
  StyledSearch,
  StyledSearchInput,
  Form,
  StyledButton,
} from './SearchBarStyle'
import Typography from 'oldComponents/atoms/Typography'

type SearchFleetType = {
  searchValue: string
  onSearch: Function
  placeholder?: string
}

const SearchBar = ({searchValue, onSearch, placeholder}: SearchFleetType) => {
  const onKeyPressEvent = (event: any) => {
    event.stopPropagation()
    if (event.key === 'Enter') {
	  onSearch(event.target.value)
    }
  }
  
  const handleSearchClick = (event: any) => {
    event.preventDefault()
    onSearch(event?.target?.search.value)
  }
  
  return (
    <StyledSearchRoot>
	  <Typography variant="h5">Search</Typography>
	  <StyledSearch>
        <Form onSubmit={handleSearchClick}>
		  <StyledSearchInput
            placeholder={placeholder && placeholder}
            type="text"
            name="search"
            onKeyPress={onKeyPressEvent}
            defaultValue={searchValue}
		  />
		  <StyledButton color="primary">
            <img src={searchIcon} alt="search"/>
		  </StyledButton>
        </Form>
	  </StyledSearch>
    </StyledSearchRoot>
  )
}

export default SearchBar
