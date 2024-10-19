import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ py: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
      <Typography variant="body2" color="textSecondary">
        © 2024 Your Company Name. All rights reserved.
      </Typography>
    </Box>
  );
}
