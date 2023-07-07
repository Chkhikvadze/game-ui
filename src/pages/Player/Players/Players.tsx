import usePlayers from './usePlayers'
import columnConfig from './columnConfig'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Button from '@l3-lib/ui-core/dist/Button'
import MenuButton from '@l3-lib/ui-core/dist/MenuButton'

import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'

import DataGrid from 'components/DataGrid'
import { useRef, useState } from 'react'
import { StyledActionsSection, StyledColumn } from 'pages/Asset/Assets/Assets'
import { StyledHeaderGroup } from 'styles/globalStyle.css'
import { useParams } from 'react-router-dom'
import { useModal } from 'hooks'
import {
  StyledGroupContainer,
  StyledTableActionBtn,
  StyledTableHeaderGroup,
  StyledTableValue,
} from 'routes/LayoutStyle'
import styled from 'styled-components'

const Players = () => {
  const gridRef: any = useRef({})
  const [groupPanel, setGroupPanel] = useState(false)

  const config = columnConfig()

  const params = useParams()
  const game_id: string = params?.gameId!
  const { openModal } = useModal()

  const { data } = usePlayers({ game_id })

  const onCreatePlayer = () => {
    openModal({ name: 'create-player-modal', data: { game_id } })
  }

  return (
    <StyledGroupContainer>
      <div id='header_group'>
        <div id='navigation_group'>
          <StyledHeaderGroup grid>
            <StyledTableValue>{`${data?.items?.length} Players`}</StyledTableValue>
          </StyledHeaderGroup>

          <StyledActionsSection>
            <StyledColumn>
              <StyledTableActionBtn onClick={() => setGroupPanel(state => !state)}>
                Group by
              </StyledTableActionBtn>
            </StyledColumn>
            <StyledColumn>
              <Button onClick={onCreatePlayer}>Create Player</Button>
              <MenuButton component={MenuDots}></MenuButton>
            </StyledColumn>
          </StyledActionsSection>
        </div>
      </div>
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
      {/* <CreatePlayerModal /> */}
    </StyledGroupContainer>
  )
}

export default Players
