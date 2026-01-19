import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, FormHelperText } from '@mui/material';
import { useSnackbar } from 'notistack';
import { addRow } from './tableSlice';
import { createRow } from '../../services/api';


function TableForm({ onRowAdded }) {
  const [typeNumber, setTypeNumber] = useState('');
  const [typeSelector, setTypeSelector] = useState('');
  const [typeFreeText, setTypeFreeText] = useState('');
  const [errors, setErrors] = useState({});
  
  // TODO: not used,see row 55-56
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const validateForm = () => {
    const newErrors = {};
    
    if (!typeNumber || typeNumber === '') {
      newErrors.typeNumber = 'Type Number is required';
    } else if (parseInt(typeNumber) < 1) {
      newErrors.typeNumber = 'Type Number must be at least 1';
    }
    
    if (!typeSelector || typeSelector === '') {
      newErrors.typeSelector = 'Type Selector is required';
    }
    
    if (!typeFreeText || typeFreeText.trim() === '') {
      newErrors.typeFreeText = 'Type Free Text is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      enqueueSnackbar('Please fix validation errors', { variant: 'error' });
      return;
    }

    const rowData = {
      typeNumber: parseInt(typeNumber),
      typeSelector,
      typeFreeText,
    };

    try {
      const newRow = await createRow(rowData);
      
      // TODO: table bug
      // dispatch(addRow(newRow));
      
      setErrors({});
      
      enqueueSnackbar('Row added successfully!', { variant: 'success' });
   
      // TODO: ask Claude: onRowAdded?.()
      if (onRowAdded) onRowAdded();
    } catch (error) {
      console.error('Error creating row:', error);
      
      let errorMessage = 'Failed to add row';
      
      if (error.response?.data?.violations) {
        const violations = error.response.data.violations;
        errorMessage = violations.map(v => v.message).join(', ');
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
      <TextField
        type="number"
        label="Type Number"
        value={typeNumber}
        onChange={(e) => {
          setTypeNumber(e.target.value);
          if (errors.typeNumber) setErrors({...errors, typeNumber: null});
        }}
        error={!!errors.typeNumber}
        helperText={errors.typeNumber}
      />
      
      <FormControl sx={{ minWidth: 120 }} error={!!errors.typeSelector}>
        <InputLabel>Type Selector</InputLabel>
        <Select
          value={typeSelector}
          onChange={(e) => {
            setTypeSelector(e.target.value);
            if (errors.typeSelector) setErrors({...errors, typeSelector: null});
          }}
        >
          <MenuItem value="A">Option A</MenuItem>
          <MenuItem value="B">Option B</MenuItem>
          <MenuItem value="C">Option C</MenuItem>
        </Select>
        {errors.typeSelector && <FormHelperText>{errors.typeSelector}</FormHelperText>}
      </FormControl>
      
      <TextField
        label="Type Free Text"
        value={typeFreeText}
        onChange={(e) => {
          setTypeFreeText(e.target.value);
          if (errors.typeFreeText) setErrors({...errors, typeFreeText: null});
        }}
        error={!!errors.typeFreeText}
        helperText={errors.typeFreeText}
      />
      
      <Button variant="contained" onClick={handleSubmit}>
        Add Row
      </Button>
    </Box>
  );
}

export default TableForm;