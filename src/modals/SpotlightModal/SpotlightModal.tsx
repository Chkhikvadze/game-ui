import { useModal } from 'hooks'

import withRenderModal from 'hocs/withRenderModal'

import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'

import FullScreenModal from 'components/FullScreenModal'
import CommandMenu from 'components/CommandMenu/CommandMenu'

import { StyledModalWrapper, StyledModalBody, StyledCloseBtn, StyledHeader } from '../modalStyle'
import './spotlightStyle.css'

const SpotlightModal = () => {
  const { closeModal } = useModal()

  return (
    <FullScreenModal dark_layer>
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
    </FullScreenModal>
  )
}

export default withRenderModal('spotlight-modal')(SpotlightModal)
