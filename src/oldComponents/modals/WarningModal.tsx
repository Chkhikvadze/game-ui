import React from 'react'

// import withRenderModal from 'hocs/withRenderModal'
import Button from 'oldComponents/atoms/Button'
import Typography from 'oldComponents/atoms/Typography'
import Modal from 'oldComponents/molecules/Modal'

import { useTranslation } from 'react-i18next'

type WarningModalProps = {
  data: { message: string }
  closeModal: () => void
}

const WarningModal = ({ data, closeModal }: WarningModalProps) => {
  const { t } = useTranslation()

  return (
    <Modal
      header='Oops'
      footer={
        <Button color='primary' onClick={closeModal}>
          {t('i-got-it')}
        </Button>
      }
    >
      <Typography variant='label'>{data.message}</Typography>
    </Modal>
  )
}

export default WarningModal //withRenderModal('warning-modal')(WarningModal)
