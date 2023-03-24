import { ethers } from 'ethers'
import { Contract, useUpdateContractService } from 'services/useContractService'
import { useSigner, useNetwork } from 'wagmi'

type UseDeployContractProps = {
  contract: Contract
}

const useDeployContract = ({ contract }: UseDeployContractProps) => {
  const network = useNetwork()
  const signer = useSigner()
  const [updateContract] = useUpdateContractService()

  const { source_code, name, abi, bytecode } = contract

  const handleDeployContract = async () => {
    console.log('Deploying contract...')
    if (!signer.data) return
    const factory = new ethers.ContractFactory(abi, bytecode, signer.data)
    const constructorArgs = [['0xBd876ACF229C18A861d561a2b83B70193E659794'], [100], 0, '', '']

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
  }

  return {
    handleDeployContract,
  }
}

export default useDeployContract
