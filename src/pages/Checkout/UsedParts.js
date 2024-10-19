import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { TextField, Button, Grid, Typography, Box, Card, CardContent } from '@mui/material';
import { toast } from 'react-toastify';

const UsedParts = ({ selectedCar, onComplete }) => {
  const [parts, setParts] = useState([]);
  const [usedParts, setUsedParts] = useState([{ partId: '', quantity: 0 }]);
  const [serviceCharge, setServiceCharge] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'inventory'));
        const partList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setParts(partList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching parts: ', error);
        setLoading(false);
      }
    };
    fetchParts();
  }, []);

  const handlePartChange = (index, partId, quantity) => {
    const updatedParts = [...usedParts];
    updatedParts[index] = { partId, quantity: parseInt(quantity, 10) || 0 };
    setUsedParts(updatedParts);
  };

  const handleSubmit = async () => {
    try {
      for (const usedPart of usedParts) {
        if (!usedPart.partId || usedPart.quantity <= 0) continue;

        const partRef = doc(db, 'inventory', usedPart.partId);
        const partDoc = await getDoc(partRef);
        const newQuantity = partDoc.data().quantity - usedPart.quantity;

        if (newQuantity < 0) {
          toast.error('Not enough stock for this part.');
          return;
        }

        await updateDoc(partRef, { quantity: newQuantity });
      }
      onComplete({ usedParts, serviceCharge: parseFloat(serviceCharge) });
    } catch (error) {
      console.error('Error updating inventory: ', error);
      toast.error('Error updating inventory.');
    }
  };

  const addPart = () => {
    setUsedParts([...usedParts, { partId: '', quantity: 0 }]);
  };

  if (loading) {
    return <Typography>Loading parts...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6">Used Parts and Service</Typography>
      <Grid container spacing={2}>
        {usedParts.map((usedPart, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <TextField
                  select
                  label="Select Part"
                  value={usedPart.partId}
                  onChange={(e) => handlePartChange(index, e.target.value, usedPart.quantity)}
                  fullWidth
                  SelectProps={{ native: true }}
                >
                  <option value="">Select Part</option>
                  {parts.map((part) => (
                    <option key={part.id} value={part.id}>
                      {part.name} - {part.quantity} available
                    </option>
                  ))}
                </TextField>
                <TextField
                  label="Quantity"
                  type="number"
                  value={usedPart.quantity}
                  onChange={(e) => handlePartChange(index, usedPart.partId, e.target.value)}
                  fullWidth
                  margin="normal"
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="outlined" onClick={addPart}>
            Add More Parts
          </Button>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Service Charge"
            value={serviceCharge}
            onChange={(e) => setServiceCharge(e.target.value)}
            fullWidth
            margin="normal"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
          />
        </Grid>

        
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Complete Invoice
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UsedParts;