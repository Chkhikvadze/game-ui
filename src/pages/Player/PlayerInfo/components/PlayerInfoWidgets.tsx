import moment from 'moment'
import styled from 'styled-components'
import WidgetWrapper from 'components/Wrappers'
import bgImage from 'assets/images/la_bg_image.png'

type PlayerInfoWidgetsProps = {
  player: any
  totalAssets: number
}

const PlayerInfoWidgets = ({ player, totalAssets }: PlayerInfoWidgetsProps) => {
  const { email, created_on } = player

  const date = moment(created_on, 'YYYY/MM/DD')
  const month = date.format('MMM')
  const day = date.format('D')
  const year = date.format('YYYY')

  return (
    <>
      <StyledGroupHeaderValue>Other information</StyledGroupHeaderValue>
      <StyledWidgetsGroup>
        <StyledWidgets>
          <StyledWidget>
            <StyledWidgetHeader>Assets Own</StyledWidgetHeader>
            <StyledWidgetBody>{totalAssets}</StyledWidgetBody>
          </StyledWidget>
          <StyledWidget>
            <StyledWidgetHeader>Total Games</StyledWidgetHeader>
            <StyledWidgetBody>-</StyledWidgetBody>
          </StyledWidget>
          <StyledWidget>
            <StyledWidgetHeader>Joining Date</StyledWidgetHeader>
            <StyledWidgetBody>{`${month} ${day}, ${year}`}</StyledWidgetBody>
          </StyledWidget>
          <StyledWidget>
            <StyledWidgetHeader>Email</StyledWidgetHeader>
            <StyledWidgetBody>{email}</StyledWidgetBody>
          </StyledWidget>
        </StyledWidgets>
        <StyledWidgetsEdit>
          <StyledWidgetEdit>
            <StyledWidgetHeader>Location</StyledWidgetHeader>
            <StyledWidgetBody>-</StyledWidgetBody>
          </StyledWidgetEdit>
          <StyledWidgetColumnEdit>
            <StyledWidgetHeader>Date of birthday</StyledWidgetHeader>
            <StyledWidgetBody>-</StyledWidgetBody>
          </StyledWidgetColumnEdit>
          <StyledWidgetColumnEdit>
            <StyledWidgetHeader>Devices</StyledWidgetHeader>
            <StyledWidgetBody>-</StyledWidgetBody>
          </StyledWidgetColumnEdit>
        </StyledWidgetsEdit>
      </StyledWidgetsGroup>
    </>
  )
}

export default PlayerInfoWidgets

const StyledWidget = styled(WidgetWrapper)`
  padding: 20px;
  display: grid;
  grid-auto-flow: row;
  row-gap: 20px;
  justify-content: center;
  justify-items: center;
`

const StyledWidgetEdit = styled(StyledWidget)`
  display: grid;
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 3;
  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-position: calc(100% - 16px) calc(100% - 33px);
  justify-items: start;
  justify-content: start;
  row-gap: unset;
  grid-auto-rows: max-content;
`

const StyledWidgetColumnEdit = styled(StyledWidget)`
  display: grid;
  grid-column-start: 3;
  grid-column-end: 5;
`

const StyledWidgetHeader = styled.h2`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.6);
`

const StyledWidgetBody = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  color: #ffffff;
`

const StyledWidgets = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 2fr;
  gap: 16px;
`

const StyledWidgetsEdit = styled(StyledWidgets)`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 2fr;
  gap: 16px;
  grid-template-rows: 1fr 1fr;
`

const StyledWidgetsGroup = styled.div`
  display: grid;
  gap: 16px;
`

const StyledGroupHeaderValue = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  color: #ffffff;
  margin-top: 24px;
`
