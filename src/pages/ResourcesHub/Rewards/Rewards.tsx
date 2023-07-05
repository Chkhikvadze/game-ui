import { useRef, useState } from 'react'

import columnConfig from './columnConfig'
import DataGrid from 'components/DataGrid'

import Button from '@l3-lib/ui-core/dist/Button'
import { useModal } from 'hooks'
import { StyledActionsSection } from 'pages/Asset/Assets/Assets'
import { useRewards } from './useRewards'
import { t } from 'i18next'
import { useEditReward } from './useEditReward'

const Rewards = () => {
  const gridRef: any = useRef({})
  const [groupPanel, setGroupPanel] = useState(false)
  const { getContextMenuItems } = useEditReward()
  const { addBlankRewardRow, data, rewardsRefetch } = useRewards()
  const config = columnConfig(rewardsRefetch)

  return (
    <>
      <StyledActionsSection>
        <Button kind={Button.kinds.TERTIARY} onClick={addBlankRewardRow}>
          {'Add row'}
        </Button>
      </StyledActionsSection>

      <DataGrid
        ref={gridRef as any}
        data={data || []}
        columnConfig={config}
        groupPanel={groupPanel}
        headerHeight={70}
        contextMenu={getContextMenuItems}
      />
    </>
  )
}

export default Rewards
