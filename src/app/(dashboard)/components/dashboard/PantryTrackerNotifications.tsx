import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../shared/DashboardCard';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


const PantryTrackerNotifications = () => {


    return (

        <DashboardCard title="Notifications" >

        </DashboardCard>
    );
};

export default PantryTrackerNotifications;
