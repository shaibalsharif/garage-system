import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Snackbar, Box, useMediaQuery, useTheme } from '@mui/material';
import { People, DirectionsCar, Inventory, Work, TrendingUp, Warning } from '@mui/icons-material';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

// Dummy data (unchanged)
const initialInventory = [
  { id: 1, name: 'Oil Filter', quantity: 50, threshold: 20 },
  { id: 2, name: 'Brake Pads', quantity: 30, threshold: 15 },
  { id: 3, name: 'Air Filter', quantity: 40, threshold: 25 },
  { id: 4, name: 'Spark Plugs', quantity: 100, threshold: 50 },
  { id: 5, name: 'Wiper Blades', quantity: 25, threshold: 10 },
];

const dummyCustomers = [
  { id: 1, name: 'John Doe', visits: 5 },
  { id: 2, name: 'Jane Smith', visits: 3 },
  { id: 3, name: 'Bob Johnson', visits: 7 },
  { id: 4, name: 'Alice Brown', visits: 2 },
  { id: 5, name: 'Charlie Davis', visits: 4 },
];

const dummySales = [
  { month: 'Jan', sales: 4500 },
  { month: 'Feb', sales: 5200 },
  { month: 'Mar', sales: 4900 },
  { month: 'Apr', sales: 5800 },
  { month: 'May', sales: 5500 },
  { month: 'Jun', sales: 6200 },
];

const dummySuppliers = [
  'AutoParts Inc.',
  'MechaniCorp',
  'GearHead Supplies',
  'MotorMaster Distributors',
  'DriveTime Parts'
];

const Dashboard = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: '' });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  useEffect(() => {
    updateLowStockItems();
  }, [inventory]);

  const updateLowStockItems = () => {
    const lowStock = inventory.filter(item => item.quantity <= item.threshold);
    setLowStockItems(lowStock);
  };

  const handleRestock = (itemId) => {
    const restockQuantity = 10;
    setInventory(prevInventory => 
      prevInventory.map(item => 
        item.id === itemId ? { ...item, quantity: item.quantity + restockQuantity } : item
      )
    );
    const item = inventory.find(i => i.id === itemId);
    const supplier = dummySuppliers[Math.floor(Math.random() * dummySuppliers.length)];
    setNotification({
      open: true,
      message: `Ordered ${restockQuantity} ${item.name}(s) from ${supplier}`
    });
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  const SummaryCard = ({ title, value, icon }) => (
    <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', minHeight: 140 }}>
      <Typography color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" component="div">
        {value}
      </Typography>
      {icon}
    </Paper>
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        display: !isMobile,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={6} sm={3}>
          <SummaryCard title="Customers" value={dummyCustomers.length} icon={<People />} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <SummaryCard title="Cars Serviced" value={15} icon={<DirectionsCar />} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <SummaryCard title="Inventory" value={inventory.length} icon={<Inventory />} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <SummaryCard title="Employees" value={8} icon={<Work />} />
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: isMobile ? 300 : 240 }}>
            <Typography variant="h6">Monthly Sales</Typography>
            <Box sx={{ height: isMobile ? 250 : 200, mt: 1 }}>
              <Bar
                options={chartOptions}
                data={{
                  labels: dummySales.map(item => item.month),
                  datasets: [
                    {
                      label: 'Sales',
                      data: dummySales.map(item => item.sales),
                      backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                  ],
                }}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: isMobile ? 300 : 240 }}>
            <Typography variant="h6">Top Customers</Typography>
            <Box sx={{ height: isMobile ? 250 : 200, mt: 1 }}>
              <Doughnut
                options={chartOptions}
                data={{
                  labels: dummyCustomers.map(customer => customer.name),
                  datasets: [
                    {
                      label: 'Visits',
                      data: dummyCustomers.map(customer => customer.visits),
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
            </Box>
          </Paper>
        </Grid>

        {/* Inventory Management */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom component="div">
              Inventory Management
            </Typography>
            <TableContainer sx={{ maxHeight: 300, overflowY: 'auto' }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Item Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Threshold</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{item.threshold}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleRestock(item.id)}
                        >
                          Restock
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Low Stock Alert */}
        {lowStockItems.length > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: 'warning.light' }}>
              <Typography variant="h6" gutterBottom component="div">
                <Warning /> Low Stock Alert
              </Typography>
              <Typography>
                The following items are running low: {lowStockItems.map(item => item.name).join(', ')}
              </Typography>
            </Paper>
          </Grid>
        )}

        {/* Recent Activities */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom component="div">
              Recent Activities
            </Typography>
            <TableContainer sx={{ maxHeight: 200, overflowY: 'auto' }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Activity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{new Date().toLocaleDateString()}</TableCell>
                    <TableCell>Oil change for customer John Doe</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{new Date(Date.now() - 86400000).toLocaleDateString()}</TableCell>
                    <TableCell>Brake pad replacement for customer Jane Smith</TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell>{new Date(Date.now() - 172800000).toLocaleDateString()}</TableCell>
                    <TableCell>Tire rotation for customer Bob Johnson</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Notification Snackbar */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        message={notification.message}
      />
    </Container>
  );
};

export default Dashboard;