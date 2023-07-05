import { useRef, useState } from 'react'

import columnConfig from './columnConfig'
import DataGrid from 'components/DataGrid'

import Button from '@l3-lib/ui-core/dist/Button'

import { StyledActionsSection } from 'pages/Asset/Assets/Assets'
import { useRewards } from './useRewards'
import { StyledGroupContainer } from 'routes/LayoutStyle'

const Rewards = () => {
  const gridRef: any = useRef({})
  const [groupPanel, setGroupPanel] = useState(false)

  const { addBlankRewardRow, data } = useRewards()

  const config = columnConfig()

  return (
    <StyledGroupContainer mt='20'>
      <div id='header_group'>
        <StyledActionsSection>
          <Button kind={Button.kinds.TERTIARY} onClick={addBlankRewardRow}>
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
      />
    </StyledGroupContainer>
  )
}

export default Rewards
