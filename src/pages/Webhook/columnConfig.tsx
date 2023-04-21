import React from 'react'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Icon from '@l3-lib/ui-core/dist/Icon'
import Tags from '@l3-lib/ui-core/dist/Tags'

import Web from '@l3-lib/ui-core/dist/icons/Web'

import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'

import moment from 'moment'

export default () => {
  type RendererProps = {
    webhooks(data: string): string
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

  const TypeCellRenderer = (props: RendererProps) => {
    const value = props.value === null && 'Account'
    return (
      <div>
        <Typography
          value={value}
          type={Typography.types.LABEL}
          size={Typography.sizes.md}
          customColor='rgba(255, 255, 255, 1)'
        />
      </div>
    )
  }

  const UrlCellRenderer = (props: RendererProps) => (
    <div
      style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '5px' }}
    >
      <Icon iconType={Icon.type.SVG} icon={Web} iconLabel='my bolt svg icon' iconSize={20} />
      <Typography
        value={props.value}
        type={Typography.types.LABEL}
        size={Typography.sizes.md}
        customColor='rgba(255, 255, 255, 1)'
      />
    </div>
  )

  const ErrorRateCellRenderer = (props: RendererProps) => {
    const value = props.value === null && '0%'
    return (
      <Typography
        value={value}
        type={Typography.types.LABEL}
        size={Typography.sizes.md}
        customColor='rgba(255, 255, 255, 1)'
      />
    )
  }

  const StatusCellRenderer = (props: RendererProps) => {
    const value = props.value === null && (
      <Tags
        label={
          <Typography
            value='Active'
            type={Typography.types.LABEL}
            size={Typography.sizes.xss}
            customColor='rgba(0, 0, 0, 0.7)'
          />
        }
        readOnly
        color={Tags.colors.gradient_green}
      />
    )
    return (
      <Typography
        value={value}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
        customColor='rgba(255, 255, 255, 1)'
      />
    )
  }

  return [
    {
      headerName: 'URL',
      headerComponent: HeaderComponent,
      field: 'url',
      filter: 'agTextColumnFilter',
      cellRenderer: UrlCellRenderer,
      sortable: true,
      minWidth: 800,
      //   width: 850,
    },
    {
      headerName: 'Type',
      headerComponent: HeaderComponent,
      field: 'game_id',
      filter: 'agTextColumnFilter',
      cellRenderer: TypeCellRenderer,
      minWidth: 150,
      //   width: 160,
    },
    {
      headerName: 'Description',
      headerComponent: HeaderComponent,
      field: 'description',
      filter: 'agTextColumnFilter',
      cellRenderer: TextCellRenderer,
      minWidth: 300,
      //   width: 360,
    },
    {
      headerName: 'Error rate',
      headerComponent: HeaderComponent,
      field: 'transaction_id',
      filter: 'agTextColumnFilter',
      cellRenderer: ErrorRateCellRenderer,
      minWidth: 150,
      //   width: 120,
    },
    {
      headerName: 'Status',
      headerComponent: HeaderComponent,
      field: 'status',
      filter: 'agTextColumnFilter',
      cellRenderer: StatusCellRenderer,
      minWidth: 150,
      //   width: 195,
    },
  ]
}
