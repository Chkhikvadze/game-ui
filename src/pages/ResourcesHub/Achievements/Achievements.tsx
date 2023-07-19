import { useRef, useState } from 'react'

import columnConfig from './columnConfig'
import DataGrid from 'components/DataGrid'

import Button from '@l3-lib/ui-core/dist/Button'
import { useAchievements } from './useAchievements'
import { StyledActionsSection, StyledAddRowWrapper } from 'pages/Asset/Assets/Assets'
import { useEditAchievements } from './useEditAchievement'
import { StyledGroupContainer } from 'components/Layout/LayoutStyle'

const Achievements = () => {
  const gridRef: any = useRef({})
  const [groupPanel, setGroupPanel] = useState(false)

  const { addBlankAchievementRow, data, achievementsRefetch } = useAchievements()
  const { getContextMenuItems } = useEditAchievements()
  const config = columnConfig(achievementsRefetch)

  return (
    <StyledGroupContainer>
      <div id='header_group'>
        <div id='inner_navigation'>
          <StyledActionsSection>
            <StyledAddRowWrapper>
              <Button kind={Button.kinds.TERTIARY} onClick={addBlankAchievementRow}>
                {'Add row'}
              </Button>
            </StyledAddRowWrapper>
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

export default Achievements
