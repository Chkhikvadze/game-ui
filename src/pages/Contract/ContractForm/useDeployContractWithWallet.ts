import { ToastContext } from 'contexts'
import { ethers } from 'ethers'
import { useContext, useState } from 'react'
import { Contract, useCompileContractService, useUpdateContractService } from 'services'
import { getTransactionUrl } from 'utils/blockchain'
import { metaMaskConnector } from 'utils/wagmi'
import { useSigner, useNetwork, useConnect, useSwitchNetwork, useAccount } from 'wagmi'

type UseDeployContractWithWalletProps = {
  contract?: Contract
  onFinish: () => void
}

const useDeployContractWithWallet = ({ contract, onFinish }: UseDeployContractWithWalletProps) => {
  const { setToast } = useContext(ToastContext)

  const [status, setStatus] = useState({
    title: 'Deploy',
    loading: false,
  })

  const account = useAccount()
  const { chain } = useNetwork()

  const connect = useConnect({
    chainId: contract?.chain_id,
    connector: metaMaskConnector,
    onError() {
      setStatus({ title: 'Try connecting again', loading: false })
      setToast({
        type: 'negative',
        message: 'Could not connect to wallet',
        open: true,
      })
    },
  })

  const switchNetwork = useSwitchNetwork({
    chainId: contract?.chain_id,
    onSuccess(chain) {
      setToast({
        type: 'positive',
        message: `Switched to ${chain.name} network`,
        open: true,
      })
    },
    onError() {
      setStatus({ title: 'Try switching network again', loading: false })

      return setToast({
        type: 'negative',
        message: 'Could not switch network',
        open: true,
      })
    },
  })

  const signer = useSigner({
    chainId: contract?.chain_id,
  })

  const [updateContract] = useUpdateContractService()
  const [compileContract] = useCompileContractService()

  const handleDeployContract = async () => {
    try {
      if (!account.address) {
        setStatus({ title: 'Connecting to wallet', loading: true })

        await connect.connectAsync({
          chainId: contract?.chain_id,
        })
      }

      if (chain && chain.id !== contract?.chain_id && switchNetwork.switchNetworkAsync) {
        setStatus({ title: 'Switching to correct network', loading: true })
        await switchNetwork.switchNetworkAsync(contract?.chain_id)
      }
    } catch (error) {
      console.log(error)
      return
    }

    try {
      if (!contract) return

      setStatus({ title: 'Compiling contract', loading: true })

      setToast({
        type: 'positive',
        message: `Compiling contract`,
        open: true,
      })

      const { abi, bytecode, constructor_args } = await compileContract(contract.id)

      const latestSigner = await signer.refetch()

      if (!latestSigner.data) {
        setStatus({ title: 'Deploy', loading: false })
        return setToast({
          type: 'negative',
          message: 'Could not get signer',
          open: true,
        })
      }

      setStatus({ title: 'Deploying contract', loading: true })

      setToast({
        type: 'positive',
        message: `Deploying contract`,
        open: true,
      })

      const factory = new ethers.ContractFactory(abi, bytecode, latestSigner.data)
      const deployedContract = await factory.deploy(...constructor_args)

      const { address, deployTransaction } = deployedContract

      const { hash, from } = deployTransaction

      await updateContract(contract.id, {
        contract_address: address,
        transaction_hash: hash,
        deployer_address: from,
        deploy_transaction: deployTransaction,
        constructor_args,
      })

      onFinish()

      setToast({
        type: 'positive',
        message: `Contract was deployed`,
        open: true,
        url: getTransactionUrl(contract.chain_id, hash),
      })
    } catch (error) {
      setStatus({ title: 'Try again', loading: false })

      setToast({
        type: 'negative',
        message: `Could not deploy contract`,
        open: true,
      })

      console.error(error)
    }
  }

  return {
    handleDeployContract,
    status,
  }
}

export default useDeployContractWithWallet
