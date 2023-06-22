import ReactDOMServer from 'react-dom/server'
import styled from 'styled-components'

import Bold from '@l3-lib/ui-core/dist/icons/Bold'
import Italic from '@l3-lib/ui-core/dist/icons/Italic'
import Underline from '@l3-lib/ui-core/dist/icons/Underline'
import BulletList from '@l3-lib/ui-core/dist/icons/BulletList'
import Numbers from '@l3-lib/ui-core/dist/icons/Numbers'
// import Image from '@l3-lib/ui-core/dist/icons/Image'

import left from '../assets/left.png'
import right from '../assets/right.png'
import center from '../assets/center.png'

const StyledIconWrapper = styled.div`
  color: #fff !important;
  height: 30px;
  width: 30px;
`
const StyledIconImg = styled.img`
  height: 100%;
  width: 100%;
`

export const boldIcon = ReactDOMServer.renderToStaticMarkup(
  <StyledIconWrapper>
    <Bold />
  </StyledIconWrapper>,
)
export const italicIcon = ReactDOMServer.renderToStaticMarkup(
  <StyledIconWrapper>
    <Italic />
  </StyledIconWrapper>,
)
export const underlineIcon = ReactDOMServer.renderToStaticMarkup(
  <StyledIconWrapper>
    <Underline />
  </StyledIconWrapper>,
)
export const bulletIcon = ReactDOMServer.renderToStaticMarkup(
  <StyledIconWrapper>
    <BulletList />
  </StyledIconWrapper>,
)
export const orderIcon = ReactDOMServer.renderToStaticMarkup(
  <StyledIconWrapper>
    <Numbers />
  </StyledIconWrapper>,
)
export const alignLeftIcon = ReactDOMServer.renderToStaticMarkup(
  <StyledIconWrapper>
    <StyledIconImg src={left} />
  </StyledIconWrapper>,
)
export const alignCenterIcon = ReactDOMServer.renderToStaticMarkup(
  <StyledIconWrapper>
    <StyledIconImg src={center} />
  </StyledIconWrapper>,
)
export const alignRightIcon = ReactDOMServer.renderToStaticMarkup(
  <StyledIconWrapper>
    <StyledIconImg src={right} />
  </StyledIconWrapper>,
)
