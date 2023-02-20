import Button from 'oldComponents/atoms/Button'
import Typography from 'oldComponents/atoms/Typography'
import TextField from 'oldComponents/molecules/CustomTextField'

import styled from 'styled-components'

// import Button from 'bf-ui/dist/Button'
// import Typography from 'bf-ui/dist/Typography'
// import TextField from 'bf-ui/dist/TextField'

export const StyledRoot = styled.div`
  /* border: 1px solid red; */
`
export const StyledCardHeder = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 40px;
`

export const StyledHeaderNavFirst = styled(Typography)`
  padding: 12px;
  border: 1px solid #dee2e6;
  white-space: nowrap;
  border-radius: 2px;
  color: #495057;
  cursor: pointer;
  border-bottom-color: #fff;
`

export const StyledBottomLine = styled.div`
  border-bottom: 1px solid #dee2e6;
  width: 100%;
`

export const StyledInputContainer = styled.div`
  display: flex;
  align-items: end;
  margin-top: 50px;
  height: 65px;
`

export const StyledTextField = styled(TextField)`
  max-width: 400px;
  height: 65px;
`

export const StyledButton = styled(Button)`
  padding: 10px 12px;
  border-radius: 4px;
  margin-left: 40px;
`
