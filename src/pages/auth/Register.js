import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Paper,
  Box,
  Grid,
  IconButton
} from '@mui/material';
import { Facebook, Google, LinkedIn } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {auth,app} from "../../firebase.js"
// Make sure to import your firebase config here

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

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    employeeId: ''
  });

  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword, phoneNumber, address, employeeId } = formData;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        employeeId: employeeId,
        uid: user.uid // store the user ID for easy reference
      });

      console.log('User registered successfully:', user);
      // Redirect or show success message
    } catch (error) {
      console.log('Error registering user:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" className="h-screen flex items-center justify-center">
        <Paper elevation={10} className="w-full max-w-4xl overflow-hidden">
          <Grid container>
            {/* Left side - Welcome Back */}
            <Grid item xs={12} md={6} className="bg-primary text-black p-8 flex flex-col items-center justify-center">
              <Typography variant="h4" className="mb-6 font-bold">
                Welcome Back!
              </Typography>
              <Typography className="text-center mb-8">
                To keep connected with us please login with your personal info
              </Typography>
              <Button
                variant="outlined"
                color="inherit"
                href="/login"
                className="py-2 px-8 rounded-full border-2 hover:bg-white hover:text-primary transition-colors"
              >
                SIGN IN
              </Button>
            </Grid>
            {/* Right side - Sign Up Form */}
            <Grid item xs={12} md={6} className="p-8">
              <Typography component="h1" variant="h4" className="mb-6 text-center">
                Create Account
              </Typography>
              <Box className="flex justify-center space-x-4 mb-6">
                <IconButton className="bg-gray-100 hover:bg-gray-200">
                  <Facebook />
                </IconButton>
                <IconButton className="bg-gray-100 hover:bg-gray-200">
                  <Google />
                </IconButton>
                <IconButton className="bg-gray-100 hover:bg-gray-200">
                  <LinkedIn />
                </IconButton>
              </Box>
              <Typography className="text-center mb-4 text-gray-600">
                or use your email for registration
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
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-100"
                  required
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-gray-100"
                  required
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
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
                  label="Employee ID"
                  name="employeeId"
                  value={formData.employeeId}
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
                  SIGN UP
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
