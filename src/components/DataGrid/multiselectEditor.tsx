import React, { forwardRef, useState, useRef, useEffect, useImperativeHandle } from 'react'
import Select from 'react-select'

const MultiselectEditor = forwardRef((props: any, ref) => {
  const [value, setValue] = useState(props.value)
  const refInput = useRef(null as any)

  useEffect(() => {
    // focus on the input
    refInput.current?.focus()
  }, [])

  console.log(value)

  /* Component Editor Lifecycle methods */
  useImperativeHandle(ref, () => {
    return {
      // the final value to send to the grid, on completion of editing
      getValue() {
        return value.map((item: any) => item.value).join(', ')
      },

      // Gets called once before editing starts, to give editor a chance to
      // cancel the editing before it even starts.
      isCancelBeforeStart() {
        return false
      },

      // Gets called once when editing is finished (eg if Enter is pressed).
      // If you return true, then the result of the edit will be ignored.
      isCancelAfterEnd() {
        // our editor will reject any value greater than 1000
        return value > 1000
      },
    }
  })

  const options = [
    { value: 'sandro', label: 'Sandro' },
    { value: 'jelo', label: 'Jelo' },
    { value: 'levani', label: 'Levani' },
    { value: 'dato', label: 'Dato' },
    { value: 'giga', label: 'Giga' },
  ]

  return (
    <Select ref={refInput} options={options} isMulti onChange={setValue} value={value as any} />
  )
})

export default MultiselectEditor
