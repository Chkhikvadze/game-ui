import styled from 'styled-components'

const StyledAppContainer = styled.div`
  background: linear-gradient(265.15deg, #4ca6f8 -32.37%, #2152f3 100%);
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
`

const StyledMainLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
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
  background: linear-gradient(265.15deg, #4ca6f8 -32.37%, #2152f3 100%);
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
  background-color: red;
  background: linear-gradient(265.15deg, #4ca6f8 -32.37%, #2152f3 100%);
`

const StyledMainContainer = styled.main<{ expand?: boolean }>`
  display: grid;
  grid-row: 2;
  margin: 0 auto;
  // margin: 20px auto;
  max-width: 1440px;
  width: 100%;
  padding: 0 165px;
  grid-auto-rows: max-content;
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
}