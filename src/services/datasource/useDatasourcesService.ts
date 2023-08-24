import { useQuery } from '@apollo/client'
import datasourcesGql from '../../gql/datasource/datasources.gql'

export const useDatasourcesService = () => {
  const { data, error, loading, refetch } = useQuery(datasourcesGql)

  return {
    data: data?.getDatasources || [],
    error,
    loading,
    refetch,
  }
}
