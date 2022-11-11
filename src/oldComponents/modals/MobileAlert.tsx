import React from 'react'

// import withRenderModal from 'hocs/withRenderModal'
import Button from 'oldComponents/atoms/Button'
import Typography from 'oldComponents/atoms/Typography'
import Modal from 'oldComponents/molecules/Modal'

type MobileAlertProps = {closeModal: () => void}

const MobileAlert = ({closeModal}: any) => (
  <Modal
	header="Mobile Detected"
	hideClose
	footer={(
	  <Button color="danger" onClick={closeModal}>
		Continue
	  </Button>
	)}
  >
	<Typography variant="label">
	  Please note this app is designed to run on a larger screen.
	</Typography>
	<Typography variant="label">
	  We strongly recommend you access this with a laptop or desktop for
	  a superior experience. Thanks!
	</Typography>
  </Modal>
)

export default MobileAlert //withRenderModal('mobile-alert')()
