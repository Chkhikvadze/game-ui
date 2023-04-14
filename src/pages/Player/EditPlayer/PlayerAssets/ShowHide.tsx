import { ReactNode, useState } from 'react'
import styled, { css } from 'styled-components'

import Heading from '@l3-lib/ui-core/dist/Heading'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import Tags from '@l3-lib/ui-core/dist/Tags'
import LinearProgressBar from '@l3-lib/ui-core/dist/LinearProgressBar'
import Typography from '@l3-lib/ui-core/dist/Typography'

import NavigationChevronDown from '@l3-lib/ui-core/dist/icons/NavigationChevronDown'
import NavigationChevronUp from '@l3-lib/ui-core/dist/icons/NavigationChevronUp'

type ShowHideProps = {
  children: ReactNode
  title: string
  isOpen?: boolean
  level: string
  joinDate: string
  logo: string
}

const ShowHide = ({ children, title, isOpen = false, level, joinDate, logo }: ShowHideProps) => {
  const [show, setShow] = useState(isOpen)

  return (
    <StyledShowHide show={show}>
      <StyledHeader>
        <StyledTitleWrapper>
          <Avatar size={Avatar.sizes.SMALL} src={logo} type={Avatar.types.IMG} rectangle />
          <Heading type={Heading.types.h1} value={title} customColor={'#FFF'} size='medium' />
        </StyledTitleWrapper>
        <IconButton
          icon={show ? NavigationChevronUp : NavigationChevronDown}
          kind={IconButton.kinds.TERTIARY}
          onClick={() => {
            setShow(!show)
          }}
        />
      </StyledHeader>

      <StyledHiddenContent show={show}>
        <StyledInfoDiv>
          <StyledColumnLeft>
            <Tags label={level} size='small' readOnly color={'gradient_yellow'} />
            <StyledProgressBarWrapper>
              <Typography
                value='2,406/21,000'
                type={Typography.types.LABEL}
                size={Typography.sizes.xss}
                customColor={' rgba(255, 255, 255, 0.8)'}
              />
              <LinearProgressBar
                className='linear-progress-bar_small-wrapper'
                value={71}
                size={LinearProgressBar.sizes.LARGE}
              />
            </StyledProgressBarWrapper>
          </StyledColumnLeft>
          <StyledColumnRight>
            <Typography
              value='Join date'
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
              customColor={'#FFF'}
            />
            <Typography
              value={joinDate}
              type={Typography.types.LABEL}
              size={Typography.sizes.xss}
              customColor={' rgba(255, 255, 255, 0.8)'}
            />
          </StyledColumnRight>
        </StyledInfoDiv>
        {children}
      </StyledHiddenContent>
    </StyledShowHide>
  )
}

export default ShowHide

const StyledShowHide = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 16px;

  width: 995px;
  max-height: 85px;

  background: rgba(0, 0, 0, 0.1);
  border-radius: 6px;

  transition: max-height 0.3s;
  ${p =>
    p.show &&
    css`
      max-height: 2000px;

      /* margin-top: 20px; */
    `};
`
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const StyledTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 8px;
`

const StyledHiddenContent = styled.div<{ show: boolean }>`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;

  max-height: 0px;
  opacity: 0;

  transition: max-height 0.3s, opacity 0.3s;
  ${p =>
    p.show &&
    css`
      max-height: 2000px;
      opacity: 1;
    `};
`
const StyledInfoDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`
const StyledColumnLeft = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  gap: 8px;
`
const StyledColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-end;
  gap: 8px;

  padding-right: 20px;
`
const StyledProgressBarWrapper = styled.div`
  width: 100%;
`
