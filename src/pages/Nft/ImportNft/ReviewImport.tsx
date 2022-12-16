import React from 'react'
import { CustomTable } from 'oldComponents/atoms/CustomTable'
import useReviewImport from './useReviewImport'
import { FormikProvider } from 'formik'
import CustomSelectField from 'oldComponents/atoms/CustomSelect'
import styled from 'styled-components'
import Button from 'oldComponents/atoms/Button'


const SelectHeader = ({ options, item, index }: any) => 
  React.useMemo(() => (
    <CustomSelectField
      options={options}
      name={item}
      placeholder={item}
      label={item}
      mandatory
      key={index}
    />
  ), [options])



const ReviewImport = ({ data }: { data: any[] }) => {
  const { columnConfig, formik, keys, options } = useReviewImport(data)

  const renderTable = React.useMemo(() => (
    <CustomTable
      templateColumns='1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'
      size='14px'
      displayHeader
      columnsConfig={columnConfig}
      data={data || []}
      alignItems='end'
      rowDifferentColors
    />
  ), [data])

  return (
    <>
      <StyledContentWrapper>
        <StyledHeaderWrapper>
          <FormikProvider value={formik}>
            <StyledHeaderContainer>
              {keys.map((item: any, index: number) => <SelectHeader options={options} index={index} item={item} key={index} />)}
            </StyledHeaderContainer>
          </FormikProvider>
        </StyledHeaderWrapper>

        <StyledTableWrapper>
      	{renderTable}
        </StyledTableWrapper>
      </StyledContentWrapper>


      <Button color="primary" onClick={formik.handleSubmit}>
        Save
      </Button>
    </>
  )
}

export default ReviewImport

const StyledTableWrapper = styled.div`
	width: 100%;
	height: 500px;
	overflow: auto;
	margin-top: -65px;
`

const StyledHeaderWrapper = styled.div`
	width: 100%;
	z-index: 1;
	background: #fff;;
`
const StyledHeaderContainer = styled.div`
	display: grid;
	grid-auto-flow: column;
	align-items: center;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-column-gap: 16px;
`
const StyledContentWrapper = styled.div`
  width: 100%;
  overflow: auto;
`
