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
      headerName: (
        <Typography
          value='Name'
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='rgba(255, 255, 255, 1)'
        />
      ),
      headerComponent: HeaderComponent,
      field: 'name',
      filter: 'agTextColumnFilter',
      cellRenderer: TextCellRenderer,

      // minWidth: 150,
      // width: 350,
    },
    {
      headerName: (
        <Typography
          value='Token'
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='rgba(255, 255, 255, 1)'
        />
      ),
      headerComponent: HeaderComponent,
      field: 'token',
      filter: 'agTextColumnFilter',
      cellRenderer: TextCellRenderer,

      // minWidth: 150,
      // width: 460,
    },
    {
      headerName: (
        <Typography
          value='Last used'
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='rgba(255, 255, 255, 1)'
        />
      ),
      headerComponent: HeaderComponent,
      field: 'last_used',
      filter: 'agTextColumnFilter',
      cellRenderer: DateRenderer,

      // minWidth: 150,
      // width: 438,
    },
    {
      headerName: (
        <Typography
          value='Created'
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='rgba(255, 255, 255, 1)'
        />
      ),
      headerComponent: HeaderComponent,
      field: 'created_on',
      filter: 'agTextColumnFilter',
      cellRenderer: MenuDotsCellRenderer,

      // minWidth: 150,
      // width: 438,
    },
  ]
}
