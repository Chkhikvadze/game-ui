import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Tags from '@l3-lib/ui-core/dist/Tags'

const ListItem = ({ is_active, item, navigate }: any) => {
  return (
    <StyledListItemContainer is_active={is_active} onClick={() => navigate(`/logs/${item.id}`)}>
      <StyledListItemBlock>
        {/* <StyledStatusContainer> */}
        {item.status === '200' && (
          <>
            <Tags
              color='rgba(0, 0, 0, 0.2)'
              readOnly
              label={
                <>
                  <Typography
                    value={item.status}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.xss}
                    customColor='rgba(255, 255, 255, 0.8)'
                  />
                  <Typography
                    value={parseInt(item.status) === 200 && ' OK'}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.xss}
                    customColor='rgba(255, 255, 255, 0.8)'
                  />
                </>
              }
            />
          </>
        )}
        {item.status === '400' && (
          <>
            <Tags
              color='gradient_red'
              readOnly
              label={
                <>
                  <Typography
                    value={item.status}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.xss}
                    customColor='rgba(255, 255, 255, 0.8)'
                  />
                  <Typography
                    value={parseInt(item.status) === 400 && ' ERR'}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.xss}
                    customColor='rgba(255, 255, 255, 0.8)'
                  />
                </>
              }
            />
          </>
        )}
        {/* </StyledStatusContainer> */}
        <StyledUrlContainer>
          <Typography
            value={item.method}
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor='#FFFFFF'
          />
          <Typography
            value='&ensp; &ensp;'
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor='#FFFFFF'
          />
          <Typography
            value={item.endpoint}
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor='#FFFFFF'
          />
        </StyledUrlContainer>
      </StyledListItemBlock>

      <StyledTimeContainer>
        <Typography
          value={moment(item.request_date).format('h:mm:ss A')}
          type={Typography.types.LABEL}
          size={Typography.sizes.xss}
          customColor='rgba(255, 255, 255, 0.8)'
        />
      </StyledTimeContainer>
    </StyledListItemContainer>
  )
}

const LogList = ({ items }: any) => {
  const navigate = useNavigate()
  const params = useParams()
  return (
    <StyledContainer>
      <StyledTitle>
        <Typography
          value='Yesterday'
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='#FFFFFF'
        />
      </StyledTitle>
      {items.map((item: any, index: number) => (
        // eslint-disable-next-line react/jsx-key
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
  align-items: center;
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
  gap: 5px;
  justify-content: center;
`

const StyledUrlContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  right: 30px;
`
const StyledTimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 12px;
`
