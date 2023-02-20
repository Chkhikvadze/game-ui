import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { useDeleteUserService } from 'services'
import withRenderModal from 'hocs/withRenderModal'
import useSnackbar from 'hooks/useSnackbar'
import Button from 'oldComponents/atoms/Button'
import Label from 'oldComponents/atoms/Label'
import Typography from 'oldComponents/atoms/Typography'
import Modal from 'oldComponents/molecules/Modal'

import { useTranslation } from 'react-i18next'

const StyledActionsButton = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 6px;
  button {
    width: 80px;
  }
`

type DeleteUserConfirmationModalProps = {
  data: { id: string; refetchUsers?: any; page?: string }
  closeModal: () => void
}

const DeleteUserConfirmationModal = ({ data, closeModal }: DeleteUserConfirmationModalProps) => {
  const { setSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const [deleteUser] = useDeleteUserService({
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
          <Button color='primary' onClick={closeModal}>
            {t('cancel')}
          </Button>
          <Button
            color='danger'
            onClick={async () => {
              const { success } = await deleteUser(data?.id)
              if (success) {
                if (data.page === 'user-page') {
                  navigate('/admin/users')
                }
                if (data.refetchUsers) await data.refetchUsers()
                setSnackbar({ variant: 'success', message: t('user-successfully-deleted') })
              } else {
                setSnackbar({ variant: 'error', message: t('user-delete-failed') })
              }
            }}
          >
            {t('yes')}
          </Button>
        </StyledActionsButton>
      }
    >
      <Typography variant='h3'>{t('deleteUser')}</Typography>

      <Label mt={16} weight={400} color='black'>
        {t('are-you-sure-you-want-to-delete-the-user?')}
      </Label>
    </Modal>
  )
}

DeleteUserConfirmationModal.propTypes = {
  openModal: PropTypes.func,
  data: PropTypes.object,
  closeModal: PropTypes.func,
}

export default withRenderModal('delete-user-confirmation')(DeleteUserConfirmationModal)
