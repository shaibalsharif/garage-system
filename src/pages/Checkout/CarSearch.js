import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, TextField, Pagination } from '@mui/material';
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../../firebase';

const PAGE_SIZE = 12;

export default function CarSearch({ onSelect }) {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);

  useEffect(() => {
    fetchCars();
  }, [page]);

  const fetchCars = async () => {
    try {
      let carsQuery;
      if (page === 1) {
        carsQuery = query(collection(db, 'cars'), orderBy('registrationNumber'), limit(PAGE_SIZE));
      } else {
        carsQuery = query(collection(db, 'cars'), orderBy('registrationNumber'), startAfter(lastVisible), limit(PAGE_SIZE));
      }

      const carsSnapshot = await getDocs(carsQuery);
      const carsData = carsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCars(carsData);

      if (carsSnapshot.docs.length > 0) {
        setLastVisible(carsSnapshot.docs[carsSnapshot.docs.length - 1]);
      }

      // Get total count for pagination
      const totalCarsSnapshot = await getDocs(collection(db, 'cars'));
      setTotalPages(Math.ceil(totalCarsSnapshot.size / PAGE_SIZE));
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCars = cars.filter(car =>
    car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TextField
        fullWidth
        label="Search Cars"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4"
      />
      <Grid container spacing={2}>
        {filteredCars.map(car => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={car.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{car.make}</Typography>
                <Typography>Reg: {car.registrationNumber}</Typography>
                <Button onClick={() => onSelect(car)}>Select</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => setPage(value)}
        className="mt-4 flex justify-center"
      />
    </div>
  );
}