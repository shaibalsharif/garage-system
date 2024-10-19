import React, { useState, useEffect } from 'react';
import { Paper, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function PartsSelection({ onSelect }) {
  const [inventory, setInventory] = useState([]);
  const [selectedParts, setSelectedParts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const inventorySnapshot = await getDocs(collection(db, 'inventory'));
      const inventoryData = inventorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInventory(inventoryData);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleAddPart = (part) => {
    const updatedParts = [...selectedParts, { ...part, quantity: 1 }];
    setSelectedParts(updatedParts);
    onSelect(updatedParts);
  };

  const handleRemovePart = (partId) => {
    const updatedParts = selectedParts.filter(part => part.id !== partId);
    setSelectedParts(updatedParts);
    onSelect(updatedParts);
  };

  const handleQuantityChange = (partId, newQuantity) => {
    const updatedParts = selectedParts.map(part => 
      part.id === partId ? { ...part, quantity: parseInt(newQuantity) || 0 } : part
    );
    setSelectedParts(updatedParts);
    onSelect(updatedParts);
  };

  const filteredInventory = inventory.filter(part => 
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.partNumber.includes(searchTerm)
  );

  return (
    <Paper className="p-4 mb-4">
      <Typography variant="h6" className="mb-2">Select Parts</Typography>
      <TextField
        label="Search Parts"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <List>
        {filteredInventory.map(part => (
          <ListItem key={part.id}>
            <ListItemText 
              primary={part.name} 
              secondary={`Part #: ${part.partNumber} - Price: $${part.sellingPrice}`} 
            />
            <ListItemSecondaryAction>
              <Button onClick={() => handleAddPart(part)}>Add</Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" className="mt-4 mb-2">Selected Parts</Typography>
      <List>
        {selectedParts.map(part => (
          <ListItem key={part.id}>
            <ListItemText 
              primary={part.name} 
              secondary={`Part #: ${part.partNumber} - Price: $${part.sellingPrice}`} 
            />
            <TextField
              type="number"
              value={part.quantity}
              onChange={(e) => handleQuantityChange(part.id, e.target.value)}
              inputProps={{ min: 1 }}
              style={{ width: 60, marginRight: 10 }}
            />
            <IconButton edge="end" aria-label="delete" onClick={() => handleRemovePart(part.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}