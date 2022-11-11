import styled from 'styled-components'

import Button from 'oldComponents/atoms/Button'

export const StyledRoot = styled.div<{leftSide?: boolean}>`
  margin-top: 30px;
  margin-bottom: 50px;
  
  ${({leftSide}) => !leftSide && `
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  `}

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

export const StyledContainer = styled.div<{leftSide?: boolean}>`
  display: flex;
  flex-direction: column;
  margin-top: ${p => !p.leftSide ? '0': '30px'};

  @media (min-width: 768px) {
    flex-direction: row;
    vertical-align: center;
  }
`

export const StyledLeftSide = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`
export const StyledRightSide = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-top: 20px;

  @media (min-width: 768px) {
    justify-content: flex-end;
    margin-top: 0;
  }
`

// HeadingNavigation
export const StyledNavigation = styled.div`
  margin-left: 17px;
  display: flex;
  flex-shrink: 0;
`

export const StyledButton = styled(Button)`
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 12px 20px;

  &:hover {
    border-color: #b2bec3;
  }
`