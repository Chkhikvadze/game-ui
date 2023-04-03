import { useMemo } from 'react'
import { FieldValues, UseFormReturn, useWatch } from 'react-hook-form'
import { debounce } from 'lodash'
import { useUpdateEffect } from 'usehooks-ts'

type UseFormAutoSaveProps<T extends FieldValues> = {
  formHook: UseFormReturn<T, any>
  debounceMs?: number
  onSave: () => Promise<void>
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

  const debouncedSave = useMemo(() => debounce(onSave, debounceMs), [debounceMs, onSave])

  useUpdateEffect(() => {
    if (executeImmediately) {
      onSave()
    } else {
      debouncedSave()
    }
  }, [values, debouncedSave, onSave])
}

export default useFormAutoSave
