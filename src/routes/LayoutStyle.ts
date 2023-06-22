import styled from 'styled-components'

const StyledAppContainer = styled.div`
  background: linear-gradient(265.15deg, #4ca6f8 -32.37%, #2152f3 100%);
`

const StyledMainLayout = styled.div`
  margin-top: 18px;
`
const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  min-height: 72px;
  padding: 0 32px;
`

const StyledMainContainer = styled.div`
  display: grid;
  justify-content: center;
`

const StyledInnerWrapper = styled.div``

export {
  StyledAppContainer,
  StyledMainLayout,
  StyledHeader,
  StyledMainContainer,
  StyledInnerWrapper,
}
