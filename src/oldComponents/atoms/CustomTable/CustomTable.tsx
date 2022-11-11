import React, { ReactNode } from 'react'
import get from 'lodash/fp/get'
import { ITableRow } from 'interfaces'

import SorterUpArrow from 'assets/old/images/SvgComponents/SorterUpArrow'
import SorterDownArrow from 'assets/old/images/SvgComponents/SorterDownArrow'
// import ChevronIcon from 'assets/old/images/SvgComponents/ChevronIcon'
import styled from 'styled-components'
import useWindowSize from 'hooks/useWindowSize'

const textColor = '#212529'
const lightBlueColor = '#007DBA'
const grayDarkColor = '#4C4F55'
const grayColor = '#E5E5E5'
const grayLightColor = '#f8f8f8'
const whiteColor = '#fff'
const redColor = '#f64225'

type CustomTableProps<DataType> = {
  className?: string
  size?: string
  displayHeader?: boolean
  columnsConfig: any
  headerBackground?: string
  onRowClick?: (item: DataType) => void
  maxHeight?: string
  data: Array<DataType>
  rowStyle?: Record<string, object>
  templateColumns: string
  getRowBackgroundColor?: (item: any) => string
  // getCellTextColor?: (item: DataType) => string,
  tableWidth?: string
  alignItems?: string
  rowDifferentColors?: boolean
  handleSortClick?: (sort_by_column: string, sort_by_order: boolean) => void
  sorter?: any
  fixedSize?: boolean
}

//eslint-disable-next-line
const CustomTable = <DataType, K>({
  className,
  size,
  displayHeader = false,
  columnsConfig,
  headerBackground,
  // onRowClick,
  maxHeight,
  data,
  rowStyle,
  templateColumns,
  // getRowBackgroundColor,
  // getCellTextColor,
  tableWidth,
  alignItems,
  rowDifferentColors,
  handleSortClick = () => {
  },
  sorter,
  fixedSize,
}: CustomTableProps<DataType>) => {
  const windowSize = useWindowSize()
  const filterRows = (row: any, column: any, rowIndex: any) => {
	if (typeof column.dataKey === 'function') {
	  if (typeof column.dataKey(row, rowIndex) === 'object') {
		return column.dataKey(row, rowIndex)
	  }
	  
	  if (get(column.dataKey, row) === null) {
		return '0'
	  } else return `${column.dataKey(row, rowIndex)}`
	}
	
	if (get(column.dataKey, row) === null) {
	  return '0'
	} else return `${get(column.dataKey, row)}`
  }
  
  const isMenu = true
  const menuSize = isMenu ? 240: 72
  const paddings = isMenu ? 43: 86
  
  return (
	<StyledRoot
	  className={'root_container'}
	  windowSize={windowSize}
	  menuSize={menuSize}
	  paddings={paddings}
	  fixedSize={fixedSize}
	>
	  <StyledTableContainer
		tableWidth={tableWidth}
		className={'table-container'}
		fixedSize={fixedSize}
	  >
		{displayHeader && (
		  <StyledTableHeaderContainer>
			<StyledTableRow
			  background={headerBackground}
			  templateColumns={templateColumns}
			  size={size}
			  alignItems={alignItems}
			  className="styled-table-header-row"
			  noBorder
			>
			  {columnsConfig.map(
				(
				  column: {
					name: string
					dataKey: string
					mandatory: ReactNode
					sort: boolean
					sortBy: string
				  },
				  index: number,
				) => (
				  <StyledTableCell className="table-header-column" key={index}>
					<StyledText
					  onClick={() => {
						if (column.sortBy) {
						  handleSortClick(
							column.sortBy,
							column.sortBy === sorter.sort_by_column ? !sorter.sort_by_order: true,
						  )
						}
					  }}
					  key={column.name}
					  weight={600}
					  size={14}
					  cursorPointer={column.sortBy}
					>
					  {column.name} {column.mandatory && <StyledMandatory>*</StyledMandatory>}
					</StyledText>
					{column.sortBy && (
					  <SorterArrowContainer>
						<StyledSortIconWrapper
						  onClick={() => handleSortClick(column.sortBy, false)}
						>
						  <SorterUpArrow
							color={
							  !sorter.sort_by_order && column.sortBy === sorter.sort_by_column
								? lightBlueColor
								: ''
							}
						  />
						</StyledSortIconWrapper>
						<StyledSortIconWrapper onClick={() => handleSortClick(column.sortBy, true)}>
						  <SorterDownArrow
							color={
							  sorter.sort_by_order && column.sortBy === sorter.sort_by_column
								? lightBlueColor
								: ''
							}
						  />
						</StyledSortIconWrapper>
					  </SorterArrowContainer>
					)}
				  </StyledTableCell>
				),
			  )}
			</StyledTableRow>
		  </StyledTableHeaderContainer>
		)}
		
		<StyledTableBodyContainer maxHeight={maxHeight}>
		  {data.map((row, index) => (
			<StyledTableRow
			  indexNum={index}
			  rowDifferentColors={rowDifferentColors}
			  // onClick={() => onRowClick(row)}
			  size={size}
			  key={index}
			  templateColumns={templateColumns}
			  // style={{ ...rowStyle, backgroundColor: getRowBackgroundColor(row) }}
			  className="styled-table-row"
			>
			  {columnsConfig.map((column: any, columnIndex: number) => (
				<StyledTableCell className="table-body-row" key={columnIndex}>
				  <StyledText size={14}>{filterRows(row, column, index)}</StyledText>
				</StyledTableCell>
			  ))}
			</StyledTableRow>
		  ))}
		</StyledTableBodyContainer>
	  </StyledTableContainer>
	</StyledRoot>
  )
}

export default CustomTable

const StyledRoot = styled.div<{
  windowSize?: any
  menuSize?: any
  paddings?: any
  fixedSize?: boolean
}>`
  ${({fixedSize, windowSize, paddings, menuSize}) =>
          !fixedSize &&
          `
overflow: auto;
@media (max-width: 1200px) {
  width: ${windowSize?.width - 2 * 43 - menuSize}px;
}
`}
`

const StyledTableContainer = styled.div<{tableWidth?: string; fixedSize?: boolean}>`
  ${({fixedSize}) =>
          !fixedSize &&
          `
    @media (max-width: 1200px) {
      min-width: 1200px;
  }
`}
`

const StyledTableHeaderContainer = styled.div`
  border-bottom: 2px solid ${grayDarkColor};
  font-weight: 600;
`

const StyledTableBodyContainer = styled.div<{maxHeight?: string}>`
  max-height: ${(props) => props.maxHeight};
`

const StyledTableRow = styled.div<ITableRow>`
  min-height: 50px;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-template-columns: ${(props) => props.templateColumns};
  background-color: ${(props) => props.background};
  grid-column-gap: ${(props) => (props.size === 'small' ? 8: 16)}px;
  align-items: ${(p) => p.alignItems};
  border-bottom: ${(props) => (props.noBorder ? '': `1px solid ${grayColor}`)};
  ${({rowDifferentColors, indexNum}) =>
          rowDifferentColors &&
          `
    background-color: ${
                  indexNum && indexNum % 2 === 1 ? `${whiteColor} !important`: `${grayLightColor} !important`
          }};
  `}
`

const StyledTableCell = styled.div<{size?: string}>`
  display: grid;
  grid-template-columns: auto 1fr;
  padding: 8px;
  box-sizing: border-box;
  ${(props) => props.size === 'small' && 'font-size: 0.65rem;'};
`

const SorterArrowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 15px;
  margin-left: 8px;
`

const StyledSortIconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`

const StyledText = styled.div<{weight?: number; size?: number; cursorPointer?: string}>`
  font-family: 'Roboto', sans-serif !important;
  ${(p) => p.weight && `font-weight: ${p.weight}`};
  font-size: ${(p) => (p.size ? `${p.size}px`: '16px')};
  color: ${textColor};
  ${(p) => p.cursorPointer && 'cursor: pointer'};
  width: 100%;
`

const StyledMandatory = styled.span`
  color: ${redColor};
`
