import styled from 'styled-components'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'
import Wallet from '@l3-lib/ui-core/dist/icons/Wallet'
import Copy from '@l3-lib/ui-core/dist/icons/Copy'

type PlayerWalletsProps = {
  wallet: any
}

const PlayerWallets = ({ wallet }: PlayerWalletsProps) => {
  return (
    <>
      <StyledTitle>
        <Wallet />
        <Typography
          value='Wallet(s)'
          type={Heading.types.p}
          size={Typography.sizes.md}
          customColor='#FFF'
        />
      </StyledTitle>

      {wallet?.address && (
        <StyledWallet>
          <Typography
            value={wallet.address}
            type={Heading.types.p}
            size={Typography.sizes.md}
            customColor='#FFF'
          />

          <StyledActions>
            <Button color='primary'>Get Balance</Button>

            <StyledCopyIcon onClick={() => navigator.clipboard.writeText(wallet.address)}>
              <Copy />
            </StyledCopyIcon>
          </StyledActions>
        </StyledWallet>
      )}
    </>
  )
}

export default PlayerWallets

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
`

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
