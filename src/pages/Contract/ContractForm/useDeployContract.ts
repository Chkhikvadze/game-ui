import { ToastContext } from 'contexts'
import { useContext, useState } from 'react'
import { Contract, useDeployContractService } from 'services'
import { getTransactionUrl } from 'utils/blockchain'

type UseDeployContractProps = {
  contract?: Contract
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

    const { transaction_hash } = await deployContractService(contract.id)

    setToast({
      type: 'positive',
      message: `Contract was deployed`,
      open: true,
      url: getTransactionUrl(contract.chain_id, transaction_hash),
    })

    onFinish()
  }

  return {
    handleDeployContract,
    status,
  }
}

export default useDeployContract
