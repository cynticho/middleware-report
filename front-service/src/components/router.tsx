"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import PaidIcon from '@mui/icons-material/Paid';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import LocationCityIcon from '@mui/icons-material/LocationCity';

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';




export default function Speed() {
  const router = useRouter();
  
    const handleClick = (route: string) => {
      router.push(route);
    };
  
    const actions = [
    { icon: <LocationCityIcon />, name: 'City', route: '/city' },
    { icon: <Diversity1Icon />, name: 'Role', route: '/role' },
    { icon: <PaidIcon />, name: 'Salary', route: '/salary' },
    { icon: <AssuredWorkloadIcon />, name: 'Agency', route: '/agency' },
    { icon: <DirectionsBusIcon />, name: 'Automobile', route: '/automobile' },
    { icon: <PermIdentityIcon />, name: 'Employee', route: '/employee' }
  ];

  return (
    <>
      <Box sx={{ height: 130, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleClick(action.route)}
          />
        ))}
      </SpeedDial>
    </Box>
    </>
  );
}