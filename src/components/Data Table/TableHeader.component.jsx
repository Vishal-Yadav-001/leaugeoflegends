import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import React from "react";

const TableHeader = ({
  headerCells,
  valueToOrderBy,
  orderDirection,
  handleRequestSort,
}) => {
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headerCells.map((data) => {
          return (
            <TableCell key={data?.key}>
              {data?.disableSorting ? (
                data?.label
              ) : (
                <TableSortLabel
                  active={valueToOrderBy === data?.key}
                  direction={
                    valueToOrderBy === data?.key ? orderDirection : "asc"
                  }
                  onClick={createSortHandler(data?.key)}
                  data-testid="table header"
                >
                  {data?.label}
                </TableSortLabel>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
