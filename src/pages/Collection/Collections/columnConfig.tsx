import React from 'react'
import styled from 'styled-components'
import { actionButton } from 'oldComponents/atoms/CustomTable/TableActions'
import { TableActions } from 'oldComponents/atoms/CustomTable'
import { Link } from 'react-router-dom'

const ActionDots = styled.div`
  margin: 0 12px;
`


type configTypes = {
  handleDelete: Function
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({handleDelete}: configTypes) => [
  {name:'Name', dataKey:(row: any) => <Link to={`/collection/${row.id}/nfts`}>{row.name}</Link>},
  {name:'Description', dataKey:'description'},
  {name:'Category', dataKey:'category'},
  // { name: 'Expiration', dataKey: 'expiration' },
  {
	name:<ActionDots/>,
	dataKey:(row: any) => (
	  <TableActions>
		{actionButton({
		  label:'Delete',
		  width:120,
		  onClick:() => handleDelete(row),
		})}
	  </TableActions>
	),
  },
]
