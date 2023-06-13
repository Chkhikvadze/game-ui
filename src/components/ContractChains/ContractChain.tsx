import styled from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'

import Eth from 'assets/icons/eth.svg'
import polygonIcon from 'assets/icons/polygonIcon.png'

type ContractChainProps = {
  chainName: string
}

const ContractChain = ({ chainName }: ContractChainProps) => {
  let chainIcon = ''
  if (chainName === 'Ethereum') {
    chainIcon = Eth
  } else if (chainName === 'Polygon') {
    chainIcon = polygonIcon
  }

  return (
    <StyledChainWrapper>
      <img src={chainIcon} alt='' />
      <StyledTextWrapper className='showMe'>
        <Typography
          value={chainName}
          type={Typography.types.LABEL}
          size={Typography.sizes.xss}
          customColor={'#FFF'}
        />
      </StyledTextWrapper>
    </StyledChainWrapper>
  )
}

export default ContractChain

const StyledChainWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 14px;

  height: 32px;
  min-height: 32px;

  overflow: hidden;
  display: flex;
  gap: 12px;
  /* margin-bottom: 5px; */
  padding: 10px;
  border-radius: 100px;
  align-items: center;

  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(1px);

  max-width: 32px;
  transition: max-width 0.3s;
  &:hover {
    max-width: 100px;

    .showMe {
      opacity: 1;
    }
  }
`

const StyledTextWrapper = styled.div`
  display: flex;
  gap: 4px;

  align-items: center;
`
