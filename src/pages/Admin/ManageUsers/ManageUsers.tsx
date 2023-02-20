import React, { useEffect, useState } from 'react'
import {
  StyledLink,
  StyledIconButton,
  StyledIconButtonLabel,
  StyledHeader,
} from './ManageUsersStyle'
import { useNavigate } from 'react-router-dom'
// import DeleteIcon from "assets/images/deleteblack.svg"
// import Plus from "assets/images/plus.svg"
import NativeTable from 'oldComponents/atoms/NativeTable'

import Pagination from 'oldComponents/atoms/Pagination'
import { useUsersByAdminService } from 'services'
import SearchUsers from './SearchUsers'
import { useModal } from 'hooks'
import Loader from 'atoms/Loader'
import Typography from 'oldComponents/atoms/Typography'

const PAGE_LIMIT = 10

const ManageUsers = () => {
  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(0)
  const {
    data: users,
    loading,
    refetch: refetchUsers,
  } = useUsersByAdminService({
    page,
    limit: PAGE_LIMIT,
    search_text: searchValue,
  })

  const navigate = useNavigate()
  const { openModal } = useModal()

  const onSubmitSearch = (value: string) => {
    setSearchValue(value)
    if (value) {
      setPage(0)
    }
  }

  useEffect(() => {
    refetchUsers()
  }, []) // eslint-disable-line

  return (
    <>
      <StyledHeader>
        <StyledLink color='white' to='/admin/users/create'>
          {/* <img src={Plus} alt="Create user" /> */}
          Create user
        </StyledLink>

        <Typography mt={10} mb={30} variant='h3'>
          Users
        </Typography>
      </StyledHeader>
      <SearchUsers
        searchValue={searchValue}
        onSubmit={searchValue => onSubmitSearch(searchValue)}
      />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Pagination
            totalCount={+users?.total_count}
            page={page}
            limit={PAGE_LIMIT}
            pageChange={(data: any) => setPage(data.selected)}
          />
          <NativeTable
            data={users.items}
            columns={{
              first_name: 'First Name',
              last_name: 'Last Name',
              email: 'Email',
              contact_number: 'Contact Number',
              role: 'Role',
              created_on: 'Created On',
              last_login: 'Last Login',
              actions: 'actions',
            }}
            styles={{ actions: { width: 125, paddingRight: 24 } }}
            onRowClick={user => navigate(`/admin/user/${user.id}`)}
            customRenderers={{
              actions: user => (
                <>
                  <StyledIconButton
                    noBorder
                    size={22}
                    label={
                      <StyledIconButtonLabel variant={'label'} weight={400}>
                        Open & Edit
                      </StyledIconButtonLabel>
                    }
                  >
                    <i className='icon icon-open-edit mr-0' />
                  </StyledIconButton>

                  <StyledIconButton
                    ml={8}
                    noBorder
                    size={22}
                    onClick={(event: any) => {
                      event.stopPropagation()
                      openModal({
                        name: 'delete-user-confirmation',
                        data: {
                          id: user.id,
                          refetchUsers,
                        },
                      })
                    }}
                    label={
                      <StyledIconButtonLabel variant={'label'} weight={400}>
                        Delete
                      </StyledIconButtonLabel>
                    }
                  >
                    {/* <img src={DeleteIcon} alt="Delete project" /> */}
                  </StyledIconButton>
                </>
              ),
            }}
          />
        </>
      )}
    </>
  )
}

export default ManageUsers
