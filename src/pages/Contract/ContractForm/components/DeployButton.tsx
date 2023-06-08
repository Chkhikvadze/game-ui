import Button from '@l3-lib/ui-core/dist/Button'
import PlayOutline from '@l3-lib/ui-core/dist/icons/PlayOutline'

import { IContract } from 'services'
import useDeployContract from '../useDeployContract'

type DeployButtonProps = {
  contract?: IContract
  onFinish: () => void
}

const DeployButton = ({ contract, onFinish }: DeployButtonProps) => {
  const { status, handleDeployContract } = useDeployContract({ contract, onFinish })

  const { title, loading } = status

  return (
    <Button
      leftIcon={PlayOutline}
      size={Button.sizes.LARGE}
      loading={loading}
      onClick={handleDeployContract}
    >
      {title}
    </Button>
  )
}

export default DeployButton
