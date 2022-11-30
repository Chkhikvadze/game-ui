import React from "react";
import styled from "styled-components";
import { actionButton } from "oldComponents/atoms/CustomTable/TableActions";

import { TableActions } from "oldComponents/atoms/CustomTable";

const ActionDots = styled.div`
  margin: 0 12px;
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ handleDeleteAccountAccess, disabled }: any) => [
  { name: "Email addresses", dataKey: "assigned_user_email" },
  {
    name: <ActionDots />,
    dataKey: (row: any) => (
      <TableActions>
        {actionButton({
          label: "Delete",
          width: 120,
          color: disabled ? "#DC3545" : "#d58e96",
          onClick: () => handleDeleteAccountAccess(row),
        })}
      </TableActions>
    ),
  },
];
