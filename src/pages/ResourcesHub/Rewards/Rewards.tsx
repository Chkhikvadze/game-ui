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
  const { deleteReward } = useEditReward()
  const { addBlankRewardRow, data, rewardsRefetch } = useRewards()
  const { openModal, closeModal } = useModal()
  const config = columnConfig(rewardsRefetch)

  const deleteRow = async (itemId: string) => {
    await deleteReward(itemId)
  }

  const getContextMenuItems = (params: any) => {
    const itemId = params.node.data?.id

    const result = [
      ...params.defaultItems,
      {
        name: 'Delete',
        action: () => {
          const deleteFunc = async () => {
            await deleteRow(itemId)
            closeModal('delete-confirmation-modal')
            rewardsRefetch()
          }
          openModal({
            name: 'delete-confirmation-modal',
            data: {
              deleteItem: deleteFunc,
              closeModal: () => closeModal('delete-confirmation-modal'),
              label: t('are-you-sure-you-want-to-delete-this-row?'),
              title: t('delete-row'),
            },
          })
        },
      },
    ]
    return result
  }

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
