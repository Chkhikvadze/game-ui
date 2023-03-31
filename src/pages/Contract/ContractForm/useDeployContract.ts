import { ToastContext } from 'contexts'
import { ethers } from 'ethers'
import { useContext } from 'react'
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

  const { chain } = useNetwork()
  const account = useAccount()

  const switchNetwork = useSwitchNetwork({
    chainId: contract?.chain_id,
  })

  const connect = useConnect({
    chainId: contract?.chain_id,
    connector,
  })

  const connectAndSwitchNetwork = async () => {
    try {
      if (!account.address) {
        await connect.connectAsync()
      }

      if (chain && chain.id !== contract?.chain_id && switchNetwork.switchNetworkAsync) {
        await switchNetwork.switchNetworkAsync(contract?.chain_id)
      }

      setToast({
        type: 'positive',
        message: `Connected and switched. Now you can deploy your contract`,
        open: true,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const signer = useSigner()
  const [updateContract] = useUpdateContractService()
  const [compileContract] = useCompileContractService()

  const handleDeployContract = async () => {
    await connectAndSwitchNetwork()

    try {
      if (!contract) return

      const { abi, bytecode, constructor_args } = await compileContract(contract.id)

      console.log(abi, bytecode, constructor_args)

      if (!signer.data) return
      const factory = new ethers.ContractFactory(abi, bytecode, signer.data)
      const deployedContract = await factory.deploy(...constructor_args)
      console.log(deployedContract)

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
      setToast({
        type: 'negative',
        message: `Something went wrong`,
        open: true,
      })
      console.error(error)
    }
  }

  const buttonText = account.isConnected ? 'Deploy' : 'Connect to wallet'

  return {
    handleDeployContract,
    buttonText,
  }
}

export default useDeployContract
