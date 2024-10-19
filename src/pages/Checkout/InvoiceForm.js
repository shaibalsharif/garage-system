import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const InvoiceForm = ({ selectedCar, invoiceData, onComplete }) => {
  const [serviceCharge, setServiceCharge] = useState('');
  const [discount, setDiscount] = useState('');

  const handleSubmit = () => {
    if (!serviceCharge || isNaN(serviceCharge) || serviceCharge <= 0) {
      toast.error('Invalid service charge');
      return;
    }

    if (isNaN(discount)) {
      toast.error('Invalid discount');
      return;
    }

    onComplete({
      ...invoiceData,
      serviceCharge: parseFloat(serviceCharge),
      discount: parseFloat(discount) || 0,
    });

    toast.success('Invoice created successfully!');
  };

  return (
    <Box>
      <Typography variant="h6">Complete Invoice</Typography>

      <TextField
        label="Service Charge"
        value={serviceCharge}
        onChange={(e) => setServiceCharge(e.target.value)}
        fullWidth
        margin="normal"
        type="number"
        InputProps={{ inputProps: { min: 0 } }}
      />

      <TextField
        label="Discount"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
        fullWidth
        margin="normal"
        type="number"
        InputProps={{ inputProps: { min: 0 } }}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Complete Invoice
      </Button>
    </Box>
  );
};

export default InvoiceForm;
