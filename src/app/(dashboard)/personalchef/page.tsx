'use client';
import React from 'react';
import { Paper, Box, Grid } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const Shadow = () => {
  return (
    <PageContainer title="Person AI Chef" description="this is your personal chef">

      <DashboardCard title="Person AI Chef">

      </DashboardCard>
    </PageContainer>
  );
};

export default Shadow;
