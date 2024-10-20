import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Grid, Avatar, List, ListItem, ListItemText, Divider } from '@mui/material';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext.js';

const dummyShopActivity = [
  { id: 1, action: "Completed oil change", date: "2023-06-01" },
  { id: 2, action: "Performed brake inspection", date: "2023-06-02" },
  { id: 3, action: "Replaced air filter", date: "2023-06-03" },
  { id: 4, action: "Rotated tires", date: "2023-06-04" },
  { id: 5, action: "Diagnosed check engine light", date: "2023-06-05" },
];

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { currentUser } = useAuth(); // This should now work correctly

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  if (!userProfile) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Avatar
              src={userProfile.photoURL}
              sx={{ width: 150, height: 150, margin: 'auto' }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4">{userProfile.name}</Typography>
            <Typography variant="subtitle1">{userProfile.role}</Typography>
            <Typography variant="body1">Email: {userProfile.email}</Typography>
            <Typography variant="body1">Phone: {userProfile.phone}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>Recent Shop Activity</Typography>
        <List>
          {dummyShopActivity.map((activity) => (
            <ListItem key={activity.id}>
              <ListItemText
                primary={activity.action}
                secondary={new Date(activity.date).toLocaleDateString()}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Profile;