import styled from 'styled-components'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'

import Etherscan from '@l3-lib/ui-core/dist/icons/Etherscan'
import Copy from '@l3-lib/ui-core/dist/icons/Copy'
import Download from '@l3-lib/ui-core/dist/icons/Download'
import Code from '@l3-lib/ui-core/dist/icons/Code'
import Loader from '@l3-lib/ui-core/dist/Loader'

import Eth from 'assets/icons/eth.svg'
import certifiedIcon from '../assets/certifiedIcon.png'

import Widget from '../ContractComponents/Widget'

// import { DUMMY_DATA } from '../contractConstants'
import ContractMethod from '../ContractComponents/ContractMethod'
import WidgetItem from '../ContractComponents/Widget/WidgetItem'

import ShowHide from '../ContractComponents/ShowHide'
import { useParams } from 'react-router-dom'
import { useCollectionsService } from 'services/useCollectionService'
import { useContractById } from 'services/useContractService'
import { shortenAddress } from 'utils/format'
import { getContractUrl } from 'utils/blockchain'

type OptionRendererProps = {
  label: string
}

const ContractView = () => {
  const { projectId = '', contractId } = useParams()

  const { data: collectionsData } = useCollectionsService({
    project_id: projectId,
    page: 1,
    limit: 100,
    search_text: '',
  })

  const { data: contract, loading } = useContractById({ id: contractId })

  const collectionOptions = collectionsData?.items?.map((collection: any) => {
    return { value: collection.name, label: collection.name }
  })

  const OptionRenderer = ({ label }: OptionRendererProps) => {
    return (
      <Typography
        value={label}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
        customColor={'#FFF'}
      />
    )
  }

  if (loading) {
    return (
      <StyledLoader>
        <Loader />
      </StyledLoader>
    )
  }

  if (!contract) return <p>Contract not found</p>

  const { name, contract_address, chain_id, chain_name, config, environment, constructor_args } =
    contract

  const [royaltyAddresses, royaltyShares, royaltyFee] = constructor_args || []

  const { collection_size } = config

  return (
    <StyledRoot>
      <StyledTopSection>
        <StyledColumn>
          <div style={{ marginRight: '8px' }}>
            <img alt='' src={certifiedIcon} />
          </div>
          <StyledHeading type={Heading.types.h1} value={name} size='medium' customColor={'#FFF'} />
          <StyledCopyBuffer>
            <StyledIconWrapper>
              <Etherscan />
            </StyledIconWrapper>
            <StyledLink
              href={getContractUrl(chain_id, contract_address)}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Typography
                value={shortenAddress(contract_address)}
                type={Typography.types.P}
                size={Typography.sizes.xss}
                customColor={'#FFF'}
              />
            </StyledLink>

            <StyledIconWrapper
              onClick={() => {
                navigator.clipboard.writeText(contract_address)
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
                  <WidgetItem itemTitle={'Chain'} itemValue={chain_name} />
                  <WidgetItem itemTitle={'Collection size'} itemValue={collection_size} />
                  {/* <WidgetItem itemTitle={'Chain'} itemValue={'2'} /> */}
                  <WidgetItem itemTitle={'Environment'} itemValue={environment} />
                </>
              }
            />
            <Widget
              title='Custom'
              items={
                <>
                  {/* <WidgetItem itemTitle={'Collection size'} itemValue={collection_size as string} /> */}
                  <WidgetItem
                    itemTitle={'Max Per Transaction'}
                    itemValue={config.max_mint_per_transaction}
                  />
                  <WidgetItem itemTitle={'Max Per Player'} itemValue={config.max_mint_per_player} />
                  <WidgetItem
                    itemTitle={'Player Mint Fee'}
                    itemValue={`${config.player_mint_fee} ETH`}
                  />
                  {/* <WidgetItem itemTitle={'Max Per Player'} itemValue={'3'} /> */}
                </>
              }
            />
            <Widget
              title='Royalties'
              titleValue={`${Number(royaltyFee) / 100}%`}
              items={
                <>
                  {(royaltyAddresses as string[])?.map((address: string, index: number) => (
                    <WidgetItem
                      key={index}
                      itemTitle={`Player ${index + 1}`}
                      itemValue={`${Number((royaltyShares as number[])[index])}%`}
                      itemSubtitle={shortenAddress(address)}
                      image={
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ9jjshW88ULMxoRtXeswOlMxh6_K3N9fUqw&usqp=CAU'
                      }
                    />
                  ))}
                </>
              }
            />
          </StyledWidgetsWrapper>
        </ShowHide>
        <ShowHide title='Collection'>
          <div style={{ width: '98%' }}>
            <Dropdown
              kind={Dropdown.kind.PRIMARY}
              size={Dropdown.size.LARGE}
              options={collectionOptions}
              placeholder={collectionOptions && collectionOptions[0].label}
              insideOverflowContainer
              optionRenderer={OptionRenderer}
            />
          </div>
        </ShowHide>
        <ShowHide title={'Actions'} isOpen>
          <StyledFormsWrapper>
            <ContractMethod
              contract={contract}
              buttonName={'Mint'}
              title={'Minting'}
              method={'mint'}
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
              contract={contract}
              buttonName={'Award'}
              title={'Award'}
              method={'award'}
              description={'Award assets to your players.'}
            />

            <ContractMethod
              contract={contract}
              buttonName={'Airdrop'}
              title={'Airdrop'}
              method={'airdrop'}
              description={'Gift assets to your players.'}
            />

            <ContractMethod
              contract={contract}
              disabled
              buttonName={'Whitelist'}
              title={'Whitelist'}
              method='whitelist' // refactor
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

export default ContractView

export const StyledLoader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    width: 50px;
    height: 50px;
  }
`

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 30px;
  margin-bottom: 50px;
  width: 1050px;

  gap: 36px;
`
const StyledDefinitionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 28px;
`
const StyledWidgetsWrapper = styled.div`
  display: flex;
  gap: 16px;

  /* flex-wrap: wrap; */
`

const StyledFormsWrapper = styled.div`
  display: flex;
  gap: 16px;

  /* flex-wrap: wrap; */
`
const StyledTopSection = styled.div`
  width: 99%;
  min-width: 600px;
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

const StyledLink = styled.a`
  text-decoration: none;
  color: transparent;
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
