import { ToastContext } from 'contexts'
import { useContext } from 'react'
import {
  Contract,
  useMintByPlayerService,
  useAirdropService,
  useAwardService,
  useMintService,
  MintInput,
} from 'services'
import { getTransactionUrl } from 'utils/blockchain'

type UseMintProps = {
  contract: Contract
  method: string
}

const useMint = ({ contract, method }: UseMintProps) => {
  const { setToast } = useContext(ToastContext)
  const [mintService] = useMintService()
  const [awardService] = useAwardService()
  const [airdropService] = useAirdropService()
  const [mintByPlayer] = useMintByPlayerService()
  const { chain_id } = contract

  function getMintService() {
    if (method === 'mint') {
      return mintService
    } else if (method === 'award') {
      return awardService
    } else if (method === 'airdrop') {
      return airdropService
    } else if (method === 'playerMint') {
      return mintByPlayer
    }

    return mintService
  }

  const handleMint = async (input: MintInput) => {
    try {
      setToast({
        message: 'Minting in progress...',
        type: 'positive',
        open: true,
      })

      const service = getMintService()
      const data = await service(input)
      const url = getTransactionUrl(chain_id, data.transaction_hash)

      setToast({
        message: 'Successfully minted',
        type: 'positive',
        open: true,
        url,
        autoHideDuration: 10000,
      })
    } catch (error) {
      if (error instanceof Error) {
        setToast({
          message: error.message,
          type: 'negative',
          open: true,
        })
      }
    }
  }

  return { handleMint }
}

export default useMint
