import { ToastContext } from 'contexts'
import { BigNumber } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { Contract } from 'services/useContractService'
import { MintInput, useMintService } from 'services/useMintService'
import { getTransactionUrl } from 'utils/blockchain'
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
  // const account = useAccount()
  const { setToast } = useContext(ToastContext)

  const [mintService] = useMintService()

  const { chain_id } = contractData
  // const contract = useContract({ abi, address })

  // const { data: balance } = useContractRead({
  //   address,
  //   abi,
  //   functionName: 'balanceOf',
  //   args: [account.address, 1],
  //   chainId: contractData.chain_id,
  // })

  // const { config } = usePrepareContractWrite({
  //   address,
  //   abi,
  //   functionName: 'mint',
  //   args: [account.address, 1, 1, []],
  //   chainId: contractData.chain_id,
  // })

  // const { writeAsync, isLoading, isSuccess } = useContractWrite(config)

  const handleMint = async (input: MintInput) => {
    // if (!writeAsync) return

    try {
      // const transaction = await writeAsync()

      setToast({
        message: 'Minting in progress...',
        type: 'positive',
        open: true,
      })

      const data = await mintService(input)
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

  // useEffect(() => {
  //   if (balance) console.log({ balance: (balance as BigNumber).toNumber() })
  // }, [balance])

  return { handleMint }
}

export default useMintByAdmin
