import styled from 'styled-components'

export const StyledItemContainer = styled.div`
  border-bottom: 1px solid #e5e5e5;

  &:last-child {
    border-bottom: none;
  }
`

export const StyledNotificationItem = styled.div`
  line-height: 16px;
`

export const StyledReceiverName = styled.span`
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
`

export const StyledRSenderName = styled.span`
  font-weight: 600;
`

export const StyledAccountName = styled.span`
  font-weight: 600;
`
