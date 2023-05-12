import { ReactNode, useState } from 'react'

import styled, { css } from 'styled-components'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'

import Close from '@l3-lib/ui-core/dist/icons/Close'
import Connect from '@l3-lib/ui-core/dist/icons/Connect'
import ScrollContainer from 'react-indiana-drag-scroll'

type GetStartedContainerProps = {
  children: ReactNode
  bottomBorder?: boolean
}

const GetStartedContainer = ({ children, bottomBorder = false }: GetStartedContainerProps) => {
  const [show, setShow] = useState(true)

  return (
    <StyledGetStarted show={show} bottomBorder={bottomBorder}>
      <StyledHeader>
        <StyledColumn>
          <StyledCloseButton onClick={() => setShow(false)}>
            <Close />
          </StyledCloseButton>
          <Heading type={Heading.types.h1} value='Get Started' size='medium' customColor={'#fff'} />
        </StyledColumn>
        <StyledColumn>
          <Typography
            value='Learn'
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
            customColor={'rgba(255, 255, 255, 0.6)'}
          />
          <StyledIconWrapper>
            <Connect />
          </StyledIconWrapper>
        </StyledColumn>
      </StyledHeader>

      <StyledDragScroll>{children}</StyledDragScroll>
    </StyledGetStarted>
  )
}

export default GetStartedContainer

const StyledGetStarted = styled.div<{ show: boolean; bottomBorder: boolean }>`
  max-width: 1000px;
  min-width: 500px;

  display: none;
  ${p =>
    p.show &&
    css`
      display: block;
    `};
  ${p =>
    p.bottomBorder &&
    css`
      padding-bottom: 32px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    `};
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  margin-bottom: 5px;
`

const StyledColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const StyledIconWrapper = styled.div`
  color: rgba(255, 255, 255, 0.6);
  width: 10px;
`
const StyledDragScroll = styled(ScrollContainer)`
  display: flex;
  gap: 16px;
  position: relative;

  width: 100%;
`
const StyledCloseButton = styled.div`
  cursor: pointer;
`
