import { useRef, useState } from 'react'

import DataGrid from 'components/DataGrid'
import columnConfig from './columnConfig'

import { useAttributes } from './useAttributes'

import Button from '@l3-lib/ui-core/dist/Button'

import { StyledActionsSection } from 'pages/Asset/Assets/Assets'
import { StyledGroupContainer } from 'routes/LayoutStyle'

const Attributes = () => {
  const gridRef: any = useRef({})
  const [groupPanel, setGroupPanel] = useState(false)

  const { addBlankAttributeRow, data } = useAttributes()

  const config = columnConfig()

  return (
    <StyledGroupContainer mt='20'>
      <div id='header_group'>
        <StyledActionsSection>
          <Button kind={Button.kinds.TERTIARY} onClick={addBlankAttributeRow}>
            {'Add row'}
          </Button>
        </StyledActionsSection>
      </div>

      <DataGrid
        ref={gridRef as any}
        data={data || []}
        columnConfig={config}
        groupPanel={groupPanel}
        headerHeight={70}
        isResourcePage={true}
        // contextMenu={getContextMenuItems}
        // deleteRow={deleteRow}
        // openEditModal={openEditAssetModal}
        // noBorder={true}
      />
    </StyledGroupContainer>
  )
}

export default Attributes
