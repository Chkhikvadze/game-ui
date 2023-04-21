import usePlayers from './usePlayers'
import columnConfig from './columnConfig'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Button from '@l3-lib/ui-core/dist/Button'
import MenuButton from '@l3-lib/ui-core/dist/MenuButton'

import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'

import CreatePlayerModal from 'modals/CreatePlayerModal'
import DataGrid from 'components/DataGrid'
import { useRef, useState } from 'react'
import { StyledActionsSection, StyledColumn } from 'pages/Asset/Assets/Assets'
import { StyleHeaderGroup, StyledInnerGroup, StyledInnerWrapper } from 'styles/globalStyle.css'
import styled from 'styled-components'

const Players = () => {
  const gridRef: any = useRef({})
  const [groupPanel, setGroupPanel] = useState(false)

  const config = columnConfig()
  const { openCreatePlayerModal, data, handleDeletePlayer } = usePlayers()

  return (
    <>
      <StyleHeaderGroup grid>
        <Heading
          type={Heading.types.h1}
          value={`${data?.items?.length} Players`}
          customColor={'#FFF'}
        />
      </StyleHeaderGroup>

      <StyledActionsSection>
        <StyledColumn>
          <Button kind={Button.kinds.TERTIARY} onClick={() => setGroupPanel(state => !state)}>
            Group by
          </Button>
        </StyledColumn>
        <StyledColumn>
          <Button onClick={openCreatePlayerModal}>Create Player</Button>
          <MenuButton component={MenuDots}></MenuButton>
        </StyledColumn>
      </StyledActionsSection>
      <>
        <DataGrid
          ref={gridRef as any}
          data={data?.items || []}
          columnConfig={config}
          groupPanel={groupPanel}
          // contextMenu={getContextMenuItems}
          // deleteRow={deleteRow}
          // openEditModal={openEditAssetModal}
          // noBorder={true}
        />
      </>
      <CreatePlayerModal />
    </>
  )
}

export default Players
