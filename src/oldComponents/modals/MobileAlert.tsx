import React from 'react'

// import withRenderModal from 'hocs/withRenderModal'
import Button from 'oldComponents/atoms/Button'
import Typography from 'oldComponents/atoms/Typography'
import Modal from 'oldComponents/molecules/Modal'

import { useTranslation } from 'react-i18next'

type MobileAlertProps = { closeModal: () => void }

const MobileAlert = ({ closeModal }: any) => {
  const { t } = useTranslation()

  return (
    <Modal
      header="Mobile Detected"
      hideClose
      footer={
        <Button color="danger" onClick={closeModal}>
          {t('continue')}
        </Button>
      }
    >
      <Typography variant="label">
        {t('please-note-this-api-is-designed-to-run-on-a-larger-screen')}
      </Typography>
      <Typography variant="label">{t('strongly-recommend')}</Typography>
    </Modal>
  )
}

export default MobileAlert //withRenderModal('mobile-alert')()
