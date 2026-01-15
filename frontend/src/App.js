import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Typography } from '@mui/material';
import TableForm from './features/table/tableForm';
import TableView from './components/TableView';
import { setRows } from './features/table/tableSlice';
import { fetchRows } from './services/api';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Зареждаме данните от backend при стартиране
    const loadData = async () => {
      try {
        const data = await fetchRows();
        dispatch(setRows(data));
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    loadData();
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Table Management
      </Typography>
      
      <TableForm />
      <TableView />
    </Container>
  );
}

export default App;