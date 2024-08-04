'use client'
import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import PantryTrackerNotifications from '../components/dashboard/PantryTrackerNotifications';
import PantryItems from '../components/dashboard/Inventory';
import ShoppingCartNotification from '../components/dashboard/ShoppingCartNotification';


const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <PantryTrackerNotifications />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <PantryItems />
              </Grid>
              <Grid item xs={12}>
                <ShoppingCartNotification />
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
