import { useMutation, useQuery } from '@apollo/client'
// import { loader } from 'graphql.macro'

import createAttributeGql from '../gql/assetTraits/createAttribute.gql'
// import propertiesGql from '../gql/property/properties.gql'
// import propertyByIdGql from '../gql/property/propertyById.gql'
// import updatePropertyByIdGql from '../gql/property/updatePropertyById.gql'
// import deletePropertyByIdGql from '../gql/property/deletePropertyById.gql'
// import updatePropertyMediaGql from '../gql/property/updatePropertyMedia.gql'

export const useCreateAttributeService = () => {
  const [mutation] = useMutation(createAttributeGql)
  const createAttributeService = async (input: any, callback: any) => {
    console.log(input)
    const data = await mutation({
      variables: { input },
    })
    console.log(data)
    if (callback) {
      callback()
    }

    return data
  }

  return [createAttributeService]
}
