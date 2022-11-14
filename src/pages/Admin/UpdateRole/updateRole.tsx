import React, { useState, useEffect } from "react"
import {
  StyledRoot,
  StyledUserName,
  StyledSelectContainer,
  StyledSelect,
  StyledOptions,
  StyledButton,
} from "./UpdateRoleStyle"
import { useParams } from "react-router-dom"
import { useUserByIdService, useChangeRoleByAdminService } from "services"
// import Typography from 'bf-ui/dist/Typography'
import useSnackbarAlert from "hooks/useSnackbar"
import Loader from "atoms/Loader"
import Typography from "oldComponents/atoms/Typography"
// import SpinnerLoader from 'bf-ui/dist/SpinnerLoader'

const UpdateRole = () => {
  const params = useParams()
  const id: string = params?.id!
  const { data: user, loading, refetch } = useUserByIdService({ id })
  const [userRole, setUserRole] = useState("")
  const [updateRoleByAdmin] = useChangeRoleByAdminService()
  const { setSnackbar } = useSnackbarAlert()

  useEffect(() => {
    if (user?.role) {
      setUserRole(user.role)
    }
  }, [user])

  const changeRole = async (e: any) => {
    e.preventDefault()
    if (user.role !== userRole) {
      try {
        await updateRoleByAdmin(id, userRole)
        await refetch()
        setSnackbar({ message: "User role updated", variant: "success" })
      } catch (error) {
        setSnackbar({ message: "User role update failed", variant: "error" })
      }
    }
  }

  if (loading) return <Loader />

  return (
    <StyledRoot>
      <Typography mb={40} variant="h3">
        Change role for{" "}
        <StyledUserName>
          {user.first_name} {user.last_name}
        </StyledUserName>
      </Typography>
      <form onSubmit={changeRole}>
        <StyledSelectContainer>
          <StyledSelect
            name="change-role"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <StyledOptions value="admin">Admin</StyledOptions>
            <StyledOptions value="user">User</StyledOptions>
          </StyledSelect>
          <StyledButton color="primary" type="submit">
            Change role
          </StyledButton>
        </StyledSelectContainer>
      </form>
    </StyledRoot>
  )
}

export default UpdateRole
