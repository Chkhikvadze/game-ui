import { useState } from 'react'
import DislikeButtonSvg from './assets/DislikeButtonSvg'
import styled from 'styled-components'

const DislikeButton = () => {
  const [count, set_count] = useState(0)

  return (
    <StyledGroup
      isCount={count > 0}
      onClick={() => set_count(prevCount => (prevCount > 0 ? prevCount - 1 : prevCount + 1))}
    >
      <DislikeButtonSvg />
      {count > 0 && <StyledCountTxt>{count}</StyledCountTxt>}
    </StyledGroup>
  )
}

export default DislikeButton

const StyledCountTxt = styled.span`
  font-style: normal;
  font-weight: 450;
  font-size: 12px;
  line-height: 24px;
  // color: rgba(255, 255, 255, 0.8);
`

const StyledGroup = styled.div<{ isCount?: boolean }>`
  display: flex;
  align-items: center;
  min-width: 45px;
  justify-content: center;
  min-height: 25px;
  cursor: pointer;
  gap: 2px;
  ${({ isCount }) =>
    isCount &&
    `
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.1),
    inset 0px 1px 1px rgba(255, 255, 255, 0.25);
  -webkit-backdrop-filter: blur(100px);
  backdrop-filter: blur(100px);
  border-radius: 100px;
  `}
`
