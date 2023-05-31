import styled from 'styled-components'

import Tags from '@l3-lib/ui-core/dist/Tags'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Tooltip from '@l3-lib/ui-core/dist/Tooltip'
import Avatar from '@l3-lib/ui-core/dist/Avatar'

import NumberOutline from '@l3-lib/ui-core/dist/icons/NumberOutline'
import Switch from '@l3-lib/ui-core/dist/icons/Switch'
import TagsOutline from '@l3-lib/ui-core/dist/icons/TagsOutline'
import Copy from '@l3-lib/ui-core/dist/icons/Copy'
import Image from '@l3-lib/ui-core/dist/icons/Image'
import Collection from '@l3-lib/ui-core/dist/icons/Collection'

import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'
// import useCheckboxRenderer from 'components/DataGrid/GridComponents/useCheckboxRenderer'

import { StyledOutlineIcon } from 'pages/Asset/Assets/columnConfig'
import { getTransactionUrl } from 'utils/blockchain'
import { shortenAddress, shortenTransactionHash } from 'utils/format'
import { StyledCopyIcon } from '../Players/columnConfig'
import { useAssetByIdService } from 'services/useAssetService'
import { useCollectionByIdService } from 'services/useCollectionService'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  // const { HeaderCheckbox, RowCheckbox } = useCheckboxRenderer()
  const navigate = useNavigate()

  const TextCellRenderer = (p: any) => (
    <Typography
      value={p.value}
      type={Typography.types.LABEL}
      size={Typography.sizes.lg}
      customColor='rgba(255, 255, 255, 0.8)'
    />
  )
  const TransactionHashCellRenderer = (p: any) => {
    const { data, value } = p

    return (
      <StyledLinkText
        onClick={() => window.open(getTransactionUrl(data.chain_id, value), '_blank')}
      >
        <Typography
          value={shortenTransactionHash(value)}
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
          customColor='rgba(255, 255, 255, 0.8)'
        />
      </StyledLinkText>
    )
  }

  const FromToRenderer = (props: any) => {
    const { value } = props
    return (
      <StyledDiv>
        <StyledTag
          label={value && shortenAddress(value)}
          size='small'
          outlined={true}
          readOnly
          color={'white'}
          leftIcon={() => (
            <StyledCopyIcon
              onClick={() => {
                navigator.clipboard.writeText(value)
              }}
            >
              <Copy />
            </StyledCopyIcon>
          )}
        />
      </StyledDiv>
    )
  }

  const FromToPlayerRenderer = (props: any) => {
    const { value: player } = props
    if (!player) return <span>-</span>

    return (
      <StyledNameWrapper>
        <Avatar size={Avatar.sizes.SMALL} src={player.avatar} type={Avatar.types.IMG} rectangle />
        <Typography
          value={player.name}
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
          customColor='rgba(255, 255, 255, 0.8)'
        />
      </StyledNameWrapper>
    )
  }

  const CollectionRenderer = (props: any) => {
    const { value } = props

    const assetId = value[0]?.asset?.id

    const { data: asset } = useAssetByIdService({ id: assetId })

    const { collection_id } = asset

    const { data: collection } = useCollectionByIdService({
      id: collection_id,
    })

    const { name: collectionName } = collection

    return (
      <StyledLinkText onClick={() => navigate(`/collection/${collection_id}/general`)}>
        <Typography
          value={collectionName}
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
          customColor='rgba(255, 255, 255, 0.8)'
        />
      </StyledLinkText>
    )
  }

  const TypeRenderer = (p: any) => {
    const { value } = p
    let color = 'gradient_green'
    if (value === 'burn') {
      color = 'gradient_orange'
    } else if (value === 'mint' || value === 'airdrop' || value === 'whitelisted') {
      color = 'gradient_yellow'
    }

    return (
      <StyledDiv>
        <StyledTypeTag label={p.value} readOnly size={'small'} color={color} />
      </StyledDiv>
    )
  }

  return [
    //   {
    //     headerComponent: HeaderCheckbox,
    //     cellRenderer: RowCheckbox,
    //     width: 60,
    //     minWidth: 60,
    //   },
    {
      headerName: 'Transaction',
      headerComponent: HeaderComponent,
      field: 'transaction_hash',
      filter: 'agTextColumnFilter',
      cellRenderer: TransactionHashCellRenderer,
      resizable: true,
      headerComponentParams: {
        icon: <NumberOutline />,
      },
      minWidth: 200,
      width: 200,
    },
    {
      headerName: 'From',
      headerComponent: HeaderComponent,
      field: 'from',
      filter: 'agTextColumnFilter',
      cellRenderer: FromToRenderer,
      resizable: true,
      headerComponentParams: {
        icon: <Switch />,
      },
      minWidth: 160,
      width: 160,
    },
    // {
    //   headerName: 'From Player',
    //   headerComponent: HeaderComponent,
    //   field: 'from_player',
    //   filter: 'agTextColumnFilter',
    //   cellRenderer: FromToPlayerRenderer,
    //   resizable: true,
    //   headerComponentParams: {
    //     icon: <Switch />,
    //   },
    //   minWidth: 180,
    //   width: 180,
    // },
    {
      headerName: 'To',
      headerComponent: HeaderComponent,
      field: 'to',
      filter: 'agTextColumnFilter',
      cellRenderer: FromToRenderer,
      resizable: true,
      headerComponentParams: {
        icon: <Switch />,
      },
      minWidth: 160,
      width: 160,
    },
    {
      headerName: 'Player',
      headerComponent: HeaderComponent,
      field: 'to_player',
      filter: 'agTextColumnFilter',
      cellRenderer: FromToPlayerRenderer,
      resizable: true,
      headerComponentParams: {
        icon: <Switch />,
      },
      minWidth: 180,
      width: 180,
    },
    {
      headerName: 'Type',
      headerComponent: HeaderComponent,
      field: 'type',
      filter: 'agTextColumnFilter',
      cellRenderer: TypeRenderer,
      resizable: true,
      headerComponentParams: {
        icon: <TagsOutline />,
      },
      minWidth: 160,
      width: 160,
    },
    {
      headerName: 'Asset(s)',
      headerComponent: HeaderComponent,
      field: 'transaction_assets',
      filter: 'agTextColumnFilter',
      cellRenderer: (p: any) => {
        const assets = p.value.map((item: any) => item.asset)

        return (
          <>
            <StyledImgWrapper>
              {assets?.slice(0, 3).map((asset: any, index: number) => (
                <Tooltip content={asset.name} key={index}>
                  <StyledImg src={asset.medias[0]?.url} alt='' />
                </Tooltip>
              ))}
              {assets?.length > 3 && (
                <StyledImgCount>
                  <Typography
                    value={`+${assets?.length - 3}`}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.lg}
                    customColor={'rgba(255, 255, 255, 0.8)'}
                  />
                </StyledImgCount>
              )}
            </StyledImgWrapper>
          </>
        )
      },
      resizable: true,
      headerComponentParams: {
        icon: (
          <StyledOutlineIcon>
            <Image />
          </StyledOutlineIcon>
        ),
      },
      minWidth: 200,
      width: 200,
    },

    {
      headerName: 'Collection',
      headerComponent: HeaderComponent,
      field: 'transaction_assets',
      filter: 'agTextColumnFilter',
      cellRenderer: CollectionRenderer,
      resizable: true,
      headerComponentParams: {
        icon: <Collection />,
      },
      minWidth: 180,
      width: 180,
    },
    {
      headerName: 'Blockchain',
      headerComponent: HeaderComponent,
      field: 'blockchain',
      filter: 'agTextColumnFilter',
      cellRenderer: TextCellRenderer,
      resizable: true,
      headerComponentParams: {
        icon: <TagsOutline />,
      },
      minWidth: 180,
      width: 180,
    },
    {
      headerName: 'Chain Name',
      headerComponent: HeaderComponent,
      field: 'chain_name',
      filter: 'agTextColumnFilter',
      cellRenderer: TextCellRenderer,
      resizable: true,
      headerComponentParams: {
        icon: <TagsOutline />,
      },
      minWidth: 200,
      width: 200,
    },
  ]
}

const StyledNameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  margin-top: 2px;
  gap: 15px;
`
const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 8px;
`
const StyledTag = styled(Tags)`
  text-decoration: underline;
`
const StyledLinkText = styled.div`
  text-decoration: underline;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  margin-top: 8px;

  cursor: pointer;
`
const StyledImg = styled.img`
  width: 35px;
  height: 35px;
`
const StyledImgWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;

  margin-top: 3px;
`
const StyledImgCount = styled.div`
  color: #fff;

  background: rgba(255, 255, 255, 0.2);

  border-radius: 2px;
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledTypeTag = styled(Tags)`
  min-width: 118px;
  display: flex;
  justify-content: center;
`
