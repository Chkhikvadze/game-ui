import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { useResendPasswordService } from 'services'
// import withRenderModal from 'hocs/withRenderModal'
import useSnackbar from 'hooks/useSnackbar'
import Button from 'oldComponents/atoms/Button'
import Label from 'oldComponents/atoms/Label'
import Typography from 'oldComponents/atoms/Typography'
import Modal from 'oldComponents/molecules/Modal'

const StyledActionsButton = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 6px;
  button {
    width: 80px;
  }
`

type ResendPasswordConfirmationModalProps = {
  data: any,
  closeModal: () => void
}

const ResendPasswordConfirmationModal = ({
  data,
  closeModal,
}: ResendPasswordConfirmationModalProps) => {
  const {setSnackbar} = useSnackbar()
  const [resendPassword] = useResendPasswordService({
    id:data.id,
    onCompleted:() => {
	  closeModal()
    },
  })
  
  return (
    <Modal
	  close={closeModal}
	  footer={
        <StyledActionsButton>
		  <Button color="primary" onClick={closeModal}>
			Cancel
		  </Button>
		  <Button
            color="danger"
            onClick={async () => {
			  const {success} = await resendPassword(data?.id)
			  if (success) {
                setSnackbar({variant:'success', message:'Resend password successfully sent'})
			  } else {
                setSnackbar({variant:'error', message:'Resend password failed'})
			  }
            }}
		  >
			Yes
		  </Button>
        </StyledActionsButton>
	  }
    >
	  <Typography variant="h3">Resend password</Typography>
	  
	  <Label mt={16} weight={400} color="black">
		Are you sure you want to resend the password?
	  </Label>
    </Modal>
  )
}

ResendPasswordConfirmationModal.propTypes = {
  openModal:PropTypes.func,
  data:PropTypes.object,
  closeModal:PropTypes.func,
}

export default ResendPasswordConfirmationModal // withRenderModal('resend-password-confirmation')()
