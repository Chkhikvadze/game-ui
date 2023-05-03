import styled from 'styled-components'

import Tags from '@l3-lib/ui-core/dist/Tags'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'

import TextType from '@l3-lib/ui-core/dist/icons/TextType'
import NumberOutline from '@l3-lib/ui-core/dist/icons/NumberOutline'
import Switch from '@l3-lib/ui-core/dist/icons/Switch'
import TagsOutline from '@l3-lib/ui-core/dist/icons/TagsOutline'
import Copy from '@l3-lib/ui-core/dist/icons/Copy'
import Image from '@l3-lib/ui-core/dist/icons/Image'
import Open from '@l3-lib/ui-core/dist/icons/Open'

import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'
// import useCheckboxRenderer from 'components/DataGrid/GridComponents/useCheckboxRenderer'

import atrImg from 'assets/avatars/attributesImg.png'

import { Link } from 'react-router-dom'
import { StyledOutlineIcon } from 'pages/Asset/Assets/columnConfig'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  // const { HeaderCheckbox, RowCheckbox } = useCheckboxRenderer()

  const TextCellRenderer = (p: any) => (
    <Typography
      value={p.value}
      type={Typography.types.LABEL}
      size={Typography.sizes.lg}
      customColor='rgba(255, 255, 255, 0.8)'
    />
  )
  const TransactionIdCellRenderer = (p: any) => (
    <StyledTextWrapper>
      <Typography
        value={p.value}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
        customColor='rgba(255, 255, 255, 0.8)'
      />
    </StyledTextWrapper>
  )

  // const MediaRenderer = (p: any) => (

  // )

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
      field: 'id',
      filter: 'agTextColumnFilter',
      cellRenderer: TransactionIdCellRenderer,
      resizable: true,
      headerComponentParams: {
        icon: <NumberOutline />,
      },
      minWidth: 400,
      width: 400,
    },
    {
      headerName: 'From',
      headerComponent: HeaderComponent,
      field: 'from',
      filter: 'agTextColumnFilter',
      cellRenderer: ToRenderer,
      resizable: true,
      headerComponentParams: {
        icon: <Switch />,
      },
      minWidth: 400,
      width: 400,
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
      minWidth: 400,
      width: 400,
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
      minWidth: 170,
      width: 170,
    },
    {
      headerName: 'Asset(s)',
      headerComponent: HeaderComponent,
      field: 'transaction_assets',
      filter: 'agTextColumnFilter',
      cellRenderer: (p: any) => {
        const mediaUrls = p.value.map((item: any) => item.asset?.medias[0]?.url)
        // let mediaUrls: any
        // p?.value?.map((item: any) => {
        //   const medias = item?.asset?.medias
        //   mediaUrls = medias.map((media: any) => {
        //     return media.url
        //   })
        // })

        return (
          <>
            <StyledImgWrapper>
              {mediaUrls?.slice(0, 3).map((url: string) => (
                <StyledImg src={url} alt='' key={url} />
              ))}
              {mediaUrls?.length > 3 && (
                <StyledImgCount>
                  <Typography
                    value={`+${mediaUrls?.length - 3}`}
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
      headerName: 'Blockchain',
      headerComponent: HeaderComponent,
      field: 'blockchain',
      filter: 'agTextColumnFilter',
      cellRenderer: TextCellRenderer,
      resizable: true,
      headerComponentParams: {
        icon: <TagsOutline />,
      },
      minWidth: 200,
      width: 200,
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
const StyledTextWrapper = styled.div`
  text-decoration: underline;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  margin-top: 8px;
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
