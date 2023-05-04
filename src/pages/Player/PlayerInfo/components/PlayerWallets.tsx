import styled from 'styled-components'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Wallet from '@l3-lib/ui-core/dist/icons/Wallet'
import PlayerWallet from './PlayerWallet'

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
        <>
          <PlayerWallet wallet={wallet} chainId={80001} symbol='Polygon Mumbai MATIC' />
          <PlayerWallet wallet={wallet} chainId={5} symbol='Goerli ETH' />
          {/* <PlayerWallet wallet={wallet} chainId={11155111} symbol='Sepolia ETH' /> */}
        </>
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
