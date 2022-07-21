import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material/";
import { styled } from "@mui/material/styles";
import * as React from "react";
import PropTypes from "prop-types";

import { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AppsTable({ apps, onAppSelected }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">App ID</StyledTableCell>
            <StyledTableCell align="center">Owner ID</StyledTableCell>
            <StyledTableCell align="center">Created At</StyledTableCell>
            <StyledTableCell align="center">Updated At</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apps.map((app) => {
            const { appname, id, ownerId, createdAt, updatedAt } = app;

            const createdDate = new Date(createdAt),
              updatedDate = new Date(updatedAt);

            return (
              <StyledTableRow key={id} hover onClick={() => onAppSelected(app)}>
                <StyledTableCell component="th" scope="row">
                  {appname}
                </StyledTableCell>
                <StyledTableCell align="center">{id}</StyledTableCell>
                <StyledTableCell align="center">{ownerId}</StyledTableCell>
                <StyledTableCell align="center">
                  {createdDate.toLocaleString()}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {updatedDate.toLocaleString()}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

AppsTable.propTypes = {
  apps: PropTypes.array,
  onAppSelected: PropTypes.func,
};
