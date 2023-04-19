import React, { useState } from 'react'
import styled from 'styled-components'
import { FormikProvider } from 'formik'
import TextField from 'oldComponents/molecules/TextField'
import TextAreaField from 'oldComponents/molecules/TeaxtAreaField'
import DatePickerField from 'oldComponents/atoms/DatePickerField'
// import useFilter from './useFilter'
import TextFieldController from 'components'
import DatePicker from 'components/DatePicker'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'
import AdditionalFilters from './AdditionalFilters'
import CreateLogModal from '../CreateLogModal/CreateLogModal'
import { useModal } from 'hooks'
import CreateEndPoint from './CreateEndpoint/CreateEndPoint'
import CreateLogMethod from './CreateLogMethod/CreateLogMethod'
import FilterLogDate from './FilterLogDate/FilterLogDate'

const Filter = ({ filter }: any) => {
  const [date, setDate] = useState<any>(false)
  const [is_open, setIsOpen] = useState<boolean>(false)
  const [method, setMethod] = useState<boolean>(false)

  const { control, onClick } = filter

  const { openModal } = useModal()

  const openCreateLogModal = () => {
    openModal({
      name: 'add-log-modal',
    })
  }

  return (
    <StyledContainer>
      <TextFieldController
        field_name='search'
        control={control}
        placeholder='Filter by resource ID'
      />
      <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} onClick={() => setDate(true)}>
        <Typography
          value='Date'
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='#FFFFFF'
        />
      </Button>
      <Button
        kind={Button.kinds.TERTIARY}
        size={Button.sizes.SMALL}
        onClick={() => setMethod(true)}
      >
        <Typography
          value='Method'
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='#FFFFFF'
        />
      </Button>
      <Button
        kind={Button.kinds.TERTIARY}
        size={Button.sizes.SMALL}
        onClick={() => setIsOpen(true)}
      >
        <Typography
          value='API endpoints'
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='#FFFFFF'
        />
      </Button>
      <StyledAdditionalFilterContainer>
        <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} onClick={openCreateLogModal}>
          <Typography
            value='More...'
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
            customColor='#FFFFFF'
          />
        </Button>
      </StyledAdditionalFilterContainer>
      <>
        {is_open ? (
          <StyledEndPointContainer>
            <CreateEndPoint onClose={() => setIsOpen(false)} />
          </StyledEndPointContainer>
        ) : method ? (
          <StyledMethodContainer>
            <CreateLogMethod onClose={() => setMethod(false)} />
          </StyledMethodContainer>
        ) : null}
      </>
      {date && <FilterLogDate onClose={() => setDate(false)} />}
      <CreateLogModal />
    </StyledContainer>
  )
}

export default Filter

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 272px 125px 105px 145px 145px;
  grid-column-gap: 15.5px;
  margin-top: 25px;
`

const StyledAdditionalFilterContainer = styled.div`
  position: relative;
`
const StyledEndPointContainer = styled.div`
  display: flex;
  position: relative;
  bottom: 150px;
  left: 30px;
`
const StyledMethodContainer = styled.div`
  display: flex;
  position: relative;
  left: 450px;
  top: 30px;
`
