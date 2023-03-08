import { useState } from 'react'

export interface SnackbarProps {
  message?: string
  type?: 'positive' | 'negative' | 'warning'
  open?: boolean
}

const useToast = () => {
  const [toast, setToast] = useState<SnackbarProps>({ open: false })

  return {
    toast,
    setToast,
  }
}

export default useToast
