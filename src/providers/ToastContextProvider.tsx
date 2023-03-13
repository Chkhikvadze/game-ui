import React, { useState } from 'react'
import Toast from '@l3-lib/ui-core/dist/Toast'

import { ToastContext } from 'contexts'
import styled from 'styled-components'

export interface ToastProps {
  message?: string
  type?: 'positive' | 'negative' | 'warning'
  open?: boolean
}

const ToastProvider = ({ children }: any) => {
  const [toast, setToast] = useState<ToastProps>({ open: false })

  const contextValue = {
    toast,
    setToast,
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toast
        label={toast.message}
        type={toast.type}
        autoHideDuration={5000}
        open={toast.open}
        onClose={() => setToast({ open: false })}
      />
    </ToastContext.Provider>
  )
}

export default ToastProvider
