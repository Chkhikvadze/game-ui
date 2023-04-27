import React, { useMemo } from 'react'

import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Heading from '@l3-lib/ui-core/dist/Heading'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import menuDots from '@l3-lib/ui-core/dist/icons/MenuDots'

import PersonaIcon from '@l3-lib/ui-core/dist/icons/Person'
import EmailIcon from '@l3-lib/ui-core/dist/icons/Email'
import DragIcon from '@l3-lib/ui-core/dist/icons/Drag'
import EventIcon from '@l3-lib/ui-core/dist/icons/Event'
import UserStatusIcon from '@l3-lib/ui-core/dist/icons/UserStatus'

import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'

import moment from 'moment'
import useCheckboxRenderer from 'components/DataGrid/GridComponents/useCheckboxRenderer'

export default () => {
  type RendererProps = {
    teams(data: string): string
    value: string
  }

  const { HeaderCheckbox, RowCheckbox } = useCheckboxRenderer()
  const TextCellRenderer = (props: RendererProps) => (
    <div>
      <Typography
        value={props.value}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
        customColor='rgba(255, 255, 255, 0.8)'
      />
    </div>
  )

  const NameCellRenderer = (props: RendererProps) => {
    const value = props.value
    console.log(value)
    return (
      <div>
        <Typography
          value={value}
          type={Typography.types.LABEL}
          size={Typography.sizes.md}
          customColor='#FFFFFF'
        />
      </div>
    )
  }

  const DateRenderer = (props: RendererProps) => {
    const value =
      props.value === null ? '-' : moment(parseInt(props.value, 10)).format('MMM DD, YYYY')
    // console.log('value::', parseInt(props.value, 10))
    return (
      <Typography
        value={value}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
        customColor='rgba(255, 255, 255, 0.8)'
      />
    )
  }

  // const MenuDotsCellRenderer = (props: RendererProps) => {
  //   return (
  //     <div
  //     // style={{
  //     //   display: 'flex',
  //     //   position: 'relative',
  //     //   float: 'right',
  //     // }}
  //     >
  //       <IconButton
  //         icon={menuDots}
  //         kind={IconButton.kinds.TERTIARY}
  //         size={IconButton.sizes.small}
  //         shape='square'
  //         onClick={() => handleDeleteAccount()}
  //       />
  //     </div>
  //   )
  // }

  // const checkboxCol = useMemo(() => {
  //   return {
  //     // headerCheckboxSelection: true,
  //     // checkboxSelection: true,
  //     headerComponent: HeaderCheckbox,
  //     cellRenderer: RowCheckbox,
  //     width: 70,
  //     minWidth: 70,
  //     headerComponentParams: {
  //       icon: <DragIcon />,
  //     },
  //     // field: 'id',
  //     // suppressSizeToFit: true,
  //   }
  // }, [])

  return [
    // checkboxCol,
    {
      headerName: (
        <StyledHeading type={Heading.types.h1} value='Name' size='small' customColor={'#FFFFFF'} />
      ),
      headerComponent: HeaderComponent,
      valueGetter: 'data.assigned_user_first_name + " " + data.assigned_user_last_name',
      filter: 'agTextColumnFilter',
      // resizable: true,
      cellRenderer: NameCellRenderer,

      minWidth: 200,
      width: 330,
      headerComponentParams: {
        icon: <PersonaIcon />,
      },
    },
    {
      headerName: (
        <StyledHeading type={Heading.types.h1} value='Email' size='small' customColor={'#FFFFFF'} />
      ),
      headerComponent: HeaderComponent,
      field: 'assigned_user_email',
      filter: 'agTextColumnFilter',
      cellRenderer: TextCellRenderer,
      // resizable: true,
      headerComponentParams: {
        icon: <EmailIcon />,
      },

      minWidth: 200,
      width: 530,
    },
    {
      headerName: (
        <StyledHeading type={Heading.types.h1} value='Role' size='small' customColor={'#FFFFFF'} />
      ),
      headerComponent: HeaderComponent,
      field: 'assigned_user_role',
      filter: 'agTextColumnFilter',
      // resizable: true,
      cellRenderer: TextCellRenderer,

      minWidth: 200,
      width: 370,
      headerComponentParams: {
        icon: <UserStatusIcon />,
      },
    },
    {
      headerName: (
        <StyledHeading
          type={Heading.types.h1}
          value='Join date'
          size='small'
          customColor={'#FFFFFF'}
        />
      ),
      headerComponent: HeaderComponent,
      field: 'assigned_user_created_on',
      filter: 'agTextColumnFilter',
      // resizable: true,
      cellRenderer: DateRenderer,

      minWidth: 200,
      width: 430,
      headerComponentParams: {
        icon: <EventIcon />,
      },
    },
  ]
}

const StyledHeading = styled(Heading)`
  font-family: 'Circular Std';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #ffffff;
`

// import React from 'react'
// import styled from 'styled-components'
// import { actionButton } from 'oldComponents/atoms/CustomTable/TableActions'

// import { TableActions } from 'oldComponents/atoms/CustomTable'

// const ActionDots = styled.div`
//   margin: 0 12px;
// `

// // eslint-disable-next-line import/no-anonymous-default-export
// export default ({ handleDeleteAccountAccess, disabled }: any) => [
//   { name: 'Email addresses', dataKey: 'assigned_user_email' },
//   {
//     name: <ActionDots />,
//     dataKey: (row: any) => (
//       <TableActions>
//         {actionButton({
//           label: 'Delete',
//           width: 120,
//           color: disabled ? '#DC3545' : '#d58e96',
//           onClick: () => handleDeleteAccountAccess(row),
//         })}
//       </TableActions>
//     ),
//   },
// ]
