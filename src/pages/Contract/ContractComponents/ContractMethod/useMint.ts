import { ToastContext } from 'contexts'
import { useContext } from 'react'
import { Contract } from 'services'
import {
  MintInput,
  useAirdropService,
  useAwardService,
  useMintService,
} from 'services/useMintService'
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
  const { chain_id } = contract

  function getMintService() {
    if (method === 'mint') {
      return mintService
    } else if (method === 'award') {
      return awardService
    } else if (method === 'airdrop') {
      return airdropService
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
      setToast({
        message: 'Could not mint',
        type: 'negative',
        open: true,
      })
    }
  }

  return { handleMint }
}

export default useMint
