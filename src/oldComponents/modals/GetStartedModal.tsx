import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { useModal } from 'hooks'
import withRenderModal from 'hocs/withRenderModal'
import Button from 'oldComponents/atoms/Button'
import Modal from 'oldComponents/molecules/Modal'

import { useTranslation } from 'react-i18next'

const StyledIframe = styled.iframe`
  height: 362px;
  width: 642px;
  margin-top: -16px;
  margin-left: -30px;
`

type GetStartModalProps = {
  closeModal: () => void
  data: {
    existingUser?: boolean
    header: string
    url: string
    newUser?: boolean
  }
}

const GetStartedModal = ({ data, closeModal }: GetStartModalProps) => {
  const { openModal } = useModal()

  const askForTheDemo = () => {
    // if (data.existingUser) { openModal({ name: 'book-demo-modal' }) }
    openModal({ name: 'book-demo-modal' })
    closeModal()
  }

  const { t } = useTranslation()

  return (
    <Modal
      close={closeModal}
      header={data.header}
      footer={
        data.newUser === true ? (
          <Button color='primary' onClick={closeModal}>
            {t('skip')}
          </Button>
        ) : (
          <Button color='primary' onClick={askForTheDemo}>
            {t('ask-for-a-demo')}
          </Button>
        )
      }
    >
      <StyledIframe
        width='100%'
        title={data.header}
        height='100%'
        src={data.url}
        frameBorder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        className='iframe-popup'
      />
    </Modal>
  )
}

GetStartedModal.propTypes = {
  data: PropTypes.object,
  closeModal: PropTypes.func,
}

export default withRenderModal('video-modal')(GetStartedModal)
