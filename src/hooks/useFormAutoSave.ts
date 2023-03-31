import { useCallback, useEffect, useRef } from 'react'
import { FieldValues, UseFormReturn, useWatch } from 'react-hook-form'
import { debounce } from 'lodash'

type UseFormAutoSaveProps<T extends FieldValues> = {
  formHook: UseFormReturn<T, any>
  debounceMs?: number
  onSave: () => void
  executeImmediately?: boolean
}

const useFormAutoSave = <T extends FieldValues>({
  formHook,
  debounceMs = 1000,
  onSave,
  executeImmediately = false,
}: UseFormAutoSaveProps<T>) => {
  const values = useWatch({
    control: formHook.control,
  })

  const debouncedSubmit = useCallback(
    debounce(() => {
      onSave()
    }, debounceMs),
    [debounceMs],
  )

  const mounted = useRef(true)

  useEffect(() => {
    if (!mounted.current) {
      console.log('useEffect inside', values)
      if (executeImmediately) {
        onSave()
      } else {
        debouncedSubmit()
      }
    } else {
      mounted.current = false
    }
  }, [values, debouncedSubmit, executeImmediately])
}

export default useFormAutoSave
