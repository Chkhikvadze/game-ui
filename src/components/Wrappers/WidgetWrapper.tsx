import styled from 'styled-components'

export const WidgetWrapper = ({ children, ...props }: any) => {
  return <StyledWidgetWrapper {...props}>{children}</StyledWidgetWrapper>
}

export default WidgetWrapper

const StyledWidgetWrapper = styled.div`
  background: rgba(0, 0, 0, 0.1);
  box-shadow: inset 0px 1px 20px rgba(8, 8, 16, 0.1);
  border-radius: 16px;
`
