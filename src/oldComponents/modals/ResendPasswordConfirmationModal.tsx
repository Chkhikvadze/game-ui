import React from 'react'
import styled from 'styled-components'
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types'

import { useResendPasswordService } from 'services'
// import withRenderModal from 'hocs/withRenderModal'
import useSnackbar from 'hooks/useSnackbar'
import Button from 'oldComponents/atoms/Button'
import Label from 'oldComponents/atoms/Label'
import Typography from 'oldComponents/atoms/Typography'
import Modal from 'oldComponents/molecules/Modal'

import { useTranslation } from 'react-i18next'
import { T } from 'lodash/fp'

const StyledActionsButton = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 6px;
  button {
    width: 80px;
  }
`

type ResendPasswordConfirmationModalProps = {
  data: any
  closeModal: () => void
}

const ResendPasswordConfirmationModal = ({
  data,
  closeModal,
}: ResendPasswordConfirmationModalProps) => {
  const { setSnackbar } = useSnackbar()
  const [resendPassword] = useResendPasswordService({
    id: data.id,
    onCompleted: () => {
      closeModal()
    },
  })

  const { t } = useTranslation()

  return (
    <Modal
      close={closeModal}
      footer={
        <StyledActionsButton>
          <Button color="primary" onClick={closeModal}>
            {t('cancel')}
          </Button>
          <Button
            color="danger"
            onClick={async () => {
              const { success } = await resendPassword(data?.id)
              if (success) {
                setSnackbar({ variant: 'success', message: t('resend-password-successfully-sent') })
              } else {
                setSnackbar({ variant: 'error', message: t('resend-password-failed') })
              }
            }}
          >
            {t('yes')}
          </Button>
        </StyledActionsButton>
      }
    >
      <Typography variant="h3">{t('resend-password')}</Typography>

      <Label mt={16} weight={400} color="black">
        {t('Are-you-sure-you-want-to-resend-the-password')}
      </Label>
    </Modal>
  )
}

ResendPasswordConfirmationModal.propTypes = {
  openModal: PropTypes.func,
  data: PropTypes.object,
  closeModal: PropTypes.func,
}

export default ResendPasswordConfirmationModal // withRenderModal('resend-password-confirmation')()
