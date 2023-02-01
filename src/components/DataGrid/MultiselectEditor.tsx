import React, { forwardRef, useState, useRef, useEffect, useImperativeHandle } from 'react'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
// import Select from 'react-select'

const MultiselectEditor = forwardRef((props: any, ref) => {
  const filteredValues = props.optionsArr?.filter((item: any) => props.value?.includes(item.value))
  // .map((item: any) => item.label)
  // console.log('res', res)
  // if (realValues) {
  //   //  realValues.map((item: any) => <div>{item}</div>)
  //   console.log('realValues', realValues)
  // }

  const [value, setValue] = useState(filteredValues)
  const refInput = useRef(null as any)
  // console.log('props', props)
  useEffect(() => {
    // focus on the input
    refInput.current?.focus()
  }, [])

  /* Component Editor Lifecycle methods */
  useImperativeHandle(ref, () => ({
    // the final value to send to the grid, on completion of editing
    getValue() {
      return value ? value.map((item: any) => item.value).join(', ') : []
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
  }))

  const options = props.optionsArr.map((value: any) => ({
    label: value.label,
    value: value.value,
  }))

  const optionRemoveHandler = (item: any) => {
    const newValues = value.filter((oldValues: any) => oldValues !== item)
    setValue(newValues)
  }

  return (
    <div
      style={{
        width: '400px',
        minWidth: '400px',
      }}
    >
      <Dropdown
        ref={refInput}
        options={options}
        openMenuOnFocus={true}
        onChange={setValue}
        onOptionRemove={optionRemoveHandler}
        value={value as any}
        menuPlacement={'auto'}
        menuPortalTarget={document.body}
        multi
        multiline
        style={{ width: '100%' }}
      />
    </div>
  )
})

export default MultiselectEditor
