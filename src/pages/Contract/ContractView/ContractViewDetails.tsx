import styled from 'styled-components'

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

import { shortenAddress } from 'utils/format'
import { getContractUrl } from 'utils/blockchain'
import {
  IContract,
  useCollectionByIdService,
  useCollectionsService,
  useContractsService,
} from 'services'
import ContractBalance from './components/ContractBalance'
import { CollectionValueRenderer } from '../ContractForm/components/ChooseCollection'

type ContractViewDetailsProps = {
  contract: IContract
}

type OptionRendererProps = {
  label: string
}

const ContractViewDetails = ({ contract }: ContractViewDetailsProps) => {
  const {
    name,
    contract_address,
    chain_id,
    chain_name,
    config,
    environment,
    constructor_config,
    game_id,
    collection_id,
  } = contract

  const { data: contracts } = useContractsService({
    page: 1,
    limit: 100,
    game_id: game_id,
  })

  const { royalty_addresses, royalty_percentages, royalty_fee } = constructor_config || {}

  const { collection_size } = config

  const { data: collectionsData } = useCollectionsService({
    game_id,
    page: 1,
    limit: 100,
    search_text: '',
  })

  const { data: collection } = useCollectionByIdService({
    id: collection_id || '',
  })

  const linkedCollections = contracts?.items?.map((contract: any) => contract.collection_id)

  const noLinkedCollections = collectionsData?.items?.filter(
    (collection: any) => !linkedCollections?.includes(collection.id),
  )

  const options = noLinkedCollections?.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    }
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

  let currencyLabel = 'ETH'

  if (chain_name === 'Polygon PoS') {
    currencyLabel = 'Matic'
  }

  return (
    <StyledRoot>
      <StyledTopSection>
        <StyledColumn>
          <div style={{ marginRight: '8px' }}>
            <img alt='' src={certifiedIcon} />
          </div>
          <StyledHeading type={Heading.types.h1} value={name} size='medium' customColor={'#FFF'} />
          {contract_address && (
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
          )}
        </StyledColumn>
        <StyledColumn>
          <Button kind={Button.kinds.TERTIARY} leftIcon={() => <Download />}>
            <Typography
              value='ABI'
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
              customColor={'#FFF'}
            />
          </Button>
          <Button kind={Button.kinds.TERTIARY} leftIcon={() => <Code />}>
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
                    itemValue={`${config.player_mint_fee} ${currencyLabel}`}
                  />
                  {/* <WidgetItem itemTitle={'Max Per Player'} itemValue={'3'} /> */}
                </>
              }
            />
            <Widget
              title='Royalties'
              titleValue={`${Number(royalty_fee) / 100}%`}
              items={
                <>
                  {royalty_addresses?.map((address: string, index: number) => (
                    <WidgetItem
                      key={index}
                      itemTitle={`Player ${index + 1}`}
                      itemValue={`${Number(royalty_percentages[index])}%`}
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
              options={options}
              placeholder={'Choose Collection'}
              optionRenderer={OptionRenderer}
              value={collectionsData?.items?.find((option: any) => option.id === collection_id)}
              valueRenderer={() => (
                <CollectionValueRenderer name={collection?.name} image={collection?.main_media} />
              )}
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
              // extraDetail={
              //   <StyledExtraDetailWrapper>
              //     <div style={{ display: 'flex', flexDirection: 'column' }}>
              //       <Typography
              //         value='Mint Price'
              //         type={Typography.types.LABEL}
              //         size={Typography.sizes.md}
              //         customColor={'#FFF'}
              //       />
              //       <Typography
              //         value='Changeable for gas fee'
              //         type={Typography.types.LABEL}
              //         size={Typography.sizes.xss}
              //         customColor={'rgba(255, 255, 255, 0.6)'}
              //       />
              //     </div>
              //     <StyledBadge>
              //       <Typography
              //         value={`0,001 ${currencyLabel}`}
              //         type={Typography.types.LABEL}
              //         size={Typography.sizes.sm}
              //         customColor={'rgba(255, 255, 255, 0.6)'}
              //       />
              //     </StyledBadge>
              //   </StyledExtraDetailWrapper>
              // }
            />

            <ContractMethod
              contract={contract}
              buttonName={'Mint By Player'}
              title={'Minting by player'}
              method={'playerMint'}
              description={'Posting an asset using an NFT wallet.'}
              // extraDetail={
              //   <StyledExtraDetailWrapper>
              //     <div style={{ display: 'flex', flexDirection: 'column' }}>
              //       <Typography
              //         value='Mint Price'
              //         type={Typography.types.LABEL}
              //         size={Typography.sizes.md}
              //         customColor={'#FFF'}
              //       />
              //       <Typography
              //         value='Changeable for gas fee'
              //         type={Typography.types.LABEL}
              //         size={Typography.sizes.xss}
              //         customColor={'rgba(255, 255, 255, 0.6)'}
              //       />
              //     </div>
              //     <StyledBadge>
              //       <Typography
              //         value={`0,001 ${currencyLabel}`}
              //         type={Typography.types.LABEL}
              //         size={Typography.sizes.sm}
              //         customColor={'rgba(255, 255, 255, 0.6)'}
              //       />
              //     </StyledBadge>
              //   </StyledExtraDetailWrapper>
              // }
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

        <ContractBalance contract={contract} />
      </StyledDefinitionWrapper>
    </StyledRoot>
  )
}

export default ContractViewDetails

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;

  /* margin-top: 30px; */
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
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* creates 3 equal columns */
  grid-gap: 10px; /* adds a gap between each grid item */
`

const StyledFormsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* creates 3 equal columns */
  grid-gap: 10px; /* adds a gap between each grid item */
`
const StyledTopSection = styled.div`
  width: 99%;
  min-width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
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
