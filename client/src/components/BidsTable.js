import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
];

export default function BidsTable({ tasks }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="caption table">
        <TableHead sx={{ background: "#e3e3e3" }}>
          <TableRow>
            <TableCell>
              <b>AMOUNT</b>
            </TableCell>
            <TableCell align="left">
              <b>SPREAD</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks &&
            tasks.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {Number(row.askingAmount).toLocaleString()}
                </TableCell>
                <TableCell align="left">{row.spread}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
