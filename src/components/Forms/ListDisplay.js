import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const ListDisplay = ({ data }) => {
  if (!data.length) {
    return <p>No data to display</p>;
  }

  const columns = Object.keys(data[0]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col}>{col}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((col) => (
              <TableCell key={col}>{row[col]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ListDisplay;
