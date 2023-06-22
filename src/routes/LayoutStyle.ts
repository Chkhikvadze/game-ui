import styled from 'styled-components'

const StyledAppContainer = styled.div`
  background: linear-gradient(265.15deg, #4ca6f8 -32.37%, #2152f3 100%);
`

const StyledMainLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  padding-top: 18px;
`
const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 72px;
  padding: 0 32px;
  grid-row: 1;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  background: linear-gradient(265.15deg, #4ca6f8 -32.37%, #2152f3 100%);
`

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  grid-row: 3;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 72px;
  padding: 0 32px;
  background: linear-gradient(265.15deg, #4ca6f8 -32.37%, #2152f3 100%);
`

const StyledMainContainer = styled.main`
  display: grid;
  justify-content: center;
  grid-row: 2;
  max-width: 1440px;
  margin: 0 auto;
  margin: 80px 0;
`

const StyledInnerWrapper = styled.div``

export {
  StyledAppContainer,
  StyledMainLayout,
  StyledHeader,
  StyledMainContainer,
  StyledInnerWrapper,
  StyledFooter,
}
