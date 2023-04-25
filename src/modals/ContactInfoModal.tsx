import withRenderModal from 'hocs/withRenderModal'

import { useModal } from 'hooks'

import LightModalWrapper from 'components/LightModalWrapper'

import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'

import {
  StyledCloseBtn,
  StyledHeader,
  StyledModalBody,
  StyledModalWrapper,
  StyledTypography,
  StyledModalFooter,
} from './modalStyle'
import styled from 'styled-components'

// import { StyledFormSection } from 'pages/ApiKeys/ApiKeysStyle'

const ContactInfoModal = () => {
  const { closeModal } = useModal()

  return (
    <LightModalWrapper>
      <StyledModalWrapper className='modal_wrapper'>
        <StyledHeader>
          <StyledCloseBtn onClick={() => closeModal('contact-info-modal')}>
            <CloseIconSvg color='rgba(255, 255, 255, 0.8);' />
          </StyledCloseBtn>
        </StyledHeader>
        <StyledModalBody>
          <StyledLink href='mailto: support@l3vels.xyz'>
            To switch to production, contact support@l3vels.xyz
          </StyledLink>
        </StyledModalBody>
        <StyledModalFooter />
      </StyledModalWrapper>
    </LightModalWrapper>
  )
}

export default withRenderModal('contact-info-modal')(ContactInfoModal)

const StyledLink = styled.a`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
  text-decoration: none;
`
