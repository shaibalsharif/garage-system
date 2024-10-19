import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Card, CardContent } from '@mui/material';
import { People, DirectionsCar, Inventory, Work } from '@mui/icons-material';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [cars, setCars] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [topSoldItems, setTopSoldItems] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [customerVisits, setCustomerVisits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch customers
      const customersSnapshot = await getDocs(collection(db, 'customers'));
      setCustomers(customersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Fetch cars
      const carsSnapshot = await getDocs(collection(db, 'cars'));
      setCars(carsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Fetch inventory
      const inventorySnapshot = await getDocs(collection(db, 'inventory'));
      setInventory(inventorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Calculate top sold items
      const soldItems = inventorySnapshot.docs
        .filter(doc => doc.data().quantity < doc.data().initialQuantity)
        .map(doc => ({
          name: doc.data().name,
          soldQuantity: doc.data().initialQuantity - doc.data().quantity
        }))
        .sort((a, b) => b.soldQuantity - a.soldQuantity)
        .slice(0, 5);
      setTopSoldItems(soldItems);

      // Simulate monthly sales data (replace with actual data fetching logic)
      setMonthlySales([
        { month: 'Jan', sales: 45000 },
        { month: 'Feb', sales: 52000 },
        { month: 'Mar', sales: 49000 },
        { month: 'Apr', sales: 58000 },
        { month: 'May', sales: 55000 },
        { month: 'Jun', sales: 62000 },
      ]);

      // Simulate customer visits data (replace with actual data fetching logic)
      setCustomerVisits([
        { month: 'Jan', visits: 320 },
        { month: 'Feb', visits: 350 },
        { month: 'Mar', visits: 410 },
        { month: 'Apr', visits: 480 },
        { month: 'May', visits: 520 },
        { month: 'Jun', visits: 550 },
      ]);
    };

    fetchData();
  }, []);

  const SummaryCard = ({ title, value, icon }) => (
    <Card>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6" component="h2">
              {title}
            </Typography>
            <Typography variant="h3" component="h1">
              {value}
            </Typography>
          </Grid>
          <Grid item>
            {icon}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px', marginBottom: '20px' }}>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Customers" value={customers.length} icon={<People fontSize="large" />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Cars Served" value={cars.length} icon={<DirectionsCar fontSize="large" />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Inventory Items" value={inventory.length} icon={<Inventory fontSize="large" />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Employees" value={15} icon={<Work fontSize="large" />} />
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px', height: '400px' }}>
            <Typography variant="h6">Monthly Sales</Typography>
            <Bar
              options={chartOptions}
              data={{
                labels: monthlySales.map(item => item.month),
                datasets: [
                  {
                    label: 'Sales',
                    data: monthlySales.map(item => item.sales),
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                  },
                ],
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px', height: '400px' }}>
            <Typography variant="h6">Customer Visits</Typography>
            <Line
              options={chartOptions}
              data={{
                labels: customerVisits.map(item => item.month),
                datasets: [
                  {
                    label: 'Visits',
                    data: customerVisits.map(item => item.visits),
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                  },
                ],
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px', height: '400px' }}>
            <Typography variant="h6">Top Sold Items</Typography>
            <Doughnut
              options={chartOptions}
              data={{
                labels: topSoldItems.map(item => item.name),
                datasets: [
                  {
                    label: 'Sold Quantity',
                    data: topSoldItems.map(item => item.soldQuantity),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.5)',
                      'rgba(54, 162, 235, 0.5)',
                      'rgba(255, 206, 86, 0.5)',
                      'rgba(75, 192, 192, 0.5)',
                      'rgba(153, 102, 255, 0.5)',
                    ],
                  },
                ],
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px', height: '400px' }}>
            <Typography variant="h6">Top Customers</Typography>
            <Bar
              options={chartOptions}
              data={{
                labels: customers.slice(0, 5).map(customer => customer.name),
                datasets: [
                  {
                    label: 'Visits',
                    data: customers.slice(0, 5).map(customer => customer.entryCount || 0),
                    backgroundColor: 'rgba(255, 159, 64, 0.5)',
                  },
                ],
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;