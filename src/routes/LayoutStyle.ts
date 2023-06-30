import styled from 'styled-components'

const StyledAppContainer = styled.div`
  background: linear-gradient(265.15deg, rgba(76, 166, 248, 1) -32.37%, rgba(33, 82, 243, 1) 100%);
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`

const StyledMainLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  // min-height: 100vh;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
`
const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 72px;
  padding: 0 32px;
  grid-row: 1;
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 102030;
`

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  grid-row: 3;
  min-height: 72px;
  position: sticky;
  width: 100%;
  bottom: 0;
  padding: 0 32px;
  align-items: center;
`

const StyledMainContainer = styled.main<{ expand?: boolean }>`
  margin: 0 auto;
  max-width: 1440px;
  width: 100%;
  padding: 0 165px;
  grid-auto-rows: max-content;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  ${({ expand }) =>
    expand &&
    `
  max-width: unset;
  padding: 0 32px;
  `}
  @media(max-width: 1440px) {
    padding: 0 75px;
  }
`

const StyledInnerWrapper = styled.div``

const StyledAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: rgba(255, 255, 255, 0.2);
  }
`

const StyledGroupContainer = styled.div<{ mb?: string; mt?: string }>`
  margin-bottom: ${p => p.mb && p.mb}px;
  margin-top: ${p => p.mt && p.mt}px;
`

const StyledTableValue = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  color: rgba(255, 255, 255, 1);
`

const StyledTableHeaderGroup = styled.div``

const StyledTableActionBtn = styled.button`
  all: unset;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: rgba(255, 255, 255, 1);
  padding: 10px 26px;
`
const StyledLogoContainer = styled.div`
  width: 48px;
  height: 48px;
`

const StyledNavigationColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

export {
  StyledAppContainer,
  StyledMainLayout,
  StyledHeader,
  StyledMainContainer,
  StyledInnerWrapper,
  StyledFooter,
  StyledAvatarContainer,
  StyledGroupContainer,
  StyledTableValue,
  StyledTableHeaderGroup,
  StyledTableActionBtn,
  StyledLogoContainer,
  StyledNavigationColumn,
}
