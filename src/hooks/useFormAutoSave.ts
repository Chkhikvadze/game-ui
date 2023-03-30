import { useCallback, useEffect } from 'react'
import { useFormContext, UseFormReturn, useWatch } from 'react-hook-form'
import { debounce } from 'lodash'

type UseFormAutoSaveProps = {
  formHook: UseFormReturn<any, any>
  debounceMs?: number
  onSave: () => void
  isCreate?: boolean
}

const useFormAutoSave = ({
  formHook,
  debounceMs = 1000,
  onSave,
  isCreate = false,
}: UseFormAutoSaveProps) => {
  const values = useWatch({
    control: formHook.control,
  })

  const debouncedSubmit = useCallback(
    debounce(() => {
      onSave()
    }, debounceMs),
    [debounceMs],
  )

  useEffect(() => {
    if (isCreate) {
      console.log('isCreate')
      onSave()
    } else {
      console.log('debounced submit')
      debouncedSubmit()
    }
  }, [values, debouncedSubmit, isCreate])
}

export default useFormAutoSave
