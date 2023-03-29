import { ethers } from 'ethers'
import { Contract, useUpdateContractService } from 'services/useContractService'
import { useSigner, useNetwork, useConnect, useSwitchNetwork, useAccount } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const connector = new MetaMaskConnector()

type UseDeployContractProps = {
  contract?: Contract
}

const useDeployContract = ({ contract }: UseDeployContractProps) => {
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
        switchNetwork.switchNetworkAsync(contract?.chain_id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const signer = useSigner()
  const [updateContract] = useUpdateContractService()

  const handleDeployContract = async () => {
    try {
      await connectAndSwitchNetwork()

      if (!contract) return
      const { abi, bytecode } = contract

      if (!signer.data) return
      const factory = new ethers.ContractFactory(abi, bytecode, signer.data)
      const constructorArgs = [
        // royalty
        ['0xBd876ACF229C18A861d561a2b83B70193E659794'],
        // royalty share
        [100],
        // royalty fee
        0,
        // base uri
        '',
        // contract uri
        '',
      ]

      const deployedContract = await factory.deploy(...constructorArgs)
      console.log(deployedContract)

      const { address, deployTransaction } = deployedContract

      const { hash, from } = deployTransaction

      await updateContract(contract.id, {
        contract_address: address,
        transaction_hash: hash,
        deployer_address: from,
        deploy_transaction: deployTransaction,
        constructor_args: constructorArgs,
      })
    } catch (error) {
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
