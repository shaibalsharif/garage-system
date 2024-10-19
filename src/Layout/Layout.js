import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Avatar, Badge, IconButton, Menu, MenuItem, Drawer, List, ListItem, ListItemText, Collapse, Box, Divider, useMediaQuery } from '@mui/material';
import { ExpandLess, ExpandMore, Notifications, AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer.js';
import { useAuth } from '../context/AuthContext.js';

const navItems = [
  { name: 'Dashboard', url:'/',subItems: null },
  { name: 'Checkout', url:'/checkout',subItems: null },
  { name: 'Customer', subItems: [{ name: 'List', url: 'customers' }, { name: 'Add Customer', url: 'add-customer' }] },
  {
    name: 'Inventory', subItems: [{ name: 'Inventory List', url: 'inventory' },
    { name: 'Add Stock', url: 'add-stock' }]
  },
  { name: 'Car', subItems: [{ name: 'Car List', url: 'cars' }, { name: 'Add Car', url: 'add-car' }] },
  // { name: 'Employee', subItems: ['Employee List', 'Add Employee'] },
];

export default function Layout() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openItems, setOpenItems] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(true); // Initially open
  const isMobile = useMediaQuery('(max-width: 600px)'); // For responsiveness

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleCollapse = (itemName) => {
    setOpenItems({ ...openItems, [itemName]: !openItems[itemName] });
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'} // Mobile vs Desktop behavior
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: drawerOpen ? 240 : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar /> {/* This creates space below the AppBar for the drawer */}
        <List>
          {navItems.map((item) => (
            <React.Fragment key={item.name}>
              {item.subItems ? (
                // Render with sub-items
                <>
                  <ListItem button onClick={() => toggleCollapse(item.name)}>
                    <ListItemText primary={item.name} />
                    {openItems[item.name] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={openItems[item.name]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item?.subItems?.map((subItem) => (
                        <ListItem sx={{ pl: "40px" }} key={subItem.name} button component={Link} to={`/${subItem?.url}`}>
                          <ListItemText primary={subItem.name} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                // Render without sub-items (e.g., Dashboard)
                <ListItem button component={Link} to={`${item?.url}`}>
                  <ListItemText primary={item.name} />
                </ListItem>
              )}
            </React.Fragment>
          ))}
        </List>
        <Divider />
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            {/* Menu button for mobile */}
            {isMobile && (
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
              Your App Title
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={handleMenuClick}>
              <Avatar />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem
                onClick={() => {
                  handleLogout();
                  handleMenuClose();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Toolbar /> {/* This pushes the content below the AppBar */}
        <Box p={3}>
          <Outlet />
        </Box>

        <Footer />
        <ToastContainer />
      </Box>
    </Box>
  );
}
