import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { TextField, Button, Grid, Paper, Box, Typography, MenuItem, Select, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

const AddStock = () => {
  const [newPart, setNewPart] = useState({
    name: '',
    partNumber: '',
    category: '',
    quantity: '',
    supplier: '',
    costPrice: '',
    sellingPrice: '',
    warranty: '',
    lastRestocked: new Date().toISOString().slice(0, 10), // Auto-set to current date
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setNewPart({ ...newPart, [e.target.name]: e.target.value });
  };

  const handleAddStock = async () => {
    if (!newPart.name || !newPart.category || !newPart.quantity || !newPart.supplier || !newPart.costPrice || !newPart.sellingPrice) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'inventory'), {
        ...newPart,
        quantity: parseInt(newPart.quantity),
        costPrice: parseFloat(newPart.costPrice),
        sellingPrice: parseFloat(newPart.sellingPrice),
        lastRestocked: new Date(newPart.lastRestocked),
      });
      setLoading(false);
      toast.success('Part added to inventory successfully!');
      setNewPart({
        name: '',
        partNumber: '',
        category: '',
        quantity: '',
        supplier: '',
        costPrice: '',
        sellingPrice: '',
        warranty: '',
        lastRestocked: new Date().toISOString().slice(0, 10),
      });
    } catch (err) {
      console.error('Error adding stock:', err);
      setError('Error adding stock. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" className="text-center mb-4">
        Add New Stock
      </Typography>

      <Paper elevation={4} className="p-4">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Part Name"
              name="name"
              fullWidth
              required
              value={newPart.name}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Part Number"
              name="partNumber"
              fullWidth
              value={newPart.partNumber}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Select
              label="Category"
              name="category"
              fullWidth
              value={newPart.category}
              onChange={handleChange}
              required
            >
              <MenuItem value="Engine">Engine</MenuItem>
              <MenuItem value="Brakes">Brakes</MenuItem>
              <MenuItem value="Suspension">Suspension</MenuItem>
              <MenuItem value="Transmission">Transmission</MenuItem>
              {/* Add more categories as needed */}
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              fullWidth
              required
              value={newPart.quantity}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Supplier"
              name="supplier"
              fullWidth
              required
              value={newPart.supplier}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Cost Price"
              name="costPrice"
              type="number"
              fullWidth
              required
              value={newPart.costPrice}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Selling Price"
              name="sellingPrice"
              type="number"
              fullWidth
              required
              value={newPart.sellingPrice}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Warranty Period (optional)"
              name="warranty"
              fullWidth
              value={newPart.warranty}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Restock Date"
              name="lastRestocked"
              type="date"
              fullWidth
              value={newPart.lastRestocked}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddStock}
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Add to Inventory'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default AddStock;
