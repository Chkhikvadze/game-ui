import { useParams } from 'react-router-dom'
import { useContractByCollectionId } from 'services/useContractService'
import ContractView from './ContractView'
import CreateContract from './CreateContract'

const ContractWizard = () => {
  const { collectionId } = useParams()
  const { data, loading, refetch } = useContractByCollectionId({ id: collectionId })

  if (!collectionId) return <div>Collection id not found</div>
  if (loading) return <div>Loading</div>

  return data ? <ContractView contract={data} /> : <CreateContract collectionId={collectionId} />
}

export default ContractWizard
