import React from 'react'

import Typography from '@l3-lib/ui-core/dist/Typography'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import menuDots from '@l3-lib/ui-core/dist/icons/MenuDots'

import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'

import moment from 'moment'

type configTypes = {
  handleEditApiKey: any
}

export default ({ handleEditApiKey }: configTypes) => {
  const TextCellRenderer = (p: any) => (
    <div>
      <Typography
        value={p.value}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
        customColor='rgba(255, 255, 255, 1)'
      />
    </div>
  )

  const DateRenderer = (p: any) => {
    console.log(p.value)
    let value
    if (p.value === undefined) {
      value = '-'
    } else {
      value = moment(p.value).fromNow()
    }
    return (
      <Typography
        value={value}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
        customColor='rgba(255, 255, 255, 1)'
      />
    )
  }

  const MenuDotsCellRenderer = (p: any) => {
    let value
    if (p.value === undefined) {
      value = '-'
    } else {
      value = moment(p.value).fromNow()
    }

    return (
      <div>
        <div
          style={{
            display: 'flex',
            position: 'relative',
            float: 'right',
          }}
        >
          <IconButton
            icon={menuDots}
            kind={IconButton.kinds.TERTIARY}
            size={IconButton.sizes.LARGE}
            onClick={() => handleEditApiKey(p.data)}
          />
        </div>
        <Typography
          value={value}
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
          customColor='rgba(255, 255, 255, 1)'
        />
      </div>
    )
  }

  return [
    {
      headerName: 'Name',
      headerComponent: HeaderComponent,
      field: 'name',
      filter: 'agTextColumnFilter',
      cellRenderer: TextCellRenderer,
      minWidth: 150,
      width: 300,
    },
    {
      headerName: 'Token',
      headerComponent: HeaderComponent,
      field: 'token',
      filter: 'agTextColumnFilter',
      cellRenderer: TextCellRenderer,
      minWidth: 700,
    },
    {
      headerName: 'Last used',
      headerComponent: HeaderComponent,
      field: 'last_used',
      filter: 'agTextColumnFilter',
      cellRenderer: DateRenderer,
      minWidth: 320,
    },
    {
      headerName: 'Created',
      headerComponent: HeaderComponent,
      field: 'created_on',
      filter: 'agTextColumnFilter',
      cellRenderer: MenuDotsCellRenderer,
      minWidth: 320,
    },
  ]
}
