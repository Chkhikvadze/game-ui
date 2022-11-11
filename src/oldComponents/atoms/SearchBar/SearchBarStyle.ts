import styled from 'styled-components'

import Button from 'oldComponents/atoms/Button'

export const StyledSearchRoot = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 15px;
  align-items: center;
`

export const StyledSearch = styled.div`
  display: flex;
  width: 340px;
  @media (max-width: 1200px) {
    width: 100%;
  }
`

export const StyledSearchInput = styled.input`
  width: 100%;
  height: 38px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 0 45px 0 15px;
  font-size: 16px;
  color: #212529;

  &:focus {
    border: 1px solid #b8b8b8;
  }
`

export const Form = styled.form`
  display: flex;
  align-items: center;
  position: relative;
`

export const StyledButton = styled(Button)`
  background-color: #fff;
  padding: 18px 10px;
  position: absolute;
  right: 1px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;

  &:hover {
    opacity: 0.7;
  }
`
