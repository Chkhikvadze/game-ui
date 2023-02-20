import styled from 'styled-components'

const StyledAppContainer = styled.div`
  background: ${p => p.theme.body.backgroundColor};
  border: 0.5px solid #000000;
  box-shadow: ${p => p.theme.body.boxShadow};
  backdrop-filter: ${p => p.theme.body.backdropFilter};
  border-radius: 8px;
  min-height: 100vh;
  padding: 10px;
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: auto 1fr;
`

const StyledMainLayout = styled.div<{ showMenu?: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${p => (p.showMenu ? 0 : '30px')};
  margin-top: 31px;
`

const StyledMainSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  /* overflow: scroll; */
  // max-height: calc(100vh - 92px);
  height: 100%;
  padding: 20px;
`

const StyledMainWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`

const StyledAdminLayoutEdit = styled(StyledMainLayout)`
  grid-template-columns: 1fr;
  gap: unset;
  /* overflow: scroll; */
`

export {
  StyledAppContainer,
  StyledMainLayout,
  StyledMainSection,
  StyledMainWrapper,
  StyledAdminLayoutEdit,
}
