import { useState, useEffect } from 'react'
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import axios from 'axios'


const generateUploadUrlServiceGql = loader('../gql/file/generateUploadUrl.gql')


export const useGenerateUploadUrlService = () => {
  const [mutation] = useMutation(generateUploadUrlServiceGql)
  
  const generateUploadUrlServiceService = async (input: any) => {
	const {
	  data:{generateUploadUrl},
	} = await mutation({
	  variables:{input},
	})
	
	return generateUploadUrl
  }
  
  return [generateUploadUrlServiceService]
}


export const useUploadFileService = () => {
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  
  useEffect(() => {
	if (uploadProgress === 100) {
	  setUploadProgress(0)
	}
  }, [uploadProgress])
  
  const uploadFileService = (url: string, file: any) => axios.put(url, file, {
	headers:{
	  'Content-Type':file.type,
	},
	onUploadProgress:({total, loaded}) => {
	  setUploadProgress((loaded / total) * 100)
	  
	},
  })
  
  return {
	uploadProgress,
	uploadFileService,
  }
}
