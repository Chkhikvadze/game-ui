import React from 'react'
import {
  StyledRoot,
  StyledHeading,
  StyledDropDownMenuContainer,
  StyledTrigger,
  StyledImage,
} from './ViewUserStyle'
import ViewUserInfo from './ViewUserInfo'
import { useNavigate, useParams } from 'react-router-dom'
import { useAccountByIdService, useUserByIdService } from 'services'
// import Typography from 'bf-ui/dist/Typography'
// import DropdownItem from 'molecules/DropdownItem'
// import DropdownMenu from 'molecules/DropdownMenu'
import { useModal } from 'hooks'
// import DeleteIcon from "assets/images/deleteblack.svg"
import Loader from 'atoms/Loader'
import Typography from 'oldComponents/atoms/Typography'
import DropdownMenu from 'oldComponents/molecules/DropdownMenu'
import DropdownItem from 'oldComponents/molecules/DropdownItem'
// import { truck, folderplus, IconArrowDown } from 'assets/images/navbar/index'
// import SpinnerLoader from 'bf-ui/dist/SpinnerLoader'

import { IconArrowDown } from 'assets/old/images/navbar/index'

const ViewUser = () => {
  const navigate = useNavigate()
  const params = useParams()
  const id: string = params?.id!
  const { data: user, loading: userLoading } = useUserByIdService({ id })
  const { data: account, loading: accountLoading } = useAccountByIdService(user?.id)

  const { openModal } = useModal()

  const redirect = (toggle: any, to: string) => () => {
    navigate(to)
    toggle(false)
  }

  // if (user.id !== id) return <Typography variant="h3">User not found!</Typography>

  if (userLoading || accountLoading) return <Loader />

  return (
    <StyledRoot>
      <StyledHeading>
        <Typography variant='h3'>User Details</Typography>

        <StyledDropDownMenuContainer>
          <DropdownMenu
            trigger={
              <StyledTrigger>
                <Typography weight={400} variant='label'>
                  Actions
                </Typography>
                <StyledImage src={IconArrowDown} width={10} alt='see available routes' />
              </StyledTrigger>
            }
          >
            {toggle => (
              <React.Fragment>
                <DropdownItem
                  icon={'folderplus'}
                  label='Edit user'
                  to={`/admin/user/edit/${id}`}
                  onClick={redirect(toggle, `/admin/user/edit/${id}`)}
                />
                <DropdownItem
                  icon={'DeleteIcon'}
                  label='Delete user'
                  onClick={() => {
                    openModal({
                      name: 'delete-user-confirmation',
                      data: {
                        id: user.id,
                        page: 'user-page',
                      },
                    })
                  }}
                />
                <DropdownItem
                  icon={'truck'}
                  label='Resend password'
                  onClick={() =>
                    openModal({
                      name: 'resend-password-confirmation',
                      data: {
                        id: user.id,
                      },
                    })
                  }
                />
                <DropdownItem
                  icon={'folderplus'}
                  label='Change role'
                  to={`/admin/user/edit/change-role/${id}`}
                  onClick={redirect(toggle, `/admin/user/edit/update-role/${id}`)}
                />
              </React.Fragment>
            )}
          </DropdownMenu>
        </StyledDropDownMenuContainer>
      </StyledHeading>

      <ViewUserInfo user={user} account={account} />
    </StyledRoot>
  )
}

export default ViewUser
