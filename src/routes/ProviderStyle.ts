import styled from 'styled-components'

const StyledAppContainer = styled.div`
  background-image: url(${(p) => p.theme.body.backgroundImage});
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: auto 1fr;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  border: 1px solid #000000;
  backdrop-filter: blur(100px);
`

const StyledMainLayout = styled.div<{ showMenu?: boolean }>`
  display: grid;
  grid-template-columns: ${(p) => (p.showMenu ? 'auto' : 'minmax(397px, auto)')} 1fr;
  // gap: ${(p) => (p.showMenu ? 0 : '30px')};
  // margin-top: 31px;
`

const StyledMainSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: auto;
  max-height: 100vh;
  padding: 20px;
  overflow: auto;
  /* padding-right: 0; */
`

const StyledMainWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`

const StyledAdminLayoutEdit = styled(StyledMainLayout)`
  grid-template-columns: 1fr;
  gap: unset;
  overflow: scroll;
`

export {
  StyledAppContainer,
  StyledMainLayout,
  StyledMainSection,
  StyledMainWrapper,
  StyledAdminLayoutEdit,
}
