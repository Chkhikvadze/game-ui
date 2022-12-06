import React from 'react'

import DropdownMenu from 'oldComponents/molecules/DropdownMenu'
import DropdownItem from 'oldComponents/molecules/DropdownItem'

import BellIcon from 'assets/old/images/SvgComponents/BellIcon'

import {
  StyledNotificationItem,
  StyledReceiverName,
  StyledRSenderName,
  StyledAccountName,
  StyledItemContainer,
} from './NotificationStyle'

const Notification = () => (
  <DropdownMenu
    labelClassName="header__drop__down"
    trigger={
	  <div>
        <BellIcon/>
	  </div>
    }
  >
    {(toggle) => (
	  <>
        <StyledItemContainer>
		  <DropdownItem width={400} label="" fontSize={13} onClick={() => {
		  }}>
            <StyledNotificationItem>
			  <StyledReceiverName>Hi Tom &#128075;</StyledReceiverName>
			  <StyledRSenderName>Paul Walker</StyledRSenderName> has provided access to:
			  <StyledAccountName> Tbilisi Fleet </StyledAccountName>
			  account.
			  <div>
				You will be able to view to the organisation's account by switching the fleet from
				the top right bar where the organisation name is shown
			  </div>
            </StyledNotificationItem>
		  </DropdownItem>
        </StyledItemContainer>
		
        <StyledItemContainer>
		  <DropdownItem width={400} label="" fontSize={13} onClick={() => {
		  }}>
            <StyledNotificationItem>
			  <StyledReceiverName>Hi Tom &#128075;</StyledReceiverName>
			  <StyledRSenderName>John Walker</StyledRSenderName> has provided access to:
			  <StyledAccountName> Auto Motive </StyledAccountName>
			  account.
			  <div>
				You will be able to view to the organisation's account by switching the fleet from
				the top right bar where the organisation name is shown
			  </div>
            </StyledNotificationItem>
		  </DropdownItem>
        </StyledItemContainer>
	  </>
    )}
  </DropdownMenu>
)

export default Notification
