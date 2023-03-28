import React, { useState } from 'react'
import styled from 'styled-components'
import { FormikProvider } from 'formik'
import TextField from 'oldComponents/molecules/TextField'
import TextAreaField from 'oldComponents/molecules/TeaxtAreaField'
import DatePickerField from 'oldComponents/atoms/DatePickerField'
// import useFilter from './useFilter'
import TextFieldController from 'components'
import DatePicker from 'components/DatePicker'
import Button from '@l3-lib/ui-core/dist/Button'
import AdditionalFilters from './AdditionalFilters'

const Filter = ({ filter }: any) => {
  const [date, setDate] = useState<any>({})
  const [is_open, setIsOpen] = useState<boolean>(false)

  const { control, onClick } = filter

  return (
    <StyledContainer>
      <TextFieldController
        field_name='search'
        control={control}
        placeholder='Filter by resource ID'
      />
      <DatePicker
        start_date={date.startDate}
        end_date={date.endDate}
        onChange={(e: any) => {
          console.log('eee', e)
          setDate(e)
        }}
      />
      <Button kind={Button.kinds.SECONDARY}>Method</Button>
      <Button kind={Button.kinds.SECONDARY}>API endpoints</Button>
      <StyledAdditionalFilterContainer>
        <Button kind={Button.kinds.SECONDARY} onClick={() => setIsOpen(true)}>
          More...
        </Button>
        {is_open && <AdditionalFilters onClose={() => setIsOpen(false)} />}
      </StyledAdditionalFilterContainer>
    </StyledContainer>
  )
}

export default Filter

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 272px 125px 105px 145px 145px;
  grid-column-gap: 15.5px;
`

const StyledAdditionalFilterContainer = styled.div`
  position: relative;
`
