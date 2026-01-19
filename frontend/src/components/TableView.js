import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Box } from '@mui/material';
import { setPage } from '../features/table/tableSlice';

function TableView() {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.table.rows);
  const totalCount = useSelector((state) => state.table.totalCount);
  const page = useSelector((state) => state.table.page);
  const size = useSelector((state) => state.table.size);

  const totalPages = Math.ceil(totalCount / size);

  const handlePageChange = (_, value) => {
    dispatch(setPage(value - 1));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type Number</TableCell>
              <TableCell>Type Selector</TableCell>
              <TableCell>Type Free Text</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.typeNumber}</TableCell>
                <TableCell>{row.typeSelector}</TableCell>
                <TableCell>{row.typeFreeText}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Pagination 
          count={totalPages} 
          page={page + 1} 
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </>
  );
}

export default TableView;