import React from 'react'

import Typography from '@l3-lib/ui-core/dist/Typography'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import menuDots from '@l3-lib/ui-core/dist/icons/MenuDots'

import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'

import moment from 'moment'

type configTypes = {
  handleEditApiKey: (apiKey: unknown) => void
}

export default ({ handleEditApiKey }: configTypes) => {
  type RendererProps = {
    data(data: string): string
    value: string
  }
  const TextCellRenderer = (props: RendererProps) => (
    <div>
      <Typography
        value={props.value}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
        customColor='rgba(255, 255, 255, 1)'
      />
    </div>
  )

  const DateRenderer = (props: RendererProps) => {
    const value = props.value === null ? '-' : moment(props.value).fromNow()

    return (
      <Typography
        value={value}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
        customColor='rgba(255, 255, 255, 1)'
      />
    )
  }

  const MenuDotsCellRenderer = (props: RendererProps) => {
    const value = props.value === null ? '-' : moment(props.value).fromNow()
    // console.log('config', props)
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
            onClick={() => handleEditApiKey(props.data)}
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
