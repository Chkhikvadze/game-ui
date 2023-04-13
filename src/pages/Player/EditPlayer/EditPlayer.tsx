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

import CollectionWidget from 'pages/Collection/CollectionComponents/CollectionWidget'

import { PathTwo } from 'assets/avatars'
import moment from 'moment'
// import PlayerForm from '../PlayerForm'

// import { StyledFormSection } from 'modals/modalStyle'

// import Button from 'oldComponents/atoms/Button'
// import Typography from 'oldComponents/atoms/Typography'
// import { CustomTable } from 'oldComponents/atoms/CustomTable'
// import columnConfig from './columnConfig'

// const config = columnConfig()

const EditPlayer = () => {
  const {
    formik,
    onDeleteImg,
    handleChangeFile,
    generateLinkLoading,
    fileUploadType,
    walletByPlayer,
    addPLayerWallet,
    transactionsByPlayer,
    // handleChangeFile,
    // onDeleteImg,
    // fileUploadType,
    // walletByPlayer,
    // addPLayerWallet,
    // transactionsByPlayer,
    playerById,
  } = useEditPlayer()

  const { unique_id, email, created_on } = playerById

  const date = moment(created_on, 'YYYY/MM/DD')
  const month = date.format('MMM')
  const day = date.format('D')
  const year = date.format('YYYY')

  return (
    <>
      <FormikProvider value={formik}>
        {/* <StyledWrapper>
          <StyledFormSection>
            <FormikProvider value={formik}>
              <PlayerForm
                formik={formik}
                handleChangeFile={handleChangeFile}
                onDeleteImg={onDeleteImg}
                fileUploadType={fileUploadType}
                editMode
              />
            </FormikProvider>
            <Button color='primary' onClick={formik.handleSubmit}>
              Save
            </Button>
          </StyledFormSection>
          <StyledContent>
            <Typography variant='h1'>Tranasactions</Typography>
            {transactionsByPlayer?.items?.map((item: any, index: any) => (
            <TextField value={`${item.id}`} label={`Transaction ${index + 1}`} disabled />
          ))}
            <CustomTable
              templateColumns='1fr repeat(1, 1fr)  repeat(1,1fr)'
              size='14px'
              displayHeader
              columnsConfig={config}
              data={transactionsByPlayer?.items || []}
              alignItems='end'
              rowDifferentColors
            />
          </StyledContent>
        </StyledWrapper> */}

        <StyledRoot>
          <StyledHeaderWrapper>
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
          </StyledHeaderWrapper>
          <div>
            <>
              <Heading
                value={'Key insights'}
                type={Heading.types.h1}
                customColor='#FFFFFF'
                size='medium'
              />
              <Heading />
              <Typography
                value={
                  'Check the most relevant information with custom widgets, add or remove them.'
                }
                type={Heading.types.p}
                size={Typography.sizes.lg}
                customColor='rgba(255, 255, 255, 0.6)'
              />
            </>
            <StyledKeyContent>
              <StyledIconText>
                <Persona />
                <Typography
                  value={`User ID ${unique_id}`}
                  type={Heading.types.p}
                  size={Typography.sizes.md}
                  customColor='#FFF'
                />
              </StyledIconText>
              <StyledWidgets>
                <CollectionWidget value={'10'} title={'Assets Own'} />
                <CollectionWidget value={'3'} title={'Total Games'} />
                <CollectionWidget
                  value={`${month} ${day}, ${year}`}
                  title={'Joining Date'}
                  size={'medium'}
                />
                <CollectionWidget value={email} title={'Email'} size={'medium'} />
              </StyledWidgets>
              <StyledWidgets>
                <CollectionWidget value={'San Francisco'} title={'Location'} size={'large'} />
                <StyledWidgetColumn>
                  <CollectionWidget value={'Mar 29. 1999'} title={'Date of birthday'} fullWidth />
                  <CollectionWidget
                    title={'Devices'}
                    customValue={<StyledImg src={PathTwo} alt='' />}
                    fullWidth
                  />
                </StyledWidgetColumn>
              </StyledWidgets>

              <StyledIconText>
                <Wallet />
                <Typography
                  value={`Wallet(s)`}
                  type={Heading.types.p}
                  size={Typography.sizes.md}
                  customColor='#FFF'
                />
              </StyledIconText>
              <StyledWalletKey>
                <Typography
                  value={`3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5`}
                  type={Heading.types.p}
                  size={Typography.sizes.md}
                  customColor='#FFF'
                />
                <StyledCopyIcon>
                  <Copy />
                </StyledCopyIcon>
              </StyledWalletKey>
            </StyledKeyContent>
          </div>
        </StyledRoot>
      </FormikProvider>
    </>
  )
}
export default EditPlayer

// const StyledWrapper = styled.div`
//   display: flex;
//   /* justify-content: space-between; */
//   gap: 200px;
// `

// const StyledContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 30px;
// `
const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 58px;
  margin-top: 18px;
`
const StyledButtonWrapper = styled.div`
  display: flex;
  gap: 5px;

  align-items: center;
`
const StyledKeyContent = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 32px;

  gap: 16px;

  width: fit-content;
`
const StyledIconText = styled.div`
  display: flex;
  align-items: center;
`
const StyledWidgets = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  /* justify-content: space-between; */
`
const StyledWidgetColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;
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
const StyledImg = styled.img`
  width: 45px;
  margin-top: 18px;
`
