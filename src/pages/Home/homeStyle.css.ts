import styled from 'styled-components'
import { StyledInnerWrapper } from 'styles/globalStyle.css'

const StyledSectionTitle = styled.h2`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #ffffff;
`

const StyledInnerWrapperEdit = styled(StyledInnerWrapper)`
  gap: 40px;
`

const StyledHeaderGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 19.5px;
`

const StyledFilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  margin-left: 8px;
  &::first-child {
    margin-right: 10px;
  }
  div {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: #ffffff;
  }
`

const StyledInnerGroup = styled.div`
  display: grid;
  grid-template-columns: minmax(330px, 1fr) minmax(330px, 1fr) minmax(330px, 1fr);
  gap: 16px;
  margin-top: 27px;
`

export {
  StyledSectionTitle,
  StyledInnerWrapperEdit,
  StyledHeaderGroup,
  StyledFilterGroup,
  StyledInnerGroup,
}
