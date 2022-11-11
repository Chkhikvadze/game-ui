import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import Button from 'oldComponents/atoms/Button'
import Modal from 'oldComponents/molecules/Modal'
import Typography from 'oldComponents/atoms/Typography'
import withRenderModal from 'hocs/withRenderModal'

const StyledModal = styled(Modal)`
  max-width: 300px;
`

type GraphqlApiErrorModalProps = {
  data: {error: any},
  closeModal: () => void,
}

const GraphqlApiErrorModal = ({data, closeModal}: GraphqlApiErrorModalProps) => {
  const navigate = useNavigate()
  
  const handleError = () => {
	navigate('/')
	closeModal()
  }
  
  return (
	<StyledModal
	  header="Oops"
	  hideClose
	  footer={(
		<Button color="primary" onClick={handleError}>
		  I got it
		</Button>
	  )}
	>
	  <Typography variant="label" weight={400}>
		{data.error.message === 'GraphQL error: You must be logged in'
		  ? 'You have been logged out from your session, please login again'
		  : data.error.message}
	  </Typography>
	</StyledModal>
  )
}

export default withRenderModal('gql-error-modal')(GraphqlApiErrorModal)
