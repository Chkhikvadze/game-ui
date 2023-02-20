import styled from 'styled-components'
import { Link } from 'react-router-dom'
import IconButton from 'oldComponents/atoms/IconButton'
import Typography from 'oldComponents/atoms/Typography'
// import IconButton from 'bf-ui/dist/IconButton'
// import Typography from 'bf-ui/dist/Typography'

export const StyledRoot = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  position: relative;
`
export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
  background-color: #4caf50;
  width: 105px;
  padding: 6px 10px;
  height: fit-content;
`

export const StyledIconButton = styled(IconButton)<{ ml?: number }>`
  padding: 0px;
  grid-gap: 0px;
  ${props => props.ml && `margin-left: ${props.ml}px;`};
`

export const StyledIconButtonLabel = styled(Typography)`
  font-size: 0.625rem !important;
  color: black !important;
`

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: center;
`
