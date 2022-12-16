import React from 'react'
import { useParseCsvToJsonService } from 'services'

const useImportNft = () => {
  const [step, setStep] = React.useState<number>(0)
  const [parsedCsvData, setParsedCsvData] = React.useState([])
  const { parseCsvToJson } = useParseCsvToJsonService()

  const handleFileChange = async (e: any) => {
    const { files } = e.target

    const response = await parseCsvToJson(files[0], [])

    setParsedCsvData(response.data)
    setStep(1)
  }

  return {
    handleFileChange,
    step,
    parsedCsvData,
  }
}

export default useImportNft
