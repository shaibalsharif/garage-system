import React, { useState, useEffect } from 'react';
import { Paper, Typography, TextField, Grid } from '@mui/material';

export default function ServiceCharges({ onUpdate }) {
  const [charges, setCharges] = useState({ labor: 0, vat: 0, discount: 0 });

  useEffect(() => {
    onUpdate(charges);
  }, [charges]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCharges(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <Paper className="p-4 mb-4">
      <Typography variant="h6" className="mb-2">Service Charges</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Labor Charges"
            name="labor"
            type="number"
            value={charges.labor}
            onChange={handleChange}
            InputProps={{ startAdornment: '$' }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="VAT (%)"
            name="vat"
            type="number"
            value={charges.vat}
            onChange={handleChange}
            InputProps={{ endAdornment: '%' }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Discount"
            name="discount"
            type="number"
            value={charges.discount}
            onChange={handleChange}
            InputProps={{ startAdornment: '$' }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}