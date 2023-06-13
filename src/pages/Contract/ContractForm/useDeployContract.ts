import { ToastContext } from 'contexts'
import { useContext, useState } from 'react'
import { IContract, useDeployContractService } from 'services'
import { getTransactionUrl } from 'utils/blockchain'

type UseDeployContractProps = {
  contract?: IContract
  onFinish: () => void
}

const useDeployContract = ({ contract, onFinish }: UseDeployContractProps) => {
  const { setToast } = useContext(ToastContext)

  const [status, setStatus] = useState({
    title: 'Deploy',
    loading: false,
  })

  const [deployContractService] = useDeployContractService()

  const handleDeployContract = async () => {
    if (!contract) return

    setStatus({ title: 'Deploying contract', loading: true })

    try {
      const { transaction_hash } = await deployContractService(contract.id)

      setToast({
        type: 'positive',
        message: `Contract was deployed`,
        open: true,
        url: getTransactionUrl(contract.chain_id, transaction_hash || ''),
      })
    } catch (error) {
      setToast({
        type: 'negative',
        message: `Could not deploy contract`,
        open: true,
      })
    }

    onFinish()
  }

  return {
    handleDeployContract,
    status,
  }
}

export default useDeployContract
