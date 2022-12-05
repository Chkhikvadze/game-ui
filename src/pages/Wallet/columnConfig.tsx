import React from "react";
import styled from "styled-components";
import { actionButton } from "oldComponents/atoms/CustomTable/TableActions";
import { TableActions } from "oldComponents/atoms/CustomTable";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import moment from "moment";
// import { Link } from 'react-router-dom's

const ActionDots = styled.div`
  margin: 0 12px;
`;

type configTypes = {
  handleDelete: Function;
  address: any;
  balance: any;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ handleDelete, address, balance }: configTypes) => [
  {
    name: "Address",
    dataKey: (row: any) => (
      <>
        {String(row.address).substring(0, 6) +
          "..." +
          String(row.address).substring(38)}
      </>
    ),
  },
  { name: "Network", dataKey: "network" },
  {
    name: "Created",
    dataKey: (row: any) => moment(row.created_on).fromNow(),
  },
  { name: "Protocol", dataKey: "protocol" },
  // {
  //   name: "Balance",
  //   dataKey: (row: any) => address === row.address && <p>{balance}</p>,
  // },
  {
    name: "Connected",
    dataKey: (row: any) =>
      address === row.address ? (
        <ConnectButton
          accountStatus="avatar"
          showBalance={{
            smallScreen: true,
            largeScreen: true,
          }}
        />
      ) : (
        <div>---</div>
      ),
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
