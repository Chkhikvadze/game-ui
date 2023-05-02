import Typography from '@l3-lib/ui-core/dist/Typography'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import menuDots from '@l3-lib/ui-core/dist/icons/MenuDots'
import TextType from '@l3-lib/ui-core/dist/icons/TextType'
import Id from '@l3-lib/ui-core/dist/icons/Id'
import Calendar from '@l3-lib/ui-core/dist/icons/Calendar'

import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'

import moment from 'moment'
import { StyledOutlineIcon } from 'pages/Asset/Assets/columnConfig'

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
      headerComponentParams: {
        icon: (
          <StyledOutlineIcon>
            <TextType />
          </StyledOutlineIcon>
        ),
      },
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
      headerComponentParams: {
        icon: (
          <StyledOutlineIcon>
            <Id />
          </StyledOutlineIcon>
        ),
      },
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
      headerComponentParams: {
        icon: (
          <StyledOutlineIcon>
            <Calendar />
          </StyledOutlineIcon>
        ),
      },
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
      headerComponentParams: {
        icon: (
          <StyledOutlineIcon>
            <Calendar />
          </StyledOutlineIcon>
        ),
      },
      // minWidth: 150,
      // width: 438,
    },
  ]
}
