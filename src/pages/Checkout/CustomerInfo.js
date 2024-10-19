import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';

export default function CustomerInfo({ customer, car }) {
  return (
    <Paper className="p-4 mb-4">
      <Typography variant="h6" className="mb-2">Customer & Car Information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography><strong>Name:</strong> {customer.name}</Typography>
          <Typography><strong>Phone:</strong> {customer.phone}</Typography>
          <Typography><strong>Email:</strong> {customer.email}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography><strong>Car Make:</strong> {car.make}</Typography>
          <Typography><strong>Registration:</strong> {car.registrationNumber}</Typography>
          <Typography><strong>Entry Date:</strong> {new Date(car.entryDate).toLocaleDateString()}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}