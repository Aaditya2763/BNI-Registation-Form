import React from 'react';
import { StepConnector } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  root: {
    height: 22,
  },
  line: {
    borderColor: '#999', // Default color
    borderTopWidth: 2,
    borderRadius: 1,
  },
  active: {
    borderColor: '#000', // Color for the active step
  },
  completed: {
    borderColor: '#4caf50', // Color for completed steps
  },
}));

export default CustomConnector;
