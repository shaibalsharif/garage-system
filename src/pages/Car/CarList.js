import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, IconButton, Modal, Box, TextField, TablePagination, CircularProgress, Grid, Card, CardContent, Typography
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Firebase initialized here
import { toast } from 'react-toastify';
import AddCar from './AddCar'; // Assuming AddCar is the reusable component for the modal
import useMediaQuery from '@mui/material/useMediaQuery';

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [customers, setCustomers] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null); // For editing car
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const isSmallScreen = useMediaQuery('(max-width: 768px)'); // For responsive layout

  useEffect(() => {
    fetchCarsAndCustomers();
  }, []);

  // Fetch cars and associated customers from Firestore
  const fetchCarsAndCustomers = async () => {
    setLoading(true);
    try {
      // Fetch cars
      const carQuery = collection(db, 'cars');
      const carSnapshot = await getDocs(carQuery);
      const carList = carSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Fetch all customers associated with the cars
      const customerData = {};
      await Promise.all(
        carList.map(async (car) => {
          if (car.customerId && !customerData[car.customerId]) {
            const customerDoc = await getDoc(doc(db, 'customers', car.customerId));
            if (customerDoc.exists()) {
              customerData[car.customerId] = customerDoc.data();
            }
          }
        })
      );

      setCars(carList);
      setFilteredCars(carList);
      setCustomers(customerData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Error fetching cars and customers');
      console.error('Error fetching cars and customers: ', error);
    }
  };

  // Handle search filtering
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = cars.filter((car) =>
      car.make.toLowerCase().includes(value) ||
      car.registrationNumber.toLowerCase().includes(value)
    );
    setFilteredCars(filtered);
  };

  // Handle adding a new car
  const handleAddCar = () => {
    setOpenAddModal(true);
  };

  // Handle editing a car (prefill form)
  const handleEditCar = (car) => {
    setSelectedCar(car);
    setOpenEditModal(true);
  };

  // Handle saving the edited car
  const handleSaveEditCar = async (updatedCar) => {
    try {
      const carDoc = doc(db, 'cars', updatedCar.id);
      await updateDoc(carDoc, updatedCar);
      toast.success('Car updated successfully');
      setOpenEditModal(false);
      fetchCarsAndCustomers(); // Refetch updated data
    } catch (error) {
      toast.error('Error updating car');
      console.error('Error updating car: ', error);
    }
  };

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const style = {
    modalBox: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: isSmallScreen ? '90%' : 400,
      maxHeight: '80%',
      overflowY: 'auto',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      borderRadius: '8px',
    }
  };

  // Display customer information as "Name (Phone)"
  const renderCustomerInfo = (customerId) => {
    const customer = customers[customerId];
    if (customer) {
      return `${customer.name} (${customer.phone})`;
    }
    return 'Unknown Customer';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Cars List</h2>
      <div className="mb-4 flex justify-between">
        <TextField
          label="Search by Make or Registration Number"
          value={searchTerm}
          onChange={handleSearch}
          variant="outlined"
          size="small"
        />
        <Button variant="contained" color="primary" onClick={handleAddCar}>
          Add Car
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : isSmallScreen ? (
        // Card View for small screens
        filteredCars.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((car, index) => (
          <Card key={car.id} variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{car.make} - {car.registrationNumber}</Typography>
              <Typography variant="body2">Color: {car.color}</Typography>
              <Typography variant="body2">Build: {car.build}</Typography>
              <Typography variant="body2">Problems: {car.problems || 'N/A'}</Typography>
              <Typography variant="body2">Customer: {renderCustomerInfo(car.customerId)}</Typography>
              <div className="mt-2">
                <IconButton onClick={() => handleEditCar(car)}><Edit /></IconButton>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        // Table view for larger screens
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Color</TableCell>
                  <TableCell>Build</TableCell>
                  <TableCell>Make</TableCell>
                  <TableCell>Registration Number</TableCell>
                  <TableCell>Problems</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCars.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((car, index) => (
                  <TableRow key={car.id} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                    <TableCell>{car.color}</TableCell>
                    <TableCell>{car.build}</TableCell>
                    <TableCell>{car.make}</TableCell>
                    <TableCell>{car.registrationNumber}</TableCell>
                    <TableCell>{car.problems || 'N/A'}</TableCell>
                    <TableCell>{renderCustomerInfo(car.customerId)}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditCar(car)}><Edit /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredCars.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}

      {/* Modal for Adding Car */}
      <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <Box sx={style.modalBox}>
          <AddCar onClose={() => setOpenAddModal(false)} />
        </Box>
      </Modal>

      {/* Modal for Editing Car with prefilled data */}
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Box sx={style.modalBox}>
          <AddCar
            carData={selectedCar} // Prefill the modal with selected car's data
            onSave={handleSaveEditCar}
            onClose={() => setOpenEditModal(false)}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default CarsList;
