import { ToastContext } from 'contexts'
import { BigNumber } from 'ethers'
import { useContext, useEffect } from 'react'
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
  const { setToast } = useContext(ToastContext)

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

  const handleMint = async () => {
    if (!writeAsync) return

    try {
      const transaction = await writeAsync()

      setToast({
        message: 'Minting in progress...',
        type: 'positive',
        open: true,
      })

      await transaction.wait()

      setToast({
        message: 'Minted successfully',
        type: 'positive',
        open: true,
      })
    } catch (error) {
      setToast({
        message: 'Could not mint',
        type: 'negative',
        open: true,
      })
    }
  }

  useEffect(() => {
    if (balance) console.log({ balance: (balance as BigNumber).toNumber() })
  }, [balance])

  return { handleMint, isLoading, isSuccess }
}

export default useMintByAdmin
