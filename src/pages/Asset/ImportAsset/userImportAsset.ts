import React from 'react'
import { useGetDownloadUrl, useParseCsvToJsonService } from 'services'

const useImportAsset = () => {
  const [step, setStep] = React.useState<number>(0)
  const [parsedCsvData, setParsedCsvData] = React.useState([])
  const { parseCsvToJson } = useParseCsvToJsonService()
  const { data: template } = useGetDownloadUrl('template/Template_asset.csv')

  const handleFileChange = async (e: any) => {
    const { files } = e.target

    const response = await parseCsvToJson(files[0], [])

    setParsedCsvData(response.data)
    setStep(1)
  }

  const handleDownloadTemplate = () => {
    window.open(template.url, '_blank')
  }

  return {
    handleFileChange,
    step,
    parsedCsvData,
    setStep,
    handleDownloadTemplate,
  }
}

export default useImportAsset
