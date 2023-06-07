import React from 'react'
import styled from 'styled-components'
//eslint-disable-next-line
import PropTypes from 'prop-types'
import withRenderModal from 'hocs/withRenderModal'
import Button from '@l3-lib/ui-core/dist/Button'
import Modal from '@l3-lib/ui-core/dist/Modal'
import ModalFooter from '@l3-lib/ui-core/dist/ModalFooter'
import Typography from '@l3-lib/ui-core/dist/Typography'

import { useTranslation } from 'react-i18next'

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
    <StyledDeleteConfirmationModal
      onClose={closeModal}
      show
      backgroundColor='dark'
      hideCloseButton={true}
      title={label}
    >
      <StyledModalFooter>
        <StyledActionsContainer>
          <Button onClick={closeModal} kind={Button.kinds.TERTIARY} size={Button.sizes.LARGE}>
            <Typography value='Cancel' type={Typography.types.LABEL} size={Typography.sizes.md} />
          </Button>

          <Button onClick={deleteItem} kind={Button.kinds.PRIMARY} size={Button.sizes.LARGE}>
            <StyledLabelTypography
              value='Confirm'
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
            />
          </Button>
        </StyledActionsContainer>
      </StyledModalFooter>
    </StyledDeleteConfirmationModal>
  )
}

DeleteConfirmationModal.propTypes = {
  openModal: PropTypes.func,
  data: PropTypes.object,
  closeModal: PropTypes.func,
}

export default withRenderModal('delete-confirmation-modal')(DeleteConfirmationModal)

const StyledDeleteConfirmationModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  padding: 12px;
  width: fit-content;
  height: fit-content;
`
export const StyledModalFooter = styled(ModalFooter)`
  display: grid;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
`
const StyledActionsContainer = styled.div`
  display: flex;
  position: relative;
  justify-items: flex-end;
  gap: 16px;
`
const StyledLabelTypography = styled(Typography)`
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
`
