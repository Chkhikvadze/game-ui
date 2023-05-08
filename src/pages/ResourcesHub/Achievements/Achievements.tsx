import { useRef, useState } from 'react'

import columnConfig from './columnConfig'
import DataGrid from 'components/DataGrid'

import styled from 'styled-components'
import Button from '@l3-lib/ui-core/dist/Button'

import { useAchievements } from './useAchievements'
import { StyledActionsSection } from 'pages/Asset/Assets/Assets'

const Achievements = () => {
  const gridRef: any = useRef({})
  const [groupPanel, setGroupPanel] = useState(false)

  const { addBlankAchievementRow, data } = useAchievements()

  const config = columnConfig()

  return (
    <StyledRoot>
      <StyledActionsSection>
        {' '}
        <Button kind={Button.kinds.TERTIARY} onClick={addBlankAchievementRow}>
          {'add Achievement'}
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

export default Achievements

const StyledRoot = styled.div`
  height: 80vh;
`
