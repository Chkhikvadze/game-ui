import { ChangeEvent, useRef } from 'react'

import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'

type UploadButtonProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
}

const UploadButton = ({ onChange, isLoading }: UploadButtonProps) => {
  const uploadRef = useRef(null as any)
  const handleUploadButton = async () => {
    uploadRef.current.click()
  }
  return (
    <>
      <input type='file' ref={uploadRef} style={{ display: 'none' }} onChange={onChange} />
      <Button
        onClick={handleUploadButton}
        disabled={isLoading}
        kind={Button.kinds.SECONDARY}
        size={Button.sizes.SMALL}
      >
        <span>Upload File</span>
        {/* {!isLoading && 'Upload File'} */}
        {isLoading && <Loader size={24} />}
      </Button>
    </>
  )
}

export default UploadButton
