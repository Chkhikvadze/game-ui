import usePlayers from './usePlayers'
import columnConfig from './columnConfig'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Button from '@l3-lib/ui-core/dist/Button'
import MenuButton from '@l3-lib/ui-core/dist/MenuButton'

import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'

import DataGrid from 'components/DataGrid'
import { useContext, useRef, useState } from 'react'
import { StyledActionsSection, StyledColumn } from 'pages/Asset/Assets/Assets'
import { StyledHeaderGroup } from 'styles/globalStyle.css'
import { useParams } from 'react-router-dom'
import { useModal } from 'hooks'
import { StyledGroupContainer, StyledTableActionBtn } from 'components/Layout/LayoutStyle'
import styled from 'styled-components'
import { LayoutContext } from 'contexts'

const Players = () => {
  const gridRef: any = useRef({})
  const [groupPanel, setGroupPanel] = useState(false)
  const { onChangeLayout, expand } = useContext(LayoutContext)
  const config = columnConfig()

  const params = useParams()
  const game_id: string = params?.gameId!
  const { openModal } = useModal()

  const { data } = usePlayers({ game_id })

  const onCreatePlayer = () => {
    openModal({ name: 'create-player-modal', data: { game_id } })
  }

  const dataLength = data?.items?.length || 0

  return (
    <StyledGroupContainer id='test'>
      <div id='inner_header'>
        <StyledHeaderGroup>
          <StyledTableValue id='table_value' expand={expand} />

          <StyledExpandButton expand={expand} onClick={prevValue => onChangeLayout(!prevValue)}>
            {expand ? 'Close' : 'Expand'}
          </StyledExpandButton>
        </StyledHeaderGroup>

        <StyledActionsSection>
          {/* <StyledColumn> */}
          <StyledPlayerCountWrapper dataLength={dataLength}>
            <Heading
              type={Heading.types.h1}
              value={dataLength === 0 ? '_ Players' : `${dataLength} Players`}
              size='medium'
              customColor={'rgba(255,255,255,1)'}
            />
          </StyledPlayerCountWrapper>
          {/* </StyledColumn> */}
          <StyledColumn>
            <StyledButtonWrapper>
              <StyledTableActionBtn onClick={() => setGroupPanel(state => !state)}>
                Group by
              </StyledTableActionBtn>
            </StyledButtonWrapper>
            <Button onClick={onCreatePlayer}>Create Player</Button>
            <MenuButton component={MenuDots}></MenuButton>
          </StyledColumn>
        </StyledActionsSection>
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

const StyledButtonWrapper = styled.div`
  width: 120px;
  height: 40px;
`

const StyledExpandButton = styled.button<{ expand?: boolean }>`
  all: unset;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.6);
  padding: 10px 0px;

  ${({ expand }) =>
    expand &&
    `
  position: fixed;
  top: 0;
  right: 0;
  transform: translate(-50%, 50%);
  z-index: 10203040;
  
`}
`

const StyledTableValue = styled.h1<{ expand?: boolean }>`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  color: rgba(255, 255, 255, 1);
  ${({ expand }) =>
    expand &&
    `
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  z-index: 10203040;
`}
`

const StyledPlayerCountWrapper = styled.div<{ dataLength: number; expand?: boolean }>`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 50px;
  width: 100%;

  ${props =>
    props.dataLength === 0 &&
    `
    margin-left: 270px;
  `}

  /* Offset when data length is greater than 0 */
  ${props =>
    props.dataLength > 0 &&
    `
    margin-left: 240px;
  `}
`
