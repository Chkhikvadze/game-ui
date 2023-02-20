import React from 'react'
import styled from 'styled-components'
// import Typography from 'bf-ui/dist/Typography'
// import UserIcon from "assets/images/user.svg"
import Typography from 'oldComponents/atoms/Typography'

const ViewUserInfo = ({ user, account }: { user: ViewUserInfoProps; account: any }) => {
  const isUser = user.role === 'user'

  return (
    <Container>
      <AvatarBox>
        <img src={'UserIcon'} alt='user-icon' />
        <StyledTextCrop variant='h4' mt={10}>
          <span>{user.first_name} </span>
          <span>{user.last_name}</span>
        </StyledTextCrop>
      </AvatarBox>

      <UserInfoContainer>
        <TopSection>
          <TopItem>
            <Typography size='small' variant='label' weight={700}>
              Email:
            </Typography>
            <Typography variant='caption' ml={5} mt={1}>
              {user.email}
            </Typography>
          </TopItem>
          <TopItem>
            <Typography size='small' variant='label' weight={700}>
              User Id:
            </Typography>
            <Typography variant='caption' ml={5} mt={1}>
              {user.id}
            </Typography>
          </TopItem>
        </TopSection>

        <BottomSection>
          <div>
            <Typography size='small' variant='label' weight={700}>
              Contact number:
            </Typography>
            <Typography variant='caption' mt={8}>
              {user.contact_number}
            </Typography>
          </div>
          <div>
            <Typography size='small' variant='label' weight={700}>
              Role:
            </Typography>
            <Typography variant='caption' mt={8}>
              {user.role}
            </Typography>
          </div>
          <div>
            <Typography size='small' variant='label' weight={700}>
              Created date:
            </Typography>
            <Typography variant='caption' mt={8}>
              {user.created_on}
            </Typography>
          </div>
          <div>
            <Typography size='small' variant='label' weight={700}>
              Last login:
            </Typography>
            <Typography variant='caption' mt={8}>
              {user.last_login}
            </Typography>
          </div>
          <div>
            <Typography size='small' variant='label' weight={700}>
              Last login:
            </Typography>
            <Typography variant='caption' mt={8}>
              {user.last_login}
            </Typography>
          </div>
          {isUser && (
            <>
              <div>
                <Typography size='small' variant='label' weight={700}>
                  Organisation name:
                </Typography>
                <Typography variant='caption' mt={8}>
                  {account.organisation_name}
                </Typography>
              </div>
              <div>
                <Typography size='small' variant='label' weight={700}>
                  Industry:
                </Typography>
                <Typography variant='caption' mt={8}>
                  {account.organisation_industry}
                </Typography>
              </div>

              <div>
                <Typography size='small' variant='label' weight={700}>
                  Role:
                </Typography>
                <Typography variant='caption' mt={8}>
                  {account.organisation_role}
                </Typography>
              </div>

              <div>
                <Typography size='small' variant='label' weight={700}>
                  Fleet size:
                </Typography>
                <Typography variant='caption' mt={8}>
                  {account.organisation_fleet_size}
                </Typography>
              </div>
              <div>
                <Typography size='small' variant='label' weight={700}>
                  Transition status:
                </Typography>
                <Typography variant='caption' mt={8}>
                  {account.fleet_transition_status}
                </Typography>
              </div>
            </>
          )}
        </BottomSection>
      </UserInfoContainer>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 40px;
`

const AvatarBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  img {
    width: 100px;
    heigth: 100px;
  }
`

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid gray;
  padding: 0 20px;
`

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  border-bottom: 1px solid gray;
`
const TopItem = styled.div`
  display: flex;
  margin-bottom: 5px;
`
const BottomSection = styled.div`
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 30px;
`

const StyledTextCrop = styled(Typography)`
  width: 99%;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 1rem;
`

type ViewUserInfoProps = {
  id: string
  email: string
  first_name: string
  last_name: string
  contact_number: string
  role: string
  created_on: string
  last_login: string
}

export default ViewUserInfo
