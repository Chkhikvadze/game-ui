import React from 'react'
import styled from 'styled-components'
//eslint-disable-next-line
import PropTypes from 'prop-types'
import withRenderModal from 'hocs/withRenderModal'
import Button from 'oldComponents/atoms/Button'
import Label from 'oldComponents/atoms/Label'
import Modal from 'oldComponents/molecules/Modal'
import Typography from 'oldComponents/atoms/Typography'

import { useTranslation } from 'react-i18next'

const StyledActionsButton = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 6px;

  button {
    width: 80px;
  }
`

type DeleteConfirmationModalProps = {
  data: {
    deleteItem: () => void
    closeModal: () => void
    label: string
    title: string
  }
}

const DeleteConfirmationModal = ({ data }: DeleteConfirmationModalProps) => {
  const { closeModal, deleteItem, label, title } = data

  const { t } = useTranslation()

  return (
    <Modal
      close={closeModal}
      footer={
        <StyledActionsButton>
          <Button color="primary" onClick={closeModal}>
            {t('cancel')}
          </Button>
          <Button color="danger" onClick={deleteItem}>
            {t('yes')}
          </Button>
        </StyledActionsButton>
      }
    >
      <Typography variant="h3">{title}</Typography>

      <Label mt={16} weight={400} color="black">
        {label}
      </Label>
    </Modal>
  )
}

DeleteConfirmationModal.propTypes = {
  openModal: PropTypes.func,
  data: PropTypes.object,
  closeModal: PropTypes.func,
}

export default withRenderModal('delete-confirmation-modal')(DeleteConfirmationModal)
