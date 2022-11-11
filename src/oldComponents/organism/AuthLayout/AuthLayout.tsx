import React from 'react'
import styled from 'styled-components'

const AuthLayout = ({ children }: any) => (
  <StyledContainer>
    <StyledHeader></StyledHeader>
    <StyledContent>
      <StyledFormContainer>
        {children}
      </StyledFormContainer>
    </StyledContent>
  </StyledContainer>
)

export default AuthLayout

const StyledContainer = styled.div`
  background: #ffffff;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
`
const StyledHeader = styled.div`
  width: 100%;
  background: #fff;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
  height: 45px;
`
const StyledContent = styled.div`
  margin-top: 40px;
`
const StyledFormContainer = styled.div`
  width: 430px;
  border-radius: 2px;
  border-top: 5px solid #3998DB;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 2px 1px 0 rgb(0 0 0 / 12%);
  background: #fff;
  padding: 0 40px 20px 40px;
  box-sizing: border-box;
`