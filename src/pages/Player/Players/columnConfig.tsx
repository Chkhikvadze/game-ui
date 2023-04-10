import { useRef, useState } from 'react'

import styled from 'styled-components'

import Tags from '@l3-lib/ui-core/dist/Tags'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import Badge from '@l3-lib/ui-core/dist/Badge'

import TextType from '@l3-lib/ui-core/dist/icons/TextType'
import NumberOutline from '@l3-lib/ui-core/dist/icons/NumberOutline'
import Image from '@l3-lib/ui-core/dist/icons/Image'
import Email from '@l3-lib/ui-core/dist/icons/Email'
import Open from '@l3-lib/ui-core/dist/icons/Open'

import MultiselectEditor from 'components/DataGrid/GridComponents/MultiselectEditor'
import TextFieldEditor from 'components/DataGrid/GridComponents/TextFieldEditor'

import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'
import useCheckboxRenderer from 'components/DataGrid/GridComponents/useCheckboxRenderer'
import TextareaEditor from 'components/DataGrid/GridComponents/TextareaEditor'
// import DatePickerEditor from 'components/DataGrid/GridComponents/DatePickerEditor'
// import moment from 'moment'

import atrImg from 'assets/avatars/attributesImg.png'
import MediasRenderer from 'components/DataGrid/GridComponents/MediasRenderer'

type configTypes = {
  // handleDelete: Function
  // cellEditFn: Function
  // customPropCols: any
  // assetOption: any
  // propertiesOptions: any
  // showProps: boolean
  // openEditAssetModal: (id: string) => void
  // handleUpdateMedia: (event: React.FormEvent<HTMLInputElement>, asset: any) => void
}

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
    const [nameIsEditable, setNameIsEditable] = useState(true)

    const { HeaderCheckbox, RowCheckbox } = useCheckboxRenderer()

    const TextCellRenderer = (p: any) => (
      <Typography
        value={p.value}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
        customColor='rgba(255, 255, 255, 0.8)'
      />
    )
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
        cellRenderer: TextCellRenderer,
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
    ]
  }

const StyledNameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 15px;
`
