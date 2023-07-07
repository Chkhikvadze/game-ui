import { useRef, useState } from 'react'

import DataGrid from 'components/DataGrid'
import columnConfig from './columnConfig'

import { useAttributes } from './useAttributes'

import Button from '@l3-lib/ui-core/dist/Button'
import { StyledActionsSection } from 'pages/Asset/Assets/Assets'
import { useEditAttributes } from './useEditAttribute'
import { StyledGroupContainer } from 'routes/LayoutStyle'

const Attributes = () => {
  const gridRef: any = useRef({})
  const [groupPanel, setGroupPanel] = useState(false)
  const { getContextMenuItems } = useEditAttributes()
  const { addBlankAttributeRow, data } = useAttributes()

  const config = columnConfig()

  return (
    <StyledGroupContainer>
      <div id='header_group'>
        <div id='navigation_group'>
          <StyledActionsSection>
            <Button kind={Button.kinds.TERTIARY} onClick={addBlankAttributeRow}>
              {'Add row'}
            </Button>
          </StyledActionsSection>
        </div>
      </div>

      <DataGrid
        ref={gridRef as any}
        data={data || []}
        columnConfig={config}
        groupPanel={groupPanel}
        headerHeight={70}
        contextMenu={getContextMenuItems}
        isResourceHub={true}
        // contextMenu={getContextMenuItems}
        // deleteRow={deleteRow}
        // openEditModal={openEditAssetModal}
        // noBorder={true}
      />
    </StyledGroupContainer>
  )
}

export default Attributes
