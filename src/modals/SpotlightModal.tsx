import withRenderModal from 'hocs/withRenderModal'

import FullScreenModal from 'components/FullScreenModal'

import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'
import Search from '@l3-lib/ui-core/dist/Search'

import { StyledModalWrapper, StyledModalBody, StyledCloseBtn, StyledHeader } from './modalStyle'
import styled from 'styled-components'
import { useModal } from 'hooks'

const SpotlightModal = () => {
  const { closeModal, openModal } = useModal()

  const onHandleClickOption = (modal_name: string) => {
    console.log('test')
    openModal({ name: modal_name })
  }

  return (
    <FullScreenModal dark_layer>
      <StyledModalWrapper className='modal_wrapper'>
        <StyledHeader>
          <StyledCloseBtn onClick={() => closeModal('spotlight-modal')}>
            <CloseIconSvg color='rgba(255, 255, 255, 0.8);' />
          </StyledCloseBtn>
        </StyledHeader>
        <StyledModalBody resetPosition>
          <StyledInnerBodyWrapper>
            <Search />
            <StyledSugestContainer>
              <StyledTypography onClick={() => onHandleClickOption('create-game-modal')}>
                Create game
              </StyledTypography>
              <StyledTypography>Create Collection</StyledTypography>
              <StyledTypography>Create Contract</StyledTypography>
            </StyledSugestContainer>
          </StyledInnerBodyWrapper>
        </StyledModalBody>
      </StyledModalWrapper>
    </FullScreenModal>
  )
}

export default withRenderModal('spotlight-modal')(SpotlightModal)

const StyledSugestContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const StyledTypography = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
`

const StyledInnerBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
`
