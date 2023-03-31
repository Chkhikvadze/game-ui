import styled from 'styled-components'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'

import birdImg from '../../assets/bird.png'

type TextComponentProps = {
  text: string
}

const TextComponent = ({ text }: TextComponentProps) => {
  return (
    <li>
      <Typography
        value={text}
        type={Typography.types.P}
        size={Typography.sizes.lg}
        customColor={'rgba(255, 255, 255, 0.6)'}
      />
    </li>
  )
}

const DeployDetails = () => {
  return (
    <StyledDeployRoot>
      <StyledHeadWrapper>
        <StyledBirdImg alt='' src={birdImg} />

        <Heading
          type={Heading.types.h1}
          value='Deploy'
          size='medium'
          customColor={'rgba(255, 255, 255, 0.8)'}
        />
      </StyledHeadWrapper>
      <StyledList>
        <TextComponent
          text={
            'Once a smart contract is deployed, it becomes a permanent and immutable entity on the blockchain. This means that you cannot change any of the settings that you have already specified during the deployment process.'
          }
        />

        <TextComponent
          text={`However, you can make changes to the contract's logic or add new functionality.`}
        />

        <TextComponent text={`What can be changed after deployment`} />
        <StyledUnorderedList>
          <TextComponent
            text={`Updating the contract's logic or code to fix bugs or make improvements.`}
          />

          <TextComponent text={`Adding new functionality or features to the contract.`} />

          <TextComponent
            text={`Updating the contract's parameters, such as changing the amount of a
                particular token required for a specific action or changing the maximum supply
                of a token.`}
          />

          <TextComponent
            text={`Adding or removing contract administrators or other parties with specific
                permissions.`}
          />

          <TextComponent
            text={`Modifying the contract's smart contract dependencies, such as using a newer
                version of a library or smart contract.`}
          />
        </StyledUnorderedList>
      </StyledList>
    </StyledDeployRoot>
  )
}

export default DeployDetails

const StyledDeployRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const StyledList = styled.ol`
  color: rgba(255, 255, 255, 0.6);
  margin-left: -10px;
`
const StyledUnorderedList = styled.ol`
  color: rgba(255, 255, 255, 0.6);
  margin-left: -10px;
  list-style-type: lower-alpha;
`
const StyledBirdImg = styled.img`
  margin-left: -10px;
`
const StyledHeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  margin-bottom: 32px;
`
