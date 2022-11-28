import {
  useGenerateUploadUrlService,
  useUploadFileService,
} from 'services/useFileService'
// import { IFileObject } from './types'

const useUploadFile = () => {
  const {uploadFileService, uploadProgress} = useUploadFileService()
  const {generateUploadUrlServiceService, loading} = useGenerateUploadUrlService()
  
  const uploadFile = async (fileObj: any, file: File) => {
	const res = await generateUploadUrlServiceService(fileObj)
	await uploadFileService(res.upload_url, file)
	
	return res.file_location
  }
  
  return {
	uploadFile,
	uploadProgress,
	loading
  }
}

export default useUploadFile