import { useState } from 'react'
import Checkbox from '@l3-lib/ui-core/dist/Checkbox'
import styled from 'styled-components'

const useCheckboxRenderer = () => {
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)

  const HeaderCheckbox = (p: any) => (
    <StyledDiv>
      <Checkbox
        indeterminate={indeterminate}
        checked={checked}
        size='small'
        kind='secondary'
        onChange={() => {
          const selectedRows = p.api.getSelectedRows()
          const allRows = p.api.getModel().gridOptionsWrapper.gridOptions.rowData
          if (selectedRows.length === allRows.length) {
            p.api.deselectAll()
            setChecked(false)
          } else {
            p.api.selectAll()
            setChecked(true)
            setIndeterminate(false)
          }
          p.api.refreshCells(p)
        }}
      />
    </StyledDiv>
  )

  const RowCheckbox = (p: any) => (
    <StyledDiv>
      <Checkbox
        size='small'
        kind='secondary'
        checked={p.node.isSelected()}
        onChange={() => {
          if (p.node.isSelected()) {
            p.node.setSelected(false)
            setIndeterminate(true)
            const selectedRows = p.api.getSelectedRows()
            if (selectedRows.length === 0) {
              setIndeterminate(false)
              setChecked(false)
            }
          } else if (!p.node.isSelected()) {
            p.node.setSelected(true)
            setIndeterminate(true)
            const selectedRows = p.api.getSelectedRows()
            const allRows = p.api.getModel().gridOptionsWrapper.gridOptions.rowData
            if (selectedRows.length === allRows.length) {
              setIndeterminate(false)
              setChecked(true)
            }
          }
          p.api.refreshCells(p)
        }}
      />
    </StyledDiv>
  )

  return {
    HeaderCheckbox,
    RowCheckbox,
  }
}

export default useCheckboxRenderer

const StyledDiv = styled.div`
  margin: 10px;
`
