import { useRef, useState } from 'react'

import DataGrid from 'components/DataGrid'
import columnConfig from './columnConfig'

import { useAttributes } from './useAttributes'

import Button from '@l3-lib/ui-core/dist/Button'
import { useModal } from 'hooks'
import { StyledActionsSection } from 'pages/Asset/Assets/Assets'
import { useEditAttributes } from './useEditAttribute'
import { t } from 'i18next'

const Attributes = () => {
  const { openModal, closeModal } = useModal()
  const gridRef: any = useRef({})
  const [groupPanel, setGroupPanel] = useState(false)
  const { deleteAttribute } = useEditAttributes()
  const { addBlankAttributeRow, data, attributesRefetch } = useAttributes()

  const config = columnConfig(attributesRefetch)

  const deleteRow = async (itemId: string) => {
    await deleteAttribute(itemId)
    attributesRefetch()
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
        <Button kind={Button.kinds.TERTIARY} onClick={addBlankAttributeRow}>
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
        // deleteRow={deleteRow}
        // openEditModal={openEditAssetModal}
        // noBorder={true}
      />
    </>
  )
}

export default Attributes
