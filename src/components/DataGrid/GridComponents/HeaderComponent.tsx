import { useEffect, useRef, useState } from 'react' //
import Heading from '@l3-lib/ui-core/dist/Heading'

import SortIcon from 'assets/svgComponents/SortIcon.svg'
import styled from 'styled-components'

const HeaderComponent = (props: any) => {
  const { icon, displayName } = props

  const [ascSort, setAscSort] = useState(false)
  const [descSort, setDescSort] = useState(false)
  const [noSort, setNoSort] = useState(false)
  const refButton = useRef(null)

  const onMenuClicked = () => {
    props.showColumnMenu(refButton.current!)
  }

  const onSortChanged = () => {
    setAscSort(props.column.isSortAscending() ? true : false)
    setDescSort(props.column.isSortDescending() ? true : false)
    setNoSort(!props.column.isSortAscending() && !props.column.isSortDescending() ? true : false)
  }

  const onSortRequested = (order: 'asc' | 'desc' | null, event: any) => {
    props.setSort(order, event.shiftKey)
  }

  const sortHandler = (event: any) => {
    if (noSort === true) {
      onSortRequested('asc', event)
    } else if (ascSort === true) {
      onSortRequested('desc', event)
    } else if (descSort === true) {
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
  let sortState: any
  if (noSort) {
    sortState = 'noSort'
  } else if (ascSort) {
    sortState = 'ascSort'
  } else if (descSort) {
    sortState = 'descSort'
  }
  const sort = (
    <StyledSortIcon sort={sortState}>
      <SortIcon />
    </StyledSortIcon>
  )
  //   }

  return (
    <StyledMainWrapper>
      {icon && <StyledIconWrapper>{icon}</StyledIconWrapper>}

      <StyledHeadingWrapper onClick={(event: any) => sortHandler(event)}>
        <StyledHeading value={displayName} type={Heading.types.h1} customColor='#fff' />
        {sort}
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
  /* gap: 5px; */
  background-color: transparent;
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
const StyledSortIcon = styled.div<{ sort?: string }>`
  display: ${p => (p.sort === 'noSort' ? 'none' : 'block')};
  transform: ${p => p.sort === 'ascSort' && 'rotate(180deg)'};
`
const StyledIconWrapper = styled.div`
  width: 25px;
  min-width: 25px;

  color: #fff;
`
const StyledHeading = styled(Heading)`
  font-size: 20px;
`
