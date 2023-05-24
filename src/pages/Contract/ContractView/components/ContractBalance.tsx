import styled from 'styled-components'
import ShowHide from 'pages/Contract/ContractComponents/ShowHide'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'
import { Contract } from 'services'
import {
  useConnect,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useSigner,
} from 'wagmi'
import useToast from 'hooks/useToast'
import { metaMaskConnector } from 'utils/wagmi'

type ContractBalanceProps = {
  contract: Contract
}

const ContractBalance = ({ contract }: ContractBalanceProps) => {
  const { abi, chain_id, contract_address } = contract

  const { setToast } = useToast()

  // const { data: shares } = useContractRead({
  //   address: contract_address,
  //   chainId: chain_id,
  //   abi: abi || [],
  //   functionName: 'totalShares',
  // })

  const connect = useConnect({
    chainId: contract.chain_id,
    connector: metaMaskConnector,
    onError() {
      setToast({
        type: 'negative',
        message: 'Could not connect to wallet',
        open: true,
      })
    },
  })

  const signer = useSigner({
    chainId: contract?.chain_id,
  })

  const { config } = usePrepareContractWrite({
    address: contract_address,
    abi: abi || [],
    chainId: chain_id,
    functionName: 'withdraw',
    // args: [
    //   {
    //     gasLimit: 100000,
    //   },
    // ],
    onSuccess() {
      setToast({
        type: 'positive',
        message: 'Withdrawal succeeded',
        open: true,
      })
    },
    onError() {
      setToast({
        type: 'negative',
        message: 'Withdrawal failed',
        open: true,
      })
    },
    signer: signer.data,
  })

  const { isLoading, writeAsync } = useContractWrite(config)

  // console.log(isLoading)

  // console.log({ writeAsync })

  const handleWithdraw = async () => {
    await connect.connectAsync()
    if (writeAsync) writeAsync()
  }

  return (
    <ShowHide title={'Balance'}>
      <StyledWrapper>
        <StyledBalance>
          <Heading value='-' type={Heading.types.h1} size='medium' customColor={'#7AF94B'} />
        </StyledBalance>
        <Button size={Button.sizes.MEDIUM} onClick={handleWithdraw} disabled={true || isLoading}>
          Withdraw
        </Button>
      </StyledWrapper>
    </ShowHide>
  )
}

export default ContractBalance

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledBalance = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
