import React from 'react'
import styled from 'styled-components'
import { actionButton } from 'oldComponents/atoms/CustomTable/TableActions'

import { TableActions } from 'oldComponents/atoms/CustomTable'

const ActionDots = styled.div`
  margin: 0 12px;
`

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ handleEditApiKey }: any) => [
  { name: 'Name', dataKey: 'name' },
  { name: 'Token', dataKey: 'token' },
  { name: 'Note', dataKey: 'note' },
  // { name: 'Expiration', dataKey: 'expiration' },
  {
    name: <ActionDots />,
    dataKey: (row: any) => (
      <TableActions>
        {actionButton({
          label: 'Edit',
          width: 120,
          onClick: () => handleEditApiKey(row),
        })}
      </TableActions>
    ),
  },
]
