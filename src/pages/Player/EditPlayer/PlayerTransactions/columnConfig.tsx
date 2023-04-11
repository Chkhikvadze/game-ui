import styled from 'styled-components'

import Tags from '@l3-lib/ui-core/dist/Tags'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'

import TextType from '@l3-lib/ui-core/dist/icons/TextType'
import NumberOutline from '@l3-lib/ui-core/dist/icons/NumberOutline'
import Switch from '@l3-lib/ui-core/dist/icons/Switch'
import TagsOutline from '@l3-lib/ui-core/dist/icons/TagsOutline'
import Copy from '@l3-lib/ui-core/dist/icons/Copy'
import StarOutline from '@l3-lib/ui-core/dist/icons/StarOutline'
import Open from '@l3-lib/ui-core/dist/icons/Open'

import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'
// import useCheckboxRenderer from 'components/DataGrid/GridComponents/useCheckboxRenderer'

import atrImg from 'assets/avatars/attributesImg.png'

import { Link } from 'react-router-dom'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  // const { HeaderCheckbox, RowCheckbox } = useCheckboxRenderer()

  const TextCellRenderer = (p: any) => (
    <StyledTextWrapper>
      <Typography
        value={p.value}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
        customColor='rgba(255, 255, 255, 0.8)'
      />
    </StyledTextWrapper>
  )

  const FromRenderer = (p: any) => {
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

  const ToRenderer = (p: any) => {
    return (
      <StyledDiv>
        <StyledTag
          label={p.value}
          size='small'
          outlined={true}
          readOnly
          color={'white'}
          leftIcon={Copy}
        />
      </StyledDiv>
    )
  }

  const TypeRenderer = (p: any) => {
    const { value } = p
    let color = 'gradient_green'
    if (value === 'Burn') {
      color = 'gradient_orange'
    } else if (value === 'Mint' || value === 'Airdrop' || value === 'Whitelisted') {
      color = 'gradient_yellow'
    }

    return (
      <StyledDiv>
        <Tags label={p.value} readOnly size={'small'} color={color} />
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
      field: 'transaction',
      filter: 'agTextColumnFilter',
      cellRenderer: TextCellRenderer,
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
      cellRenderer: FromRenderer,
      resizable: true,
      headerComponentParams: {
        icon: <Switch />,
      },
      minWidth: 150,
      width: 150,
    },
    {
      headerName: 'To',
      headerComponent: HeaderComponent,
      field: 'to',
      filter: 'agTextColumnFilter',
      cellRenderer: ToRenderer,
      resizable: true,
      headerComponentParams: {
        icon: <Switch />,
      },
      minWidth: 150,
      width: 150,
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
const StyledTextWrapper = styled.div`
  text-decoration: underline;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  margin-top: 8px;
`
