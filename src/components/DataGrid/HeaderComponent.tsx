import React, { useEffect, useRef, useState } from 'react'
import Heading from '@l3-lib/ui-core/dist/Heading'

import SortIcon from 'assets/svgComponents/SortIcon.svg'
import styled from 'styled-components'

const HeaderComponent = (props: any) => {
  const [ascSort, setAscSort] = useState('inactive')
  const [descSort, setDescSort] = useState('inactive')
  const [noSort, setNoSort] = useState('inactive')
  const refButton = useRef(null)

  const onMenuClicked = () => {
    props.showColumnMenu(refButton.current!)
  }

  const onSortChanged = () => {
    setAscSort(props.column.isSortAscending() ? 'active' : 'inactive')
    setDescSort(props.column.isSortDescending() ? 'active' : 'inactive')
    setNoSort(
      !props.column.isSortAscending() && !props.column.isSortDescending() ? 'active' : 'inactive',
    )
  }

  const onSortRequested = (order: 'asc' | 'desc' | null, event: any) => {
    props.setSort(order, event.shiftKey)
  }

  const sortHandler = (event: any) => {
    if (noSort === 'active') {
      onSortRequested('asc', event)
    } else if (ascSort === 'active') {
      onSortRequested('desc', event)
    } else if (descSort === 'active') {
      onSortRequested(null, event)
    }
  }

  useEffect(() => {
    props.column.addEventListener('sortChanged', onSortChanged)
    onSortChanged()
  }, [])

  //   let menu = null
  //   if (props.enableMenu) {
  const menu = (
    <StyledMenuContent ref={refButton} onClick={() => onMenuClicked()}>
      <StyledMenuIcon>|||</StyledMenuIcon>
    </StyledMenuContent>
  )
  //   }

  //   let sort = null
  //   if (props.enableSorting) {
  let sortStyles: any = { display: 'none' }
  if (noSort === 'active') {
    sortStyles = { display: 'none' }
  } else if (ascSort === 'active') {
    sortStyles = { display: 'block', transform: 'rotate(180deg)' }
  } else if (descSort === 'active') {
    sortStyles = { display: 'block' }
  }
  const sort = (
    <div style={sortStyles}>
      <SortIcon />
    </div>
  )
  //   }

  return (
    <StyledMainWrapper>
      <StyledHeadingWrapper onClick={(event: any) => sortHandler(event)}>
        <Heading value={props.displayName} type={Heading.types.h5} customColor="#fff" /> {sort}
      </StyledHeadingWrapper>
      {menu}
    </StyledMainWrapper>
  )
}

export default HeaderComponent

const StyledMenuIcon = styled.div`
  display: none;
  transform: rotate(90deg);
  color: #fff;
`
const StyledMainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 5px;

  &:hover {
    ${StyledMenuIcon} {
      display: block;
    }
  }
`

const StyledHeadingWrapper = styled.div`
  float: left;
  margin: 0 0 0 3px;
  display: flex;
  align-items: center;
  width: 100%;
`

const StyledMenuContent = styled.div`
  float: left;
  margin: 0 0 0 3px;
`
