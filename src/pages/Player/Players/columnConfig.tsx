import React from 'react'
import styled from 'styled-components'
import { actionButton } from 'oldComponents/atoms/CustomTable/TableActions'
import { TableActions } from 'oldComponents/atoms/CustomTable'
import moment from 'moment'
// import { Link } from "react-router-dom";

const ActionDots = styled.div`
  margin: 0 12px;
`

type configTypes = {
  handleDelete: Function
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ handleDelete }: configTypes) => [
  { name: 'Unique ID', dataKey: 'unique_id' },
  { name: 'Created', dataKey: (row: any) => moment(row.created_on).fromNow() },
  { name: 'Name', dataKey: 'name' },
  {
    name: <ActionDots />,
    dataKey: (row: any) => (
      <TableActions>
        {actionButton({
          label: 'Delete',
          width: 120,
          onClick: () => handleDelete(row),
        })}
      </TableActions>
    ),
  },
]
