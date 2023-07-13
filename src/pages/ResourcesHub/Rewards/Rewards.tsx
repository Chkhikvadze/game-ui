import { useRef, useState } from 'react'

import columnConfig from './columnConfig'
import DataGrid from 'components/DataGrid'

import Button from '@l3-lib/ui-core/dist/Button'
import { useModal } from 'hooks'
import { StyledActionsSection, StyledAddRowWrapper } from 'pages/Asset/Assets/Assets'
import { useRewards } from './useRewards'
import { t } from 'i18next'
import { useEditReward } from './useEditReward'
import { StyledGroupContainer } from 'routes/LayoutStyle'

const Rewards = () => {
  const gridRef: any = useRef({})
  const [groupPanel, setGroupPanel] = useState(false)
  const { getContextMenuItems } = useEditReward()
  const { addBlankRewardRow, data, rewardsRefetch } = useRewards()
  const config = columnConfig(rewardsRefetch)

  return (
    <StyledGroupContainer>
      <div id='header_group'>
        <div id='inner_navigation'>
          <StyledActionsSection>
            <StyledAddRowWrapper>
              <Button kind={Button.kinds.TERTIARY} onClick={addBlankRewardRow}>
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
      />
    </StyledGroupContainer>
  )
}

export default Rewards
