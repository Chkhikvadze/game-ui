import usePlayers from './usePlayers'
import columnConfig from './columnConfig'

import { StyledButton } from 'pages/Collection/Collections/Collections'
import { CustomTable } from 'oldComponents/atoms/CustomTable'

import CreatePlayerModal from 'modals/CreatePlayerModal'

const Players = () => {
  const { openCreatePlayerModal, data, handleDeletePlayer } = usePlayers()
  const config = columnConfig({
    handleDelete: handleDeletePlayer,
  })

  return (
    <>
      <StyledButton onClick={openCreatePlayerModal}>Create Player</StyledButton>

      <CustomTable
        templateColumns="1fr repeat(1, 1fr)  repeat(1,1fr)"
        size="14px"
        displayHeader
        columnsConfig={config}
        data={data?.items || []}
        alignItems="end"
        rowDifferentColors
      />

      <CreatePlayerModal />
    </>
  )
}

export default Players
