import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ py: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} <i>Car Mechanic Shop</i>.All rights reserved.
      </Typography>
    </Box>
  );
}
