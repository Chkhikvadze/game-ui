import { useModal } from 'hooks'

import withRenderModal from 'hocs/withRenderModal'

import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'

import CommandMenu from 'components/CommandMenu/CommandMenu'

import { StyledModalWrapper, StyledModalBody, StyledCloseBtn, StyledHeader } from '../modalStyle'
import './spotlightStyle.css'
import Modal from '@l3-lib/ui-core/dist/Modal'
import BgWrapper from 'modals/components/BgWrapper'

const SpotlightModal = () => {
  const { closeModal } = useModal()

  return (
    <Modal fullscreen show isClean>
      <BgWrapper dark>
        <StyledModalWrapper className='modal_wrapper'>
          <StyledHeader>
            <StyledCloseBtn onClick={() => closeModal('spotlight-modal')}>
              <CloseIconSvg color='rgba(255, 255, 255, 0.8);' />
            </StyledCloseBtn>
          </StyledHeader>
          <StyledModalBody resetPosition>
            <CommandMenu />
          </StyledModalBody>
        </StyledModalWrapper>
      </BgWrapper>
    </Modal>
  )
}

export default withRenderModal('spotlight-modal')(SpotlightModal)
