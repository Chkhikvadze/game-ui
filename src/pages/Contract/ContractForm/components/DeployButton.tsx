import Button from '@l3-lib/ui-core/dist/Button'
import PlayOutline from '@l3-lib/ui-core/dist/icons/PlayOutline'

import { Contract } from 'services/useContractService'
import useDeployContract from '../useDeployContract'

type DeployButtonProps = {
  contract?: Contract
  onFinish: () => void
}

const DeployButton = ({ contract, onFinish }: DeployButtonProps) => {
  const { buttonText, handleDeployContract } = useDeployContract({ contract })

  return (
    <Button
      leftIcon={PlayOutline}
      size={Button.sizes.LARGE}
      onClick={async () => {
        await handleDeployContract()
        onFinish()
      }}
    >
      {buttonText}
    </Button>
  )
}

export default DeployButton
