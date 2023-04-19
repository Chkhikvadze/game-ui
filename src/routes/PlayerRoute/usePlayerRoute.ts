import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { usePlayerByIdService, useUpdatePlayerByIdService } from 'services/usePlayerService'
import { ToastContext } from 'contexts'

const usePlayerRoute = () => {
  const params = useParams()
  const playerId = params.playerId
  const { setToast } = useContext(ToastContext)

  const { data: player, refetch } = usePlayerByIdService({ id: playerId })

  const [updatePlayerById] = useUpdatePlayerByIdService()

  const updateHeader = async (name: string) => {
    const updatedValues = {
      name: name,
    }
    await updatePlayerById(playerId, { ...updatedValues })

    setToast({
      message: `Player name updated!`,
      type: 'positive',
      open: true,
    })
  }

  return {
    updateHeader,
    player,
  }
}

export default usePlayerRoute
