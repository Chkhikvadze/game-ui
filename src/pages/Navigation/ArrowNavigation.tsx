import styled, { css } from 'styled-components'
import ArrowLeftSvg from './assets/ArrowLeftSvg'
import ArrowRightSvg from './assets/ArrowRightSvg'
import { useNavigate } from 'react-router-dom'

import IconButton from '@l3-lib/ui-core/dist/IconButton'

import NavigationChevronLeft from '@l3-lib/ui-core/dist/icons/NavigationChevronLeft'
import NavigationChevronRight from '@l3-lib/ui-core/dist/icons/NavigationChevronRight'

type ArrowNavigationProps = {
  closeModal?: () => void
}

const ArrowNavigation = ({ closeModal }: ArrowNavigationProps) => {
  const navigate = useNavigate()

  const handleLeftNavigation = () => {
    if (closeModal) {
      closeModal()
    } else {
      navigate(-1)
    }
  }

  const handleRightNavigation = () => {
    navigate(+1)
  }

  return (
    <StyledColumnContainer>
      <IconButton
        size={IconButton.sizes.SMALL}
        icon={() => <NavigationChevronLeft size='16' />}
        kind={IconButton.kinds.TERTIARY}
        onClick={handleLeftNavigation}
      />

      <StyledButtonWrapper isDisabled={closeModal ? true : false}>
        <IconButton
          size={IconButton.sizes.SMALL}
          icon={() => <NavigationChevronRight size='16' />}
          kind={IconButton.kinds.TERTIARY}
          onClick={handleRightNavigation}
        />
      </StyledButtonWrapper>
    </StyledColumnContainer>
  )
}

export default ArrowNavigation

const StyledColumnContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;
`
const StyledButtonWrapper = styled.div<{ isDisabled: boolean }>`
  ${props =>
    props.isDisabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`
