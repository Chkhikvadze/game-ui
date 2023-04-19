import styled from 'styled-components'

import Tags from '@l3-lib/ui-core/dist/Tags'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'

import TextType from '@l3-lib/ui-core/dist/icons/TextType'
import NumberOutline from '@l3-lib/ui-core/dist/icons/NumberOutline'
import Image from '@l3-lib/ui-core/dist/icons/Image'
import Email from '@l3-lib/ui-core/dist/icons/Email'
import Copy from '@l3-lib/ui-core/dist/icons/Copy'
import StarOutline from '@l3-lib/ui-core/dist/icons/StarOutline'
import Open from '@l3-lib/ui-core/dist/icons/Open'

import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'
import useCheckboxRenderer from 'components/DataGrid/GridComponents/useCheckboxRenderer'

import atrImg from 'assets/avatars/attributesImg.png'
import { StyledNameCell, StyledOpenEditDiv } from 'pages/Asset/Assets/columnConfig'
import { Link } from 'react-router-dom'
import moment from 'moment'

// type configTypes = {
//   handleDelete: Function
//   cellEditFn: Function
//   customPropCols: any
//   assetOption: any
//   propertiesOptions: any
//   showProps: boolean
//   openEditAssetModal: (id: string) => void
//   handleUpdateMedia: (event: React.FormEvent<HTMLInputElement>, asset: any) => void
// }

// eslint-disable-next-line import/no-anonymous-default-export
export default () =>
  //   {
  //   cellEditFn,
  //   customPropCols,
  //   // addBlankRow,
  //   assetOption,
  //   propertiesOptions,
  //   showProps,
  //   handleUpdateMedia,
  //   openEditAssetModal,
  // }: configTypes
  {
    const { HeaderCheckbox, RowCheckbox } = useCheckboxRenderer()

    const TextCellRenderer = (p: any) => (
      <Typography
        value={p.value}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
        customColor='rgba(255, 255, 255, 0.8)'
      />
    )

    const DateRenderer = (p: any) => {
      const value = p.value === null ? '-' : moment(p.value).fromNow()
      return (
        <Typography
          value={value}
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
          customColor='rgba(255, 255, 255, 0.8)'
        />
      )
    }

    const UserIdRenderer = (p: any) => {
      return (
        <StyledNameCell>
          <Typography
            value={p.value}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
            customColor='rgba(255, 255, 255, 0.8)'
          />
          <StyledLink to={`/player/${p.data.id}/general`}>
            <StyledOpenEditDiv className='editAction'>
              <Open />
            </StyledOpenEditDiv>
          </StyledLink>
        </StyledNameCell>
      )
    }

    const NameRenderer = (p: any) => {
      return (
        <StyledNameWrapper>
          <Avatar
            size={Avatar.sizes.SMALL}
            src={p.data?.avatar || atrImg}
            type={Avatar.types.IMG}
            rectangle
          />
          <Typography
            value={p.value}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
            customColor='rgba(255, 255, 255, 0.8)'
          />
        </StyledNameWrapper>
      )
    }

    const AssetCountRenderer = () => {
      return (
        <StyledDiv>
          <Typography
            value={'123'}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
            customColor='rgba(255, 255, 255, 0.8)'
          />
        </StyledDiv>
      )
    }

    const WalletIdRenderer = () => {
      return (
        <StyledDiv>
          <StyledTag
            label='ut73...21Be'
            size='small'
            outlined={true}
            readOnly
            color={'white'}
            leftIcon={Copy}
          />
        </StyledDiv>
      )
    }
    const ScoreRenderer = () => {
      return (
        <StyledDiv>
          <StyledTag
            label='899'
            size='small'
            outlined={true}
            readOnly
            color={'white'}
            leftIcon={StarOutline}
          />
        </StyledDiv>
      )
    }

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
          icon: <TextType />,
        },
        minWidth: 200,
        width: 300,
      },
      {
        headerName: 'Walled ID',
        headerComponent: HeaderComponent,
        field: 'unique_id',
        filter: 'agTextColumnFilter',
        cellRenderer: WalletIdRenderer,
        resizable: true,
        headerComponentParams: {
          icon: <NumberOutline />,
        },
        minWidth: 170,
        width: 170,
      },
      {
        headerName: 'Assets Own',
        headerComponent: HeaderComponent,
        field: 'unique_id',
        filter: 'agTextColumnFilter',
        cellRenderer: AssetCountRenderer,
        resizable: true,
        headerComponentParams: {
          icon: <Image />,
        },
        minWidth: 190,
        width: 190,
      },
      {
        headerName: 'Score',
        headerComponent: HeaderComponent,
        field: 'unique_id',
        filter: 'agTextColumnFilter',
        cellRenderer: ScoreRenderer,
        resizable: true,
        headerComponentParams: {
          icon: <NumberOutline />,
        },
        minWidth: 150,
        width: 150,
      },
      {
        headerName: 'Username',
        headerComponent: HeaderComponent,
        field: 'username',
        filter: 'agTextColumnFilter',
        cellRenderer: TextCellRenderer,
        resizable: true,
        headerComponentParams: {
          icon: <TextType />,
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
