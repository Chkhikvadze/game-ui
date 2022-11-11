import React from 'react'

// import withRenderModal from 'hocs/withRenderModal'
import Button from 'oldComponents/atoms/Button'
import Typography from 'oldComponents/atoms/Typography'
import Modal from 'oldComponents/molecules/Modal'

type WarningModalProps = {
  data: {message: string},
  closeModal: () => void,
}

const WarningModal = ({data, closeModal}: WarningModalProps) => (
  <Modal
	header="Oops"
	footer={(
	  <Button color="primary" onClick={closeModal}>
		I got it
	  </Button>
	)}
  >
	<Typography variant="label">{data.message}</Typography>
  </Modal>
)

export default WarningModal  //withRenderModal('warning-modal')(WarningModal)
