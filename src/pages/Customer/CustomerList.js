import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { TextField, Button, Grid, Paper, Pagination, Box, Typography, CircularProgress, Select, MenuItem } from '@mui/material';
import ShowDetailModal from './ShowDetailModal'; // Import ShowDetailModal
import AddCustomerModal from './AddCustomerModal'; // Import AddCustomerModal

const ShowCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState({ name: '', age: '', phone: '', car: '' });
  const [sortOption, setSortOption] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'customers'));
        const customerList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCustomers(customerList);
        setFilteredCustomers(customerList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customers: ', error);
        setError('Error fetching customers.');
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const fetchCarsForCustomer = async (customerId) => {
    try {
      const carQuery = query(collection(db, 'cars'), where('customerId', '==', customerId));
      const carSnapshot = await getDocs(carQuery);
      const carList = carSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCars(carList);
    } catch (error) {
      console.error('Error fetching cars for customer: ', error);
      setError('Error fetching cars for customer.');
    }
  };

  const handleSearch = () => {
    const filtered = customers.filter((customer) => {
      const carMatch = cars.some(car => 
        car.make.toLowerCase().includes(searchQuery.car.toLowerCase()) ||
        car.registrationNumber.toLowerCase().includes(searchQuery.car.toLowerCase())
      );

      return (
        (searchQuery.name === '' || customer.name.toLowerCase().includes(searchQuery.name.toLowerCase())) &&
        (searchQuery.age === '' || customer.age.toString() === searchQuery.age) &&
        (searchQuery.phone === '' || customer.phone.includes(searchQuery.phone)) &&
        (searchQuery.car === '' || carMatch)
      );
    });
    setFilteredCustomers(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'age') {
        return a.age - b.age;
      }
      return 0;
    });
    setFilteredCustomers(sortedCustomers);
  };

  const handleOpenDetailModal = (customer) => {
    setSelectedCustomer(customer);
    fetchCarsForCustomer(customer.id); // Fetch cars associated with the customer
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Typography variant="h4" className="text-center mb-4">
        Customer List
      </Typography>

      {/* Search and Sort Component */}
      <Paper elevation={4} className="p-4 mb-4">
        <Grid container spacing={2}>
          {/* Search Fields */}
          <Grid item xs={12} md={3}>
            <TextField
              label="Search by Name"
              name="name"
              fullWidth
              value={searchQuery.name}
              onChange={(e) => setSearchQuery({ ...searchQuery, name: e.target.value })}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Search by Age"
              name="age"
              fullWidth
              value={searchQuery.age}
              onChange={(e) => setSearchQuery({ ...searchQuery, age: e.target.value })}
              type="number"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Search by Phone"
              name="phone"
              fullWidth
              value={searchQuery.phone}
              onChange={(e) => setSearchQuery({ ...searchQuery, phone: e.target.value })}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Search by Car (Make or Registration)"
              name="car"
              fullWidth
              value={searchQuery.car}
              onChange={(e) => setSearchQuery({ ...searchQuery, car: e.target.value })}
              variant="outlined"
            />
          </Grid>

          {/* Sort Dropdown */}
          <Grid item xs={12} md={4}>
            <Select
              value={sortOption}
              onChange={handleSortChange}
              fullWidth
              displayEmpty
            >
              <MenuItem value="name">Sort by Name</MenuItem>
              <MenuItem value="age">Sort by Age</MenuItem>
            </Select>
          </Grid>

          {/* Search Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Add Customer Button */}
      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="secondary" onClick={handleOpenAddModal}>
          Add Customer
        </Button>
      </Box>

      {/* Customer Cards */}
      <Grid container spacing={2}>
        {currentCustomers.map((customer) => (
          <Grid item xs={12} sm={6} md={4} key={customer.id}>
            <Paper elevation={3} className="p-3">
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">{customer.name}</Typography>
                {/* Assuming customer.createdAt is a valid timestamp or date string */}
                <Typography variant="body2">
                  {new Date(customer.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Typography variant="body2">Age: {customer.age}</Typography>
              <Typography variant="body2">Phone: {customer.phone}</Typography>
              <Button onClick={() => handleOpenDetailModal(customer)} variant="outlined" color="primary" size="small" sx={{ mt: 2 }}>
                View Details
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination count={Math.ceil(filteredCustomers.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} />
      </Box>

      {/* Modals */}
      <ShowDetailModal isOpen={isDetailModalOpen} handleClose={handleCloseDetailModal} customer={selectedCustomer} cars={cars} />
      <AddCustomerModal isOpen={isAddModalOpen} handleClose={handleCloseAddModal} />
    </div>
  );
};

export default ShowCustomer;
