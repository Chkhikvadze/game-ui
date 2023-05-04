import styled from 'styled-components'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'
import Wallet from '@l3-lib/ui-core/dist/icons/Wallet'
import Copy from '@l3-lib/ui-core/dist/icons/Copy'
import { useAddTestBalanceToWalletService } from 'services'
import { useContext } from 'react'
import { ToastContext } from 'contexts'
import { useBalance } from 'wagmi'
import { ethers } from 'ethers'

type PlayerWalletProps = {
  wallet: any
  symbol: string
  chainId: number
}

const PlayerWallet = ({ wallet, symbol, chainId }: PlayerWalletProps) => {
  const [addBalanceService] = useAddTestBalanceToWalletService()
  const { setToast } = useContext(ToastContext)
  const { address } = wallet

  const { data } = useBalance({
    address,
    chainId: chainId,
  })

  const balance = data?.value ? ethers.utils.formatUnits(data.value, 18) : '0'
  const formattedBalance = parseFloat(balance).toFixed(2)

  const handleAddBalance = async () => {
    try {
      await addBalanceService(wallet.id)

      setToast({
        message: 'Balance added successfully',
        type: 'positive',
        open: true,
      })
    } catch (error) {
      if (error instanceof Error) {
        setToast({
          message: error.message,
          type: 'negative',
          open: true,
        })
      }
    }
  }

  return (
    <StyledWallet>
      <Typography
        value={`${address} (${formattedBalance} ${symbol})`}
        type={Heading.types.p}
        size={Typography.sizes.md}
        customColor='#FFF'
      />

      <StyledActions>
        <Button color='primary' onClick={handleAddBalance}>
          Get Balance
        </Button>

        <StyledCopyIcon onClick={() => navigator.clipboard.writeText(address)}>
          <Copy />
        </StyledCopyIcon>
      </StyledActions>
    </StyledWallet>
  )
}

export default PlayerWallet

const StyledWallet = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  gap: 16px;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: inset 0px 1px 20px rgba(8, 8, 16, 0.1);
  border-radius: 16px;
`

const StyledCopyIcon = styled.div`
  width: 30px;
  cursor: pointer;
`

const StyledActions = styled.div`
  display: flex;
  gap: 16px;
`
