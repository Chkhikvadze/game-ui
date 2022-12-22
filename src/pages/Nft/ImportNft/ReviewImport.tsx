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
  const itemLength = 11

  const { columnConfig, formik, keys, options } = useReviewImport(data)

  const renderTable = React.useMemo(
    () => (
      <CustomTable
        templateColumns={`repeat(${itemLength}, 150px)`}
        size="14px"
        displayHeader
        columnsConfig={columnConfig}
        data={data || []}
        alignItems="end"
        rowDifferentColors
      />
    ),
    [data],
  )

  return (
    <>
      <StyledContentWrapper>
        <StyledHeaderWrapper>
          <FormikProvider value={formik}>
            <StyledHeaderContainer itemLength={itemLength}>
              {keys.map((item: any, index: number) => (
                <SelectHeader options={options} index={index} item={item} key={index} />
              ))}
            </StyledHeaderContainer>
          </FormikProvider>
        </StyledHeaderWrapper>

        <StyledTableWrapper>{renderTable}</StyledTableWrapper>
      </StyledContentWrapper>

      <Button color="primary" onClick={formik.handleSubmit}>
        Save
      </Button>
    </>
  )
}

export default ReviewImport

const StyledTableWrapper = styled.div``

const StyledHeaderWrapper = styled.div`
  width: fit-content;
  background: #fff;
  position: sticky;
  padding: 20px 0;
  top: -20px;
`
const StyledHeaderContainer = styled.div<{ itemLength?: number }>`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-template-columns: ${(p) => p.itemLength && `repeat(${p.itemLength}, 150px)`};
  grid-column-gap: 16px;
`
const StyledContentWrapper = styled.div`
width: 100%;
  overflow: auto;
  background: #fff;
  padding: 10px 20px;
  margin-bottom: 10px;
  margin-top: 20px;
`
