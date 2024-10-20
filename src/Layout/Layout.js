import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Avatar, Badge, IconButton, Menu, MenuItem, Drawer, List, ListItem, ListItemText, Collapse, Box, Divider, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { ExpandLess, ExpandMore, Notifications, AccountCircle, Menu as MenuIcon, FiberManualRecord as FiberManualRecordIcon } from '@mui/icons-material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer.js';
import { useAuth }from '../context/AuthContext.js';

const navItems = [
  { name: 'Dashboard', url:'/',subItems: null },
  { name: 'Checkout', url:'/checkout',subItems: null },
  { name: 'Customer', subItems: [{ name: 'List', url: 'customers' }, { name: 'Add Customer', url: 'add-customer' }] },
  {
    name: 'Inventory', subItems: [{ name: 'Inventory List', url: 'inventory' },
    { name: 'Add Stock', url: 'add-stock' }]
  },
  { name: 'Car', subItems: [{ name: 'Car List', url: 'cars' }, { name: 'Add Car', url: 'add-car' }] },
];

// Dummy notifications with read/unread status and timestamps
const dummyNotifications = [
  { id: 1, message: "New customer appointment scheduled", read: false, timestamp: new Date(2023, 5, 1, 9, 30) },
  { id: 2, message: "Low stock alert: Oil filters", read: false, timestamp: new Date(2023, 5, 1, 11, 45) },
  { id: 3, message: "Service completed for John Doe's vehicle", read: true, timestamp: new Date(2023, 5, 1, 14, 15) },
  { id: 4, message: "New inventory shipment arrived", read: false, timestamp: new Date(2023, 5, 2, 10, 0) },
  { id: 5, message: "Employee meeting scheduled for tomorrow", read: true, timestamp: new Date(2023, 5, 2, 16, 30) },
];

export default function Layout() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openItems, setOpenItems] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [allNotificationsOpen, setAllNotificationsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleShowAllNotifications = () => {
    setNotificationAnchorEl(null);
    setAllNotificationsOpen(true);
  };

  const handleCloseAllNotifications = () => {
    setAllNotificationsOpen(false);
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

  const unreadNotificationsCount = dummyNotifications.filter(n => !n.read).length;

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
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
        <Toolbar />
        <List>
          {navItems.map((item) => (
            <React.Fragment key={item.name}>
              {item.subItems ? (
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
            {isMobile && (
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
              Car Mechanic Shop
            </Typography>
            <IconButton color="inherit" onClick={handleNotificationClick}>
              <Badge badgeContent={unreadNotificationsCount} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={notificationAnchorEl}
              open={Boolean(notificationAnchorEl)}
              onClose={handleNotificationClose}
              PaperProps={{
                style: {
                  maxHeight: 300,
                  width: '300px',
                },
              }}
            >
              {dummyNotifications.slice(0, 3).map((notification) => (
                <MenuItem key={notification.id} onClick={handleNotificationClose}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {!notification.read && (
                      <FiberManualRecordIcon sx={{ fontSize: 12, color: 'primary.main', mr: 1 }} />
                    )}
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {notification.timestamp.toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
              ))}
              <Divider />
              <MenuItem onClick={handleShowAllNotifications}>
                <Typography variant="body2" color="primary">Show All Notifications</Typography>
              </MenuItem>
            </Menu>
            <IconButton color="inherit" onClick={handleMenuClick}>
              <Avatar />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>Profile</MenuItem>
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

        <Toolbar />
        <Box p={3}>
          <Outlet />
        </Box>

        <Footer />
        <ToastContainer />
      </Box>

      {/* All Notifications Modal */}
      <Dialog
        open={allNotificationsOpen}
        onClose={handleCloseAllNotifications}
        aria-labelledby="all-notifications-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="all-notifications-title">All Notifications</DialogTitle>
        <DialogContent>
          <List>
            {dummyNotifications.map((notification) => (
              <ListItem key={notification.id} alignItems="flex-start">
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {!notification.read && (
                        <FiberManualRecordIcon sx={{ fontSize: 12, color: 'primary.main', mr: 1 }} />
                      )}
                      <Typography variant="body1" sx={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
                        {notification.message}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {notification.timestamp.toLocaleString()}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAllNotifications}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}