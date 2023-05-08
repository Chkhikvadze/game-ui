import { useRef, useState } from 'react'

import DataGrid from 'components/DataGrid'
import columnConfig from './columnConfig'

import { useAttributes } from './useAttributes'

import Button from '@l3-lib/ui-core/dist/Button'
import styled from 'styled-components'

import { StyledActionsSection } from 'pages/Asset/Assets/Assets'

const Attributes = () => {
  const gridRef: any = useRef({})
  const [groupPanel, setGroupPanel] = useState(false)

  const { addBlankAttributeRow, data } = useAttributes()

  const config = columnConfig()

  return (
    <StyledRoot>
      <StyledActionsSection>
        <Button kind={Button.kinds.TERTIARY} onClick={addBlankAttributeRow}>
          {'add Attribute'}
        </Button>
      </StyledActionsSection>

      <DataGrid
        ref={gridRef as any}
        data={data || []}
        columnConfig={config}
        groupPanel={groupPanel}
        // headerHeight={300}
        // contextMenu={getContextMenuItems}
        // deleteRow={deleteRow}
        // openEditModal={openEditAssetModal}
        // noBorder={true}
      />
    </StyledRoot>
  )
}

export default Attributes

const StyledRoot = styled.div`
  height: 80vh;
`
