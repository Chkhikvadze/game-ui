import React from "react";
import styled from "styled-components";
import { actionButton } from "oldComponents/atoms/CustomTable/TableActions";
import { TableActions } from "oldComponents/atoms/CustomTable";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { Link } from 'react-router-dom's

const ActionDots = styled.div`
  margin: 0 12px;
`;

type configTypes = {
  handleDelete: Function;
  address: any;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ handleDelete, address }: configTypes) => [
  { name: "Address", dataKey: "address" },
  { name: "Created", dataKey: "created_on" },
  {
    name: "Connected",
    dataKey: (row: any) =>
      address === row.address ? <ConnectButton /> : <></>,
  },
  {
    name: <ActionDots />,
    dataKey: (row: any) => (
      <TableActions>
        {actionButton({
          label: "Delete",
          width: 120,
          onClick: () => handleDelete(row),
        })}
      </TableActions>
    ),
  },
];
