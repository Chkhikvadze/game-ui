import React from 'react'
import { CustomTable } from 'oldComponents/atoms/CustomTable'
import useReviewImport from './useReviewImport'
import { FormikProvider } from 'formik'
import CustomSelectField from 'oldComponents/atoms/CustomSelect'
import styled from 'styled-components'

import Button from 'oldComponents/atoms/Button'
import { notImportedColumnConfig, importedColumnConfig } from './columnConfig'


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



const ReviewImport = ({ data, setStep: startOver }: { data: any[], setStep: any }) => {
  const itemLength = 11

  const { columnConfig, formik, keys, options, step, response, setStep, handleDownloadTemplate } = useReviewImport(data)

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

  const not_imported_config = notImportedColumnConfig(response?.not_imported ?? [])
  const imported_config = importedColumnConfig(response?.nfts ?? [])


  return (
    <>
      {!response ?
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


          <StyledButtonContainer templateColumns={`170px 100px 100px`}>

            <Button color="primary" onClick={handleDownloadTemplate}>
              Download template
            </Button>
            <Button color="primary" onClick={formik.handleSubmit}>
            Save
            </Button>
            <Button color="primary" onClick={() => startOver(0)}>
            Start over
            </Button>
          </StyledButtonContainer>
        </>
        :
        (
          <>
            <StyledButtonContainer templateColumns={`120px 120px 220px 120px`} style={{ marginTop: '20px' }}>
              <Button color="primary" onClick={() => setStep(0)} disabled={step === 0}>
                  Imported
              </Button>
              <Button color="primary" onClick={() => setStep(1)} disabled={step === 1}>
                  Not imported
              </Button>
              <Button color="primary">
                  Download error record
              </Button>
              <Button color="primary" onClick={() => startOver(0)}>
                  Start over
              </Button>
            </StyledButtonContainer>
            <StyledButtonContainer templateColumns={`130px 150px`} style={{ marginTop: '20px' }}>
              <div>Total imported: {response.total_imported}</div>
              <div>Total not imported: {response?.not_imported.length}</div>
            </StyledButtonContainer>
            <StyledContentWrapper>

              <StyledTableWrapper>
                <CustomTable
                  templateColumns={`repeat(${itemLength}, 150px)`}
                  size="14px"
                  displayHeader
                  columnsConfig={step === 0 ?
                    imported_config
                    :
                    not_imported_config
                  }
                  data={step === 0 ? response?.nfts ?? [] : response?.not_imported ?? []}
                  alignItems="end"
                  rowDifferentColors
                />
              </StyledTableWrapper>
            </StyledContentWrapper>
          </>
        )
      }
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

const StyledButtonContainer = styled.div<{ templateColumns: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.templateColumns};
  grid-gap: 10px;
`