import { useCallback, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { debounce } from 'lodash'

type UseFormAutoSaveProps = {
  formHook: UseFormReturn<any, any>
  debounceMs?: number
  onSave: () => void
  isCreate?: boolean
}

const useFormAutoSave = ({
  formHook,
  debounceMs = 1500,
  onSave,
  isCreate = false,
}: UseFormAutoSaveProps) => {
  const { watch } = formHook
  const values = watch()

  const debouncedSubmit = useCallback(
    debounce(() => {
      onSave()
    }, debounceMs),
    [debounceMs],
  )

  useEffect(() => {
    if (isCreate) {
      onSave()
    } else {
      debouncedSubmit()
    }
  }, [values, debouncedSubmit, isCreate])
}

export default useFormAutoSave
