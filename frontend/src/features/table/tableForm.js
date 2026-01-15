import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { addRow } from './tableSlice';
import { createRow } from '../../services/api';

function TableForm() {
  const [typeNumber, setTypeNumber] = useState('');
  const [typeSelector, setTypeSelector] = useState('');
  const [typeFreeText, setTypeFreeText] = useState('');
  
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const rowData = {
      typeNumber: parseInt(typeNumber),
      typeSelector,
      typeFreeText,
    };

    try {
      // Изпращаме към backend
      const newRow = await createRow(rowData);
      
      // Добавяме в Redux store
      dispatch(addRow(newRow));
      
      // Изчистваме формата
      setTypeNumber('');
      setTypeSelector('');
      setTypeFreeText('');
    } catch (error) {
      console.error('Error creating row:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
      <TextField
        type="number"
        label="Type Number"
        value={typeNumber}
        onChange={(e) => setTypeNumber(e.target.value)}
      />
      
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Type Selector</InputLabel>
        <Select
          value={typeSelector}
          onChange={(e) => setTypeSelector(e.target.value)}
        >
          <MenuItem value="A">Option A</MenuItem>
          <MenuItem value="B">Option B</MenuItem>
          <MenuItem value="C">Option C</MenuItem>
        </Select>
      </FormControl>
      
      <TextField
        label="Type Free Text"
        value={typeFreeText}
        onChange={(e) => setTypeFreeText(e.target.value)}
      />
      
      <Button variant="contained" onClick={handleSubmit}>
        Add Row
      </Button>
    </Box>
  );
}

export default TableForm;