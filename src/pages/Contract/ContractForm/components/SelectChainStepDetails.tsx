import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import styled from 'styled-components'
import detailImg from '../../assets/detailImg.png'
import detailImg2 from '../../assets/detailImg2.png'
import { StyledScrollDiv } from '../CreateContractFormStyles'

const SelectChainStepDetails = () => (
  <>
    <div>
      <Heading
        type={Heading.types.h1}
        value='Polygon PoS'
        size='medium'
        customColor={'rgba(255, 255, 255, 0.8)'}
      />
    </div>
    <Typography
      value='Polygon PoS is one of the most used protocols in the world. The network has tens of thousands of dApps, more than 3 million average daily transactions, $5 billion in secured assets, and some of the top brands building on it.'
      type={Typography.types.P}
      size={Typography.sizes.lg}
      customColor={'rgba(255, 255, 255, 0.6)'}
    />

    <div>
      <StyledScrollDiv>
        <StyledImg src={detailImg} alt='' />
        <StyledImg src={detailImg} alt='' />
        <StyledImg src={detailImg} alt='' />
      </StyledScrollDiv>
    </div>

    <Typography
      value='Polygon zkEVM harnesses the power of ZK proofs to reduce transaction cost and massively increase throughput, all while inheriting the security of Ethereum L1.'
      type={Typography.types.P}
      size={Typography.sizes.lg}
      customColor={'rgba(255, 255, 255, 0.6)'}
    />

    <div>
      <StyledBigImg src={detailImg2} alt='' />
    </div>
  </>
)

const StyledImg = styled.img`
  width: 400px;
  height: 266px;

  mix-blend-mode: screen;
`

const StyledBigImg = styled.img`
  width: 100%;
  height: 570px;
  mix-blend-mode: screen;
`

export default SelectChainStepDetails
