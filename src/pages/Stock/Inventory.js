import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Assuming Firebase is initialized
import { TextField, Button, Grid, Paper, Pagination, Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem } from '@mui/material';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState({ name: '', category: '', supplier: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'inventory'));
        const inventoryList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInventory(inventoryList);
        setFilteredInventory(inventoryList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching inventory: ', error);
        setError('Error fetching inventory.');
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const handleSearch = () => {
    const filtered = inventory.filter((item) => {
      return (
        (searchQuery.name === '' || item.name.toLowerCase().includes(searchQuery.name.toLowerCase())) &&
        (searchQuery.category === '' || item.category === searchQuery.category) &&
        (searchQuery.supplier === '' || item.supplier.toLowerCase().includes(searchQuery.supplier.toLowerCase()))
      );
    });
    setFilteredInventory(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInventory = filteredInventory.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <Typography variant="h4" className="text-center mb-4">
        Inventory List
      </Typography>

      {/* Search Component */}
      <Paper elevation={4} className="p-4 mb-4">
        <Grid container spacing={2}>
          {/* Search Fields */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Search by Part Name"
              name="name"
              fullWidth
              value={searchQuery.name}
              onChange={(e) => setSearchQuery({ ...searchQuery, name: e.target.value })}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Select
              label="Filter by Category"
              name="category"
              fullWidth
              value={searchQuery.category}
              onChange={(e) => setSearchQuery({ ...searchQuery, category: e.target.value })}
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="Engine">Engine</MenuItem>
              <MenuItem value="Brakes">Brakes</MenuItem>
              <MenuItem value="Suspension">Suspension</MenuItem>
              <MenuItem value="Transmission">Transmission</MenuItem>
              {/* Add more categories as needed */}
            </Select>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Search by Supplier"
              name="supplier"
              fullWidth
              value={searchQuery.supplier}
              onChange={(e) => setSearchQuery({ ...searchQuery, supplier: e.target.value })}
              variant="outlined"
            />
          </Grid>

          {/* Search Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Inventory Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Part Name</TableCell>
              <TableCell>Part Number</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Quantity Available</TableCell>
              <TableCell>Cost Price</TableCell>
              <TableCell>Selling Price</TableCell>
              <TableCell>Last Restocked</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.partNumber}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.costPrice.toFixed(2)}</TableCell>
                <TableCell>${item.sellingPrice.toFixed(2)}</TableCell>
                <TableCell>{new Date(item.lastRestocked).toLocaleDateString()}</TableCell>
                <TableCell>{item.quantity > 0 ? 'Active' : 'Out of Stock'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination count={Math.ceil(filteredInventory.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} />
      </Box>
    </div>
  );
};

export default Inventory;
