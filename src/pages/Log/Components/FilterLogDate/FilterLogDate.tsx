import styled from 'styled-components'

import Toggle from '@l3-lib/ui-core/dist/Toggle'
import Checkbox from '@l3-lib/ui-core/dist/Checkbox'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import TextField from '@l3-lib/ui-core/dist/TextField'
import Button from '@l3-lib/ui-core/dist/Button'
import DatePicker from 'components/DatePicker'
import outsideClick from 'helpers/outsideClick'
import React, { useRef, useState } from 'react'

const FilterLogDate = ({ onClose, start_date, end_date, onChange }: any) => {
  const [date, setDate] = useState<any>(false)
  const [is_open, setIsOpen] = React.useState(false)
  const ref = useRef(null)

  outsideClick(ref, () => {
    if (is_open) setIsOpen(false)
  })
  return (
    <>
      <StyledContainer ref={ref}>
        <DatePicker
          kind='secondary'
          date={date.startDate}
          endDate={date.endDate}
          range
          data-testid='date-picker'
          onPickDate={(d: any) => setDate(d)}
        />
      </StyledContainer>
    </>
  )
}

export default FilterLogDate

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  position: absolute;
  width: 368px;
  height: 418px;
  left: 210px;
  top: 50px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  flex: none;
  order: 3;
  flex-grow: 0;
  z-index: 3;
`
