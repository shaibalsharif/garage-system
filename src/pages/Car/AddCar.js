import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';
 // Assuming Firebase is initialized here
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';

const AddCar = () => {
  const [car, setCar] = useState({
    color: '',
    build: '',
    make: '',
    registrationNumber: '',
    problems: '',
    entryDate: new Date().toISOString(),
    customerId: ''
  });
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Fetch customer list from Firestore
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const customerQuery = query(collection(db, 'customers'));
      const customerSnapshot = await getDocs(customerQuery);
      const customerList = customerSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(customerList);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Error fetching customers');
      console.error('Error fetching customers: ', error);
    }
  };

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate registration number uniqueness
    if (!car.registrationNumber) {
      toast.error('Registration number is required');
      return;
    }

    if (!car.customerId) {
      toast.error('Please select a customer');
      return;
    }

    setIsSubmitting(true);

    try {
      // Add car data to Firestore
      await addDoc(collection(db, 'cars'), car);
      toast.success('Car added successfully!');
      navigate('/cars');
    } catch (error) {
      toast.error('Error adding car');
      console.error('Error adding car: ', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Car</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Color"
          name="color"
          value={car.color}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Build"
          name="build"
          value={car.build}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Make"
          name="make"
          value={car.make}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Registration Number"
          name="registrationNumber"
          value={car.registrationNumber}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Problems"
          name="problems"
          value={car.problems}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="customer-label">Customer</InputLabel>
          <Select
            labelId="customer-label"
            name="customerId"
            value={car.customerId}
            onChange={handleChange}
            required
          >
            {loading ? (
              <MenuItem disabled>
                <CircularProgress size={24} />
              </MenuItem>
            ) : (
              customers.map((customer) => (
                <MenuItem key={customer.id} value={customer.id}>
                  {customer.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          fullWidth
          sx={{ marginTop: '16px' }}
        >
          {isSubmitting ? 'Adding...' : 'Add Car'}
        </Button>
      </form>
    </div>
  );
};

export default AddCar;
