import usePlayers from "./usePlayers";

import { StyledButton } from "pages/Collection/Collections/Collections";
import CreatePlayerModal from "modals/CreatePlayerModal";
import columnConfig from "./columnConfig";
import { CustomTable } from "oldComponents/atoms/CustomTable";

const Players = () => {
  const { openCreatePlayerModal, data, handleDeletePlayer } = usePlayers();
  const config = columnConfig({ handleDelete: handleDeletePlayer });

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
  );
};

export default Players;
