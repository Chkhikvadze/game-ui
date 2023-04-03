import { ToastContext } from 'contexts'
import { ethers } from 'ethers'
import { useContext, useState } from 'react'
import {
  Contract,
  useCompileContractService,
  useUpdateContractService,
} from 'services/useContractService'
import { useSigner, useNetwork, useConnect, useSwitchNetwork, useAccount } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const connector = new MetaMaskConnector()

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

  const { chain } = useNetwork()
  const account = useAccount()

  const switchNetwork = useSwitchNetwork({
    chainId: contract?.chain_id,
  })

  const connect = useConnect({
    chainId: contract?.chain_id,
    connector,
  })

  const signer = useSigner()
  const [updateContract] = useUpdateContractService()
  const [compileContract] = useCompileContractService()

  const handleDeployContract = async () => {
    try {
      if (!account.address) {
        setStatus({ title: 'Connecting to wallet', loading: true })
        await connect.connectAsync()
      }
    } catch (error) {
      setStatus({ title: 'Try connecting again', loading: false })

      return setToast({
        type: 'negative',
        message: 'Could not connect to wallet',
        open: true,
      })
    }

    try {
      if (chain && chain.id !== contract?.chain_id && switchNetwork.switchNetworkAsync) {
        setStatus({ title: 'Switching to correct network', loading: true })
        await switchNetwork.switchNetworkAsync(contract?.chain_id)

        setToast({
          type: 'positive',
          message: `Switched to ${contract?.chain_name} network`,
          open: true,
        })
      }
    } catch (error) {
      setStatus({ title: 'Try switching network again', loading: false })

      return setToast({
        type: 'negative',
        message: 'Could not switch network',
        open: true,
      })
    }

    try {
      if (!contract) return

      setStatus({ title: 'Compiling contract', loading: true })

      const { abi, bytecode, constructor_args } = await compileContract(contract.id)

      setToast({
        type: 'positive',
        message: `Compiled contract. Deploying...`,
        open: true,
      })

      if (!signer.data) {
        setStatus({ title: 'Deploy', loading: false })
        return setToast({
          type: 'negative',
          message: 'Could not get signer',
          open: true,
        })
      }

      setStatus({ title: 'Deploying contract', loading: true })

      const factory = new ethers.ContractFactory(abi, bytecode, signer.data)
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
        message: `Contract was successfully deployed`,
        open: true,
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

export default useDeployContract
