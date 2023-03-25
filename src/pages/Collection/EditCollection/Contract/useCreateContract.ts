import { useFormik } from 'formik'
import { useCreateContractService } from 'services/useContractService'

type UseCreateContractProps = {
  collectionId: string
  refetch: () => void
}

const initialValues = {
  chain: '',
  name: '',
  contract_type: '',
  note: '',
}

const useCreateContract = ({ collectionId, refetch }: UseCreateContractProps) => {
  const [createContract] = useCreateContractService()

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: () => {},
  })

  const handleCreateContract = async () => {
    // TODO: change this to use formik values after design
    const contract = await createContract({
      collection_id: collectionId,
      name: 'CryptoOfArms',
      template: 'CryptoOfArms',
      contract_type: 'ERC1155',
      blockchain: 'Polygon',
      chain_name: 'PolygonPos',
      chain_id: 80001,
      environment: 'Testnet',
      config: {
        collection_name: 'CryptoOfArms',
        collection_size: 10000,
        is_mint_by_admin: true,
      },
      note: 'CryptoOfArms Collection',
    })
    refetch()
    console.log(contract)
  }

  return {
    formik,
    handleCreateContract,
  }
}

export default useCreateContract
