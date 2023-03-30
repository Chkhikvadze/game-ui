import { BigNumber } from 'ethers'
import { useEffect } from 'react'
import { Contract } from 'services/useContractService'
import {
  // useContract,
  // useNetwork,
  // useChainId,
  useContractWrite,
  useContractRead,
  usePrepareContractWrite,
  useAccount,
} from 'wagmi'

type UseMintByAdminProps = {
  contract: Contract
}

const useMintByAdmin = ({ contract: contractData }: UseMintByAdminProps) => {
  const account = useAccount()

  const { abi, contract_address: address } = contractData
  // const contract = useContract({ abi, address })

  const { data: balance } = useContractRead({
    address,
    abi,
    functionName: 'balanceOf',
    args: [account.address, 1],
    chainId: contractData.chain_id,
  })

  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName: 'mint',
    args: [account.address, 1, 1, []],
    chainId: contractData.chain_id,
  })

  const { writeAsync, isLoading, isSuccess } = useContractWrite(config)

  const handleMint = () => {
    if (writeAsync) writeAsync()
  }

  useEffect(() => {
    if (balance) console.log({ balance: (balance as BigNumber).toNumber() })
  }, [balance])

  return { handleMint, isLoading, isSuccess }
}

export default useMintByAdmin
