import React from 'react'

import DropdownMenu from 'oldComponents/molecules/DropdownMenu'
import DropdownItem from 'oldComponents/molecules/DropdownItem'

import SorterDownArrow from 'assets/old/images/SvgComponents/SorterDownArrow'

import Typography from 'oldComponents/atoms/Typography'

import { StyledGroupContainer } from './SharedAccountsStyle'
import useSharedAccount from './useSharedAccount'
import checked_vector from 'assets/old/images/checked_vector.svg'
import * as Utils from 'utils'

const SharedAccounts = () => {
  const {userAccounts, handleAccountSelect, defaultAccount, account, currentAccount} = useSharedAccount()
  
  return (
	<DropdownMenu
	  labelClassName="header__drop__down"
	  trigger={
		<StyledGroupContainer gap={'8px'}>
		  <Typography variant="h5" color="#fff" weight={400}>
			Evenergi
		  </Typography>
		  &nbsp;&nbsp;
		  <SorterDownArrow color="#fff"/>
		</StyledGroupContainer>
	  }
	>
	  {(toggle) => (
		<>
		  <DropdownItem
			fontSize={13}
			label={<div style={{color:'#000000'}}>{account.organisation_name}</div>}
			subLabel={<div style={{
			  width:'100%', display:'flex', justifyContent:'space-between',
			  // eslint-disable-next-line jsx-a11y/alt-text
			  alignItems:'center'
			}}><span>Your organization</span> {account.id === currentAccount.id &&
                <img src={checked_vector} width="20px"/>} </div>}
			onClick={() => defaultAccount()}
			width={230}
		  />
		  
		  {userAccounts.map((item: any) => (
			<DropdownItem
			  key={item.id}
			  fontSize={13}
			  label={<div style={{color:'#000000'}}>{item.assigned_account_name}</div>}
			  subLabel={<div style={{
				width:'100%', display:'flex', justifyContent:'space-between',
				// eslint-disable-next-line jsx-a11y/alt-text
				alignItems:'center'
			  }}>
				<span>Shared by: {Utils.strCutter(item.creator_user_email, 20, true)}</span> {item.assigned_account_id === currentAccount.id &&
                  <img src={checked_vector} width="20px"/>} </div>}
			  onClick={() => handleAccountSelect(item)}
			  width={230}
			/>
		  
		  ))}
		</>
	  )}
	</DropdownMenu>
  )
}

export default SharedAccounts
