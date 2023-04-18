import styled from 'styled-components'
import { FormikProvider } from 'formik'

import useEditPlayer from './useEditPlayer'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'

import MenuButton from '@l3-lib/ui-core/dist/MenuButton'

import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'
import Persona from '@l3-lib/ui-core/dist/icons/Persona'
import Wallet from '@l3-lib/ui-core/dist/icons/Wallet'
import Copy from '@l3-lib/ui-core/dist/icons/Copy'

import moment from 'moment'
import { StyleHeaderGroup, StyledInnerWrapper } from 'styles/globalStyle.css'

import bgImage from 'assets/images/la_bg_image.png'
import WidgetWrapper from 'components/Wrappers'
// import PlayerForm from '../PlayerForm'

// import { StyledFormSection } from 'modals/modalStyle'

// import Button from 'oldComponents/atoms/Button'
// import Typography from 'oldComponents/atoms/Typography'
// import { CustomTable } from 'oldComponents/atoms/CustomTable'
// import columnConfig from './columnConfig'

// const config = columnConfig()

const EditPlayer = () => {
  const { formik, playerById, walletByPlayer } = useEditPlayer()

  const { unique_id, email, created_on } = playerById

  const date = moment(created_on, 'YYYY/MM/DD')
  const month = date.format('MMM')
  const day = date.format('D')
  const year = date.format('YYYY')

  return (
    <>
      <FormikProvider value={formik}>
        <StyleHeaderGroup>
          <Heading
            value={'Player Info'}
            type={Heading.types.h1}
            customColor='#FFFFFF'
            size='medium'
          />
          <StyledButtonWrapper>
            <Button>Reward Player</Button>
            <MenuButton component={MenuDots}></MenuButton>
          </StyledButtonWrapper>
        </StyleHeaderGroup>
        <StyledInnerWrapper>
          <StyledMainWrapper>
            <StyledIconText>
              <Persona />
              <Typography
                value={`User ID ${unique_id}`}
                type={Heading.types.p}
                size={Typography.sizes.md}
                customColor='#FFF'
              />
            </StyledIconText>
            <>
              <StyledIconText>
                <Wallet />
                <Typography
                  value={`Wallet(s)`}
                  type={Heading.types.p}
                  size={Typography.sizes.md}
                  customColor='#FFF'
                />
              </StyledIconText>
              {walletByPlayer?.address && (
                <StyledWalletKey>
                  <Typography
                    value={walletByPlayer.address}
                    type={Heading.types.p}
                    size={Typography.sizes.md}
                    customColor='#FFF'
                  />
                  <StyledCopyIcon>
                    <Copy />
                  </StyledCopyIcon>
                </StyledWalletKey>
              )}
            </>
            <StyledGroupHeaderValue>Other information</StyledGroupHeaderValue>
            <StyledWidgetsGroup>
              <StyledWidgets>
                <StyledWidget>
                  <StyledWidgetHeader>Assets Own</StyledWidgetHeader>
                  <StyledWidgetBody>10</StyledWidgetBody>
                </StyledWidget>
                <StyledWidget>
                  <StyledWidgetHeader>Total Games</StyledWidgetHeader>
                  <StyledWidgetBody>3</StyledWidgetBody>
                </StyledWidget>
                <StyledWidget>
                  <StyledWidgetHeader>Joining Date</StyledWidgetHeader>
                  <StyledWidgetBody>{`${month} ${day}, ${year}`}</StyledWidgetBody>
                </StyledWidget>
                <StyledWidget>
                  <StyledWidgetHeader>Email</StyledWidgetHeader>
                  <StyledWidgetBody>{email}</StyledWidgetBody>
                </StyledWidget>

                {/* <CollectionWidget
                value={``}
                title={''}
                size={'medium'}
              /> */}
                {/* <CollectionWidget value={email} title={''} size={'medium'} /> */}
              </StyledWidgets>
              <StyledWidgetsEdit>
                <StyledWidgetEdit>
                  <StyledWidgetHeader>Location</StyledWidgetHeader>
                  <StyledWidgetBody>San Francisco</StyledWidgetBody>
                </StyledWidgetEdit>
                <StyledWidgetColumnEdit>
                  <StyledWidgetHeader>Date of birthday</StyledWidgetHeader>
                  <StyledWidgetBody>Mar 29. 1999</StyledWidgetBody>
                </StyledWidgetColumnEdit>
                <StyledWidgetColumnEdit>
                  <StyledWidgetHeader>Devices</StyledWidgetHeader>
                  <StyledWidgetBody>Mar 29. 1999</StyledWidgetBody>
                </StyledWidgetColumnEdit>
              </StyledWidgetsEdit>
            </StyledWidgetsGroup>
          </StyledMainWrapper>
        </StyledInnerWrapper>
      </FormikProvider>
    </>
  )
}
export default EditPlayer

const StyledButtonWrapper = styled.div`
  display: flex;
  gap: 5px;

  align-items: center;
`

const StyledIconText = styled.div`
  display: flex;
  align-items: center;
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

const StyledWalletKey = styled.div`
  width: 100%;
  /* min-height: 76px; */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  gap: 16px;

  background: rgba(0, 0, 0, 0.2);

  box-shadow: inset 0px 1px 20px rgba(8, 8, 16, 0.1);
  border-radius: 16px;
`
const StyledCopyIcon = styled.div`
  width: 30px;
  cursor: pointer;
`

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

const StyledMainWrapper = styled.div`
  display: grid;
  gap: 16px;
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
