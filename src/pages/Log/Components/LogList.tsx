import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'

const ListItem = ({ is_active, item, navigate }: any) => {
  return (
    <StyledListItemContainer
      is_active={is_active}
      onClick={() => navigate(`/developers/log/${item.id}`)}
    >
      <StyledListItemBlock>
        <StyledStatusContainer>
          {item.status} {parseInt(item.status) !== 200 ? 'ERR' : 'OK'}
        </StyledStatusContainer>
        <StyledUrlContainer>
          {item.method} &ensp; &ensp; {item.endpoint}
        </StyledUrlContainer>
      </StyledListItemBlock>

      <StyledTimeContainer>{moment(item.request_date).format('h:mm:ss A')}</StyledTimeContainer>
    </StyledListItemContainer>
  )
}

const LogList = ({ items }: any) => {
  const navigate = useNavigate()
  const params = useParams()
  return (
    <StyledContainer>
      <StyledTitle>Yesterday</StyledTitle>
      {items.map((item: any, index: number) => (
        <ListItem item={item} is_active={params.id === item.id} navigate={navigate} />
      ))}
    </StyledContainer>
  )
}

export default LogList

const StyledContainer = styled.div``
const StyledTitle = styled.div``

const StyledListItemContainer = styled.div<{ is_active?: boolean }>`
  display: grid;
  grid-template-columns: 70% auto;
  padding: 15px 10px;
  background: ${({ is_active }) => (is_active ? 'rgba(255, 255, 255, 0.3)' : 'transparent')};
  cursor: pointer;
  margin-top: 1px;
`
const StyledListItemBlock = styled.div`
  display: grid;
  grid-template-columns: 27% auto;
  grid-gap: 5px;
`

const StyledStatusContainer = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(100px);
  border-radius: 4px;
  font-style: normal;
  font-weight: 500;
  padding: 2px 4px;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledUrlContainer = styled.div`
  display: flex;
  align-items: center;
`
const StyledTimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 12px;
`
