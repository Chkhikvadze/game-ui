import { Link } from 'react-router-dom'

import styled from 'styled-components'

import Tags from '@l3-lib/ui-core/dist/Tags'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'

import TextType from '@l3-lib/ui-core/dist/icons/TextType'
import NumberOutline from '@l3-lib/ui-core/dist/icons/NumberOutline'
import Image from '@l3-lib/ui-core/dist/icons/Image'
import Email from '@l3-lib/ui-core/dist/icons/Email'
import Copy from '@l3-lib/ui-core/dist/icons/Copy'
import Open from '@l3-lib/ui-core/dist/icons/Open'
import Calendar from '@l3-lib/ui-core/dist/icons/Calendar'
import Id from '@l3-lib/ui-core/dist/icons/Id'

import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'
import useCheckboxRenderer from 'components/DataGrid/GridComponents/useCheckboxRenderer'

import {
  StyledNameCell,
  StyledOpenEditDiv,
  StyledOutlineIcon,
} from 'pages/Asset/Assets/columnConfig'

import atrImg from 'assets/avatars/attributesImg.png'

import { shortenAddress } from 'utils/format'
import { useWalletByPlayerService } from 'services/useWalletService'
import { usePlayerByIdService } from 'services/usePlayerService'
import { usePlayerAssetsByCollectionsService } from 'services/usePlayerAssetService'

import moment from 'moment'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const { HeaderCheckbox, RowCheckbox } = useCheckboxRenderer()

  const TextCellRenderer = (props: any) => (
    <Typography
      value={props.value}
      type={Typography.types.LABEL}
      size={Typography.sizes.sm}
      customColor='rgba(255, 255, 255, 0.8)'
    />
  )

  const DateRenderer = (props: any) => {
    const value = props?.value === null ? '-' : moment(props?.value).fromNow()

    return (
      <Typography
        value={value}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor='rgba(255, 255, 255, 0.8)'
      />
    )
  }

  const UserIdRenderer = (props: any) => {
    const { value, data } = props

    return (
      <StyledNameCell>
        <Typography
          value={value}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='rgba(255, 255, 255, 0.8)'
        />
        <StyledLink to={`/player/${data?.id}/general`}>
          <StyledOpenEditDiv className='editAction'>
            <Open />
          </StyledOpenEditDiv>
        </StyledLink>
      </StyledNameCell>
    )
  }

  const NameRenderer = (props: any) => {
    const { value, data } = props

    return (
      <StyledNameWrapper>
        <Avatar
          size={Avatar.sizes.SMALL}
          src={data?.avatar || atrImg}
          type={Avatar.types.IMG}
          rectangle
        />
        <Typography
          value={value}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='rgba(255, 255, 255, 0.8)'
        />
      </StyledNameWrapper>
    )
  }

  const AssetCountRenderer = (props: any) => {
    const { value: id } = props
    const { data: playerById } = usePlayerByIdService({ id: id })
    const { game_id } = playerById

    const { data: playerAssetsByCollections } = usePlayerAssetsByCollectionsService({
      game_id: game_id,
      player_id: id,
    })
    const { total_player_assets } = playerAssetsByCollections

    return (
      <StyledDiv>
        <Typography
          value={total_player_assets}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='rgba(255, 255, 255, 0.8)'
        />
      </StyledDiv>
    )
  }

  const WalletIdRenderer = (props: any) => {
    const { value: id } = props
    const { data: walletByPlayer } = useWalletByPlayerService({
      player_id: id,
    })

    const { address } = walletByPlayer

    return (
      <>
        {address ? (
          <StyledDiv>
            <StyledTag
              label={address && shortenAddress(address)}
              size='small'
              outlined={true}
              readOnly
              isClickable
              noAnimation
              color={'white'}
              leftIcon={() => (
                <StyledCopyIcon
                  onClick={() => {
                    navigator.clipboard.writeText(address)
                  }}
                >
                  <Copy />
                </StyledCopyIcon>
              )}
            />
          </StyledDiv>
        ) : (
          <div>-</div>
        )}
      </>
    )
  }

  // const ScoreRenderer = () => {
  //   return (
  //     <StyledDiv>
  //       <StyledTag
  //         label='899'
  //         size='small'
  //         outlined={true}
  //         readOnly
  //         color={'white'}
  //         leftIcon={StarOutline}
  //       />
  //     </StyledDiv>
  //   )
  // }

  return [
    {
      headerComponent: HeaderCheckbox,
      cellRenderer: RowCheckbox,
      width: 60,
      minWidth: 60,
    },
    {
      headerName: 'User ID',
      headerComponent: HeaderComponent,
      field: 'unique_id',
      filter: 'agTextColumnFilter',
      cellRenderer: UserIdRenderer,
      resizable: true,
      headerComponentParams: {
        icon: <NumberOutline />,
      },
      minWidth: 200,
      width: 300,
    },
    {
      headerName: 'Name',
      headerComponent: HeaderComponent,
      field: 'name',
      filter: 'agTextColumnFilter',
      cellRenderer: NameRenderer,
      resizable: true,
      headerComponentParams: {
        icon: (
          <StyledOutlineIcon>
            <TextType />
          </StyledOutlineIcon>
        ),
      },
      minWidth: 200,
      width: 300,
    },
    {
      headerName: 'Walled ID',
      headerComponent: HeaderComponent,
      field: 'id',
      filter: 'agTextColumnFilter',
      cellRenderer: WalletIdRenderer,
      resizable: true,
      headerComponentParams: {
        icon: (
          <StyledOutlineIcon>
            <Id />
          </StyledOutlineIcon>
        ),
      },
      minWidth: 170,
      width: 170,
    },
    {
      headerName: 'Assets Own',
      headerComponent: HeaderComponent,
      field: 'id',
      filter: 'agTextColumnFilter',
      cellRenderer: AssetCountRenderer,
      resizable: true,
      headerComponentParams: {
        icon: (
          <StyledOutlineIcon>
            <Image />
          </StyledOutlineIcon>
        ),
      },
      minWidth: 190,
      width: 190,
    },
    // {
    //   headerName: 'Score',
    //   headerComponent: HeaderComponent,
    //   field: 'unique_id',
    //   filter: 'agTextColumnFilter',
    //   cellRenderer: ScoreRenderer,
    //   resizable: true,
    //   headerComponentParams: {
    //     icon: <NumberOutline />,
    //   },
    //   minWidth: 150,
    //   width: 150,
    // },
    {
      headerName: 'Username',
      headerComponent: HeaderComponent,
      field: 'username',
      filter: 'agTextColumnFilter',
      cellRenderer: TextCellRenderer,
      resizable: true,
      headerComponentParams: {
        icon: (
          <StyledOutlineIcon>
            <TextType />
          </StyledOutlineIcon>
        ),
      },
      minWidth: 200,
      width: 300,
    },
    {
      headerName: 'Email',
      field: 'email',
      headerComponent: HeaderComponent,
      filter: 'agTextColumnFilter',
      cellRenderer: TextCellRenderer,
      resizable: true,
      headerComponentParams: {
        icon: <Email />,
      },
      minWidth: 200,
      width: 300,
    },
    {
      headerName: 'Created',
      headerComponent: HeaderComponent,
      field: 'created_on',
      filter: 'agTextColumnFilter',
      cellRenderer: DateRenderer,
      headerComponentParams: {
        icon: (
          <StyledOutlineIcon>
            <Calendar />
          </StyledOutlineIcon>
        ),
      },
      minWidth: 150,
      width: 150,
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
const StyledLink = styled(Link)`
  color: unset;
`
export const StyledCopyIcon = styled.div`
  width: 18px;
  height: 10px;
  cursor: pointer;

  display: flex;
  align-items: center;
`
