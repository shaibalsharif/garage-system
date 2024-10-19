import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Box, Grid, MenuItem } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the toastify styles
import { db } from '../../firebase';

// Define custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#f85f6a',
    },
    background: {
      default: '#ffffff',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
});

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    sex: '',
    emergencyContact: '',
    createdAt:new Date()
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, 'customers'), formData);
      toast.success('Customer added successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        dob: '',
        sex: '',
        emergencyContact: '',
        createdAt:new Date()
      });
    } catch (error) {
      toast.error('Error adding customer: ' + error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" className="h-screen flex items-center justify-center">
        <Paper elevation={10} className="w-full max-w-4xl overflow-hidden">
     
          <Grid container>
            {/* Left side */}
            <Grid item xs={12} md={6} className="bg-primary text-black p-8 flex flex-col items-center justify-center">
              <Typography variant="h4" className="mb-6 font-bold">
                Add a New Customer
              </Typography>
              <Typography className="text-center mb-8">
                Provide the necessary information to add a new customer to the system.
              </Typography>
            </Grid>
            {/* Right side - Form */}
            <Grid item xs={12} md={6} className="p-8">
              <Typography component="h1" variant="h4" className="mb-6 text-center">
                Customer Information
              </Typography>
              <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-100"
                  required
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-100"
                  required
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-gray-100"
                  required
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="bg-gray-100"
                  required
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  className="bg-gray-100"
                  InputLabelProps={{
                    shrink: true, // Ensure label stays above the input field when it's filled
                  }}
                  required
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  select
                  label="Sex"
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className="bg-gray-100"
                  required
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Emergency Contact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="bg-gray-100"
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="py-3 text-lg font-semibold mt-4"
                >
                  ADD CUSTOMER
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default AddCustomer;
