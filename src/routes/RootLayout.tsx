import React, { useEffect } from 'react'
import { AuthContext } from 'contexts'
import { Navigate, useNavigate, useOutlet, useParams } from 'react-router-dom'

import useCheckRoute from 'hooks/useCheckRoute'

import ChatSwitcher from 'components/ChatSwitcher'
import Spotlight from 'components/Spotlight'
import { useModal } from 'hooks'
import { useGameAccountIdService } from 'services/game/useGameAccountIdService'
import { useUserAccountsService } from 'services'
import { setAccountId } from 'helpers/authHelper'
import styled, { css } from 'styled-components'

const RootLayout = () => {
  const { user, account } = React.useContext(AuthContext)
  const { isCheckedRoute } = useCheckRoute('copilot')

  const outlet = useOutlet()

  const navigate = useNavigate()

  const params = useParams()
  const urlParams = new URLSearchParams(window.location.search)

  let gameId: string | undefined | null

  if (isCheckedRoute) {
    gameId = urlParams.get('game')
  } else {
    gameId = params.gameId
  }

  const { openModal, closeModal } = useModal()

  const { data: gameAccountId } = useGameAccountIdService({ id: gameId || '' })
  const { data: userAccounts } = useUserAccountsService()

  useEffect(() => {
    if (gameAccountId && userAccounts) {
      const assignedUserIds = userAccounts?.map((item: any) => item.assigned_account_id)
      if (gameAccountId !== account.id) {
        if (assignedUserIds.length > 0 && !assignedUserIds.includes(gameAccountId)) {
          navigate('/')
        } else if (assignedUserIds.includes(gameAccountId)) {
          openModal({
            name: 'delete-confirmation-modal',
            data: {
              deleteItem: () => {
                setAccountId(gameAccountId)
                // history.go(0)
              },
              closeModal: () => {
                closeModal('delete-confirmation-modal')
                navigate('/')
              },
              label: 'You need to switch account',
              title: 'Switch Account',
            },
          })
        }
      }
    }
  }, [gameAccountId, userAccounts])

  if (!user) return <Navigate to='/login' />

  return (
    <>
      <>{outlet}</>

      <StyledChatInputWrapper isHidden={isCheckedRoute}>
        <Spotlight />
      </StyledChatInputWrapper>
      <ChatSwitcher isChatOpen={isCheckedRoute} />
    </>
  )
}

export default RootLayout

const StyledChatInputWrapper = styled.div<{ isHidden: boolean }>`
  ${p =>
    p.isHidden &&
    css`
      opacity: 0;
    `};
`
