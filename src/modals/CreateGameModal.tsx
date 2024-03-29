import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'

import withRenderModal from 'hocs/withRenderModal'

import { useGames } from 'pages/Game/Games/useGames'

import FileUploadField from 'atoms/FileUploadField'

import Modal from '@l3-lib/ui-core/dist/Modal'

import CreateForm from 'components/CreateForm'
import CreateGameForm from 'components/CreateForm/CreateGameForm'

import actionImg from 'pages/Game/GameForm/assets/action.png'
import racingImg from 'pages/Game/GameForm/assets/racing.jpg'
import adventureImg from 'pages/Game/GameForm/assets/adventure.png'

interface CreateGameModalProps {
  closeModal: () => void
}

const CreateGameModal = ({ closeModal }: CreateGameModalProps) => {
  const { formHook, handleSubmit } = useGames()

  const [backgroundImg, setBackgroundImg] = useState('')

  const gameName = formHook.watch('game_name')
  const gameCategory = formHook.watch('game_category')

  useEffect(() => {
    if (gameCategory === 'Action') {
      setBackgroundImg(actionImg)
    } else if (gameCategory === 'Adventure') {
      setBackgroundImg(adventureImg)
    } else if (gameCategory === 'Racing') {
      setBackgroundImg(racingImg)
    } else {
      setBackgroundImg('')
    }
  }, [gameCategory])

  return (
    <StyledRoot>
      <Modal fullscreen show isClean onClose={closeModal}>
        <CreateForm
          closeModal={closeModal}
          formHook={formHook}
          handleSubmit={handleSubmit}
          nameValue={gameName}
          categoryValue={gameCategory}
          backgroundImg={backgroundImg}
          finishText={'Game unlocked'}
          form={<CreateGameForm closeModal={closeModal} formHook={formHook} />}
        />
      </Modal>
    </StyledRoot>
  )
}

export default withRenderModal('create-game-modal')(CreateGameModal)

const StyledRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledActionsContainer = styled.div`
  display: flex;
  justify-items: flex-end;
`

export const StyledUploadLogo = styled(FileUploadField)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`

export const StyledUploadImg = styled(FileUploadField)`
  width: 100%;
  height: 300px;
`
