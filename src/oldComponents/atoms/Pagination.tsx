import React from 'react'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'

const ButtonComponent = ({ label }: { label: string }) => (
  <div style={{ whiteSpace: 'nowrap' }}>{label}</div>
)

type CustomPaginationProps = {
  totalCount: number
  page: number
  limit: number
  pageChange: (data: any) => void
}

const CustomPagination = ({ totalCount, page, limit, pageChange }: CustomPaginationProps) => {
  if (totalCount < limit) return null

  return (
    <CustomPaginateWrapper>
      <ReactPaginate
        pageCount={Math.ceil(totalCount / limit)}
        onPageChange={pageChange}
        initialPage={page}
        nextLabel={<ButtonComponent label='>>' />}
        previousLabel={<ButtonComponent label='<<' />}
        activeClassName='active_tab'
      />
    </CustomPaginateWrapper>
  )
}

export default CustomPagination

const CustomPaginateWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  & ul {
    display: flex;
    & li {
      list-style: none;
      width: 15px;
      margin: 2px 6px 2px 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      cursor: pointer;
    }
  }
  .active_tab {
    border-bottom: 3px solid #002664;
  }
  .previous {
    margin-right: 25px;
    opacity: 0.7;
  }
  .next {
    margin-left: 25px;
  }
`
