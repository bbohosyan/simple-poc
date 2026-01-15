import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import TableForm from './features/table/tableForm';
import TableView from './components/TableView';
import { setRows } from './features/table/tableSlice';
import { fetchRows } from './services/api';

function App() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.table.page);
  const size = useSelector((state) => state.table.size);

  useEffect(() => {
    loadData();
  }, [page]);

  const loadData = async () => {
    try {
      const data = await fetchRows(page, size);
      dispatch(setRows(data));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Table Management
      </Typography>
      
      <TableForm onRowAdded={loadData} />
      <TableView />
    </Container>
  );
}

export default App;