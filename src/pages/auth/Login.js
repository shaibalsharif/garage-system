import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Box,
  IconButton,
  Grid
} from '@mui/material';
import { Facebook, Google, LinkedIn } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f85f6a', // Coral color
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

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate()
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };
  const loginUser = async ({ email, password }) => {
    try {
      // Log in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch the user's additional details from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        navigate('/')
        console.log("Logged in and fetched user data:", userData);
      } else {

        console.log("No such user document in Firestore!");
      }


    } catch (error) {
      console.log("Error logging in:", error);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login submitted', formData);
    loginUser(formData)
    // Perform the Firebase login function here
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" className="h-screen flex items-center justify-center">
        <Paper elevation={10} className="w-full max-w-4xl overflow-hidden">
          <Grid container>
            {/* Left side - Sign In Form */}
            <Grid item xs={12} md={6} className="p-8">
              <Typography component="h1" variant="h4" className="mb-6 text-center">
                Sign in
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
                or use your account
              </Typography>
              <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-100"
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
                />
                <Typography className="text-right">
                  <a href="/forgot-password" className="text-gray-600 hover:underline">
                    Forgot your password?
                  </a>
                </Typography>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="py-3 text-lg font-semibold mt-4"
                >
                  SIGN IN
                </Button>
              </form>
            </Grid>
            {/* Right side - Sign Up Prompt */}
            <Grid item xs={12} md={6} className="bg-primary text-black p-8 flex flex-col items-center justify-center">
              <Typography variant="h4" className="mb-6 font-bold">
                Hello, Friend!
              </Typography>
              <Typography className="text-center mb-8">
                Enter your personal details and start your journey with us
              </Typography>
              <Button
                variant="outlined"
                color="inherit"
                href="/register"
                className="py-2 px-8 rounded-full border-2 hover:bg-white hover:text-primary transition-colors"
              >
                SIGN UP
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
