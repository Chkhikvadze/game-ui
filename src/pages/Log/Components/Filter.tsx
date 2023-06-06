import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { FormikProvider } from 'formik'
import TextField from '@l3-lib/ui-core/dist/TextField'

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
import outsideClick from 'helpers/outsideClick'
import useLog from 'pages/Log/useLog'

const Filter = ({ filter }: any) => {
  const [showDate, setShowDate] = useState<any>(false)
  const [showEndpoint, setShowEndpoint] = useState<boolean>(false)
  const [showMethod, setShowMethod] = useState<boolean>(false)
  const [is_open, setIsOpen] = React.useState(false)
  const ref = useRef(null as any)

  useEffect(() => {
    const checkIfClickedOutside = (e: { target: any }) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (showDate && ref.current && !ref.current.contains(e.target)) {
        setShowDate(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [showDate])

  useEffect(() => {
    const checkIfClickedOutside = (e: { target: any }) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (showMethod && ref.current && !ref.current.contains(e.target)) {
        setShowMethod(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [showMethod])

  useEffect(() => {
    const checkIfClickedOutside = (e: { target: any }) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (showEndpoint && ref.current && !ref.current.contains(e.target)) {
        setShowEndpoint(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [showEndpoint])

  const { log_list } = useLog()

  const { control, onClick } = filter

  const { openModal } = useModal()

  const openCreateLogModal = () => {
    openModal({
      name: 'add-log-modal',
    })
  }
  const [query, setQuery] = useState('')

  console.log('query', query)

  return (
    <StyledContainer>
      <TextField
        // field_name='search'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
        placeholder='Filter by resource ID'
      />
      <Button
        kind={Button.kinds.TERTIARY}
        size={Button.sizes.SMALL}
        onClick={() => setShowDate(true)}
      >
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
        onClick={() => setShowMethod(true)}
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
        onClick={() => setShowEndpoint(true)}
      >
        <Typography
          value='API endpoints'
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='#FFFFFF'
        />
      </Button>
      {/* <StyledAdditionalFilterContainer>
        <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} onClick={openCreateLogModal}>
          <Typography
            value='More...'
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
            customColor='#FFFFFF'
          />
        </Button>
      </StyledAdditionalFilterContainer> */}

      {showEndpoint && (
        <StyledEndPointContainer ref={ref}>
          <CreateEndPoint onClose={() => setShowEndpoint(false)} />
        </StyledEndPointContainer>
      )}
      {showMethod && (
        <StyledMethodContainer ref={ref}>
          <CreateLogMethod onClose={() => setShowMethod(false)} />
        </StyledMethodContainer>
      )}

      {showDate && (
        <StyledDateContainer ref={ref}>
          <FilterLogDate onClose={() => setShowDate(false)} />
        </StyledDateContainer>
      )}
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
const StyledDateContainer = styled.div``
