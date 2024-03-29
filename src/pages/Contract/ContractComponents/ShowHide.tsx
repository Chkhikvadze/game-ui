import { ReactNode, useState } from 'react'
import styled, { css } from 'styled-components'

import Heading from '@l3-lib/ui-core/dist/Heading'
import IconButton from '@l3-lib/ui-core/dist/IconButton'

import NavigationChevronDown from '@l3-lib/ui-core/dist/icons/NavigationChevronDown'
import NavigationChevronUp from '@l3-lib/ui-core/dist/icons/NavigationChevronUp'
import ScrollContainer from 'react-indiana-drag-scroll'

type ShowHideProps = {
  children: ReactNode
  title: string
  isOpen?: boolean
}

const ShowHide = ({ children, title, isOpen = false }: ShowHideProps) => {
  const [show, setShow] = useState(isOpen)

  return (
    <StyledHiddenSection>
      <StyledHeaderWrapper>
        <Heading value={title} type={Heading.types.h1} size='medium' customColor={'#FFF'} />
        <IconButton
          icon={show ? NavigationChevronUp : NavigationChevronDown}
          kind={IconButton.kinds.TERTIARY}
          onClick={() => {
            setShow(!show)
          }}
        />
      </StyledHeaderWrapper>
      <StyledHiddenContent show={show}>{children}</StyledHiddenContent>
    </StyledHiddenSection>
  )
}

export default ShowHide

const StyledHiddenSection = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 610px;
`
const StyledHiddenContent = styled.div<{ show: boolean }>`
  display: flex;
  /* flex-wrap: wrap; */
  gap: 20px;

  max-width: 1000px;
  max-height: 0px;
  opacity: 0;

  margin-top: 0px;
  transition: max-height 0.3s, margin-top 0.3s, opacity 0.3s;
  ${p =>
    p.show &&
    css`
      max-height: 10000px;
      opacity: 1;
      margin-top: 20px;
    `};
`
const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const StyledDragScroll = styled(ScrollContainer)`
  display: flex;
  gap: 16px;
  position: relative;

  width: 100%;
`
