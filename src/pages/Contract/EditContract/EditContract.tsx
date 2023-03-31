import styled, { css } from 'styled-components'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'

import Etherscan from '@l3-lib/ui-core/dist/icons/Etherscan'
import Copy from '@l3-lib/ui-core/dist/icons/Copy'
import Download from '@l3-lib/ui-core/dist/icons/Download'
import Code from '@l3-lib/ui-core/dist/icons/Code'

import Eth from 'assets/icons/eth.svg'
import certifiedIcon from '../assets/certifiedIcon.png'

import Widget from '../ContractComponents/Widget'

// import { DUMMY_DATA } from '../contractConstants'
import ContractMethod from '../ContractComponents/ContractMethod'
import WidgetItem from '../ContractComponents/Widget/WidgetItem'

import ShowHide from '../ContractComponents/ShowHide'
import { useParams } from 'react-router-dom'
import { useCollectionsService } from 'services/useCollectionService'

const EditContract = () => {
  const textToCopy = 'ut73...21Be'
  const params = useParams()
  const projectId = params?.contractId!
  const { data: collectionsData } = useCollectionsService({
    project_id: projectId,
    page: 1,
    limit: 100,
    search_text: '',
  })

  const collectionOptions = collectionsData.items.map((collection: any) => {
    return { value: collection.name, label: collection.name }
  })

  return (
    <StyledRoot>
      <StyledTopSection>
        <StyledColumn>
          <div style={{ marginRight: '8px' }}>
            <img alt='' src={certifiedIcon} />
          </div>
          <StyledHeading
            type={Heading.types.h1}
            value='Weapons Contract'
            size='medium'
            customColor={'#FFF'}
          />
          <StyledCopyBuffer>
            <StyledIconWrapper>
              <Etherscan />
            </StyledIconWrapper>
            <Typography
              value={textToCopy}
              type={Typography.types.P}
              size={Typography.sizes.xss}
              customColor={'#FFF'}
            />
            <StyledIconWrapper
              onClick={() => {
                navigator.clipboard.writeText(textToCopy)
              }}
              pointer
            >
              <Copy />
            </StyledIconWrapper>
          </StyledCopyBuffer>
        </StyledColumn>
        <StyledColumn>
          <Button
            kind={Button.kinds.TERTIARY}
            leftIcon={() => (
              <StyledIconWrapper>
                <Download />
              </StyledIconWrapper>
            )}
          >
            <Typography
              value='ABI'
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
              customColor={'#FFF'}
            />
          </Button>
          <Button
            kind={Button.kinds.TERTIARY}
            leftIcon={() => (
              <StyledIconWrapper>
                <Code />
              </StyledIconWrapper>
            )}
          >
            <Typography
              value='Code'
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
              customColor={'#FFF'}
            />
          </Button>
          <StyledChainWrapper>
            <img src={Eth} alt='' />
            <StyledTextWrapper className='showMe'>
              <Typography
                value='Testnet'
                type={Typography.types.LABEL}
                size={Typography.sizes.xss}
                customColor={'#FFF'}
              />
            </StyledTextWrapper>
          </StyledChainWrapper>
        </StyledColumn>
      </StyledTopSection>
      <StyledDefinitionWrapper>
        <ShowHide title={'Details'}>
          <StyledWidgetsWrapper>
            <Widget
              title='Default'
              items={
                <>
                  <WidgetItem itemTitle={'Chain'} itemValue={'2'} />
                  <WidgetItem itemTitle={'Collection size'} itemValue={'123K'} />
                  <WidgetItem itemTitle={'Chain'} itemValue={'2'} />
                  <WidgetItem itemTitle={'Collection size'} itemValue={'123K'} />
                </>
              }
            />
            <Widget
              title='Custom'
              items={
                <>
                  <WidgetItem itemTitle={'Max Per Transaction'} itemValue={'2'} />
                  <WidgetItem itemTitle={'Max Per Player'} itemValue={'3'} />
                  <WidgetItem itemTitle={'Max Per Transaction'} itemValue={'2'} />
                  <WidgetItem itemTitle={'Max Per Player'} itemValue={'3'} />
                </>
              }
            />
            <Widget
              title='Royalties'
              titleValue='5%'
              items={
                <>
                  <WidgetItem
                    itemTitle={'David'}
                    itemValue={'45%'}
                    itemSubtitle={'0x0002B...'}
                    image={
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ9jjshW88ULMxoRtXeswOlMxh6_K3N9fUqw&usqp=CAU'
                    }
                  />
                  <WidgetItem
                    itemTitle={'Monica'}
                    itemValue={'45%'}
                    itemSubtitle={'0x0002B...'}
                    image={
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ9jjshW88ULMxoRtXeswOlMxh6_K3N9fUqw&usqp=CAU'
                    }
                  />
                </>
              }
            />
          </StyledWidgetsWrapper>
        </ShowHide>
        <ShowHide title='Collection'>
          <div style={{ width: '100%' }}>
            <Dropdown
              kind={Dropdown.kind.PRIMARY}
              size={Dropdown.size.LARGE}
              options={collectionOptions}
              placeholder={collectionOptions[0].label}
              insideOverflowContainer
            />
          </div>
        </ShowHide>
        <ShowHide title={'Actions'}>
          <StyledFormsWrapper>
            {/* {DUMMY_DATA.map((item: any, index: number) => {
              if (item.type === 'function') {
                return <ContractMethod item={item} key={index} />
              }
            })} */}
            <ContractMethod
              buttonName={'Mint'}
              title={'Minting'}
              description={'Posting an asset using an NFT wallet.'}
              extraDetail={
                <StyledExtraDetailWrapper>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      value='Mint Price'
                      type={Typography.types.LABEL}
                      size={Typography.sizes.md}
                      customColor={'#FFF'}
                    />
                    <Typography
                      value='Changeable for gas fee'
                      type={Typography.types.LABEL}
                      size={Typography.sizes.xss}
                      customColor={'rgba(255, 255, 255, 0.6)'}
                    />
                  </div>
                  <StyledBadge>
                    <Typography
                      value='0,001 ETH'
                      type={Typography.types.LABEL}
                      size={Typography.sizes.sm}
                      customColor={'rgba(255, 255, 255, 0.6)'}
                    />
                  </StyledBadge>
                </StyledExtraDetailWrapper>
              }
            />
            <ContractMethod
              buttonName={'Airdrop'}
              title={'Airdrop'}
              description={'Distribute assets to your players or whitelisted for free.'}
            />
            <ContractMethod
              disabled
              buttonName={'Whitelist'}
              title={'Whitelist'}
              description={'Pre-release NFTs for chosen players'}
              extraDetail={
                <Typography
                  value='Coming soon'
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                  customColor={'#FFF'}
                />
              }
            />
          </StyledFormsWrapper>
        </ShowHide>

        <ShowHide title={'Balance'}>
          <StyledBalanceSection>
            <StyledBalanceWrapper>
              <Heading
                value='192eth'
                type={Heading.types.h1}
                size='medium'
                customColor={'#7AF94B'}
              />
            </StyledBalanceWrapper>
            <Button size={Button.sizes.MEDIUM}>Withdraw</Button>
          </StyledBalanceSection>
        </ShowHide>
      </StyledDefinitionWrapper>
    </StyledRoot>
  )
}

export default EditContract

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 30px;
  margin-bottom: 50px;

  gap: 36px;
`
const StyledDefinitionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 28px;
`
const StyledWidgetsWrapper = styled.div`
  display: flex;
  gap: 32px;
`

const StyledFormsWrapper = styled.div`
  display: flex;

  gap: 32px;
`
const StyledTopSection = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledBalanceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
const StyledColumn = styled.div`
  display: flex;
  align-items: center;
`
const StyledCopyBuffer = styled.div`
  display: flex;
  align-items: center;
  max-height: 30px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  margin-left: 12px;
`
const StyledIconWrapper = styled.div<{ pointer?: boolean }>`
  width: 20px;
  height: 44px;

  cursor: ${p => p.pointer && 'pointer'};
`
const StyledHeading = styled(Heading)`
  text-decoration: underline;
`
const StyledChainWrapper = styled.div`
  height: 30px;

  overflow: hidden;
  display: flex;
  gap: 12px;
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 100px;
  align-items: center;

  background: rgba(0, 0, 0, 0.3);
  /* backdrop-filter: blur(1px); */

  max-width: 30px;
  transition: max-width 0.3s;
  &:hover {
    max-width: 100px;

    .showMe {
      opacity: 1;
    }
  }
`
const StyledTextWrapper = styled.div`
  opacity: 0;
  transition: opacity 0.3s;
`
const StyledBalanceSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledExtraDetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-bottom: 10px;
  border-bottom: 1px rgba(255, 255, 255, 0.3) solid;
  width: 100%;
`
const StyledBadge = styled.div`
  padding: 8px 12px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
`
