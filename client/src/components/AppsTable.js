import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material/";

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
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
            {/* <StyledTableCell align="center">Created At</StyledTableCell>
            <StyledTableCell align="right">Updated At</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {apps.map((app) => {
            const { appname, id, ownerId, createdAt, updatedAt } = app;

            return (
              <StyledTableRow key={id} onClick={() => onAppSelected(app)}>
                <StyledTableCell component="th" scope="row">
                  {appname}
                </StyledTableCell>
                <StyledTableCell align="center">{id}</StyledTableCell>
                <StyledTableCell align="center">{ownerId}</StyledTableCell>
                {/* <StyledTableCell align="right">{createdAt}</StyledTableCell>
              <StyledTableCell align="right">{updatedAt}</StyledTableCell> */}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
