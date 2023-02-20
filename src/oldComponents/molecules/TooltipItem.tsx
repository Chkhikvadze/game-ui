import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
// import ReactTooltip from 'react-tooltip'
import Exclamation from 'assets/old/images/exclamation.svg'
import quesMark from 'assets/old/images/ques-mark.svg'

const StyledImage = styled.img`
  margin-left: 4px;
  width: fit-content;
  height: fit-content;
  max-width: 24px;
  max-height: 24px;
`

export type TooltipItemType = {
  id?: string
  icon?: string
  content: string
  className?: string
}

const ToolTipItem = ({ id, className, icon, content }: TooltipItemType) => (
  <>
    <StyledImage
      data-tip
      data-for={`Tooltip-${id}`}
      width={24}
      src={icon ? quesMark : Exclamation}
      className={className}
      alt='hint'
    />
    {/* <ReactTooltip id={`Tooltip-${id}`} place={'top'} effect="solid">
      {content}
    </ReactTooltip> */}
  </>
)
//todo:jelo PropTypes replace
// ToolTipItem.propTypes = {
//   id: PropTypes.string,
//   icon: PropTypes.string,
//   content: PropTypes.any,
//   placement: PropTypes.string,
// }

export default ToolTipItem
