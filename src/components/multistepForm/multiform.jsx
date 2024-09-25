import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import { Person as PersonIcon, Settings as SettingsIcon, AccountBalance as AccountBalanceIcon } from "@mui/icons-material";

import './multiform.css';
import CustomConnector from "./customConnector";


const steps = [
  {
    label: 'Step 1',
    description: 'Details about your account.',
    icon: <PersonIcon />
  },
  {
    label: 'Step 2',
    description: 'Details about your account.',
    icon: <SettingsIcon />
  },
  {
    label: 'Step 3',
    description: 'Details about your account.',
    icon: <AccountBalanceIcon />
  },
];

const CustomStepper = ({activeStep,handleBack,handleNext}) => {
  

  

  return (
    <div className="stepper-container">
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<CustomConnector />}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel
              StepIconComponent={() => (
                <div
                  className={`step-icon ${
                    index === activeStep ? 'active' : index < activeStep ? 'completed' : ''
                  }`}
                >
                  {step.icon}
                </div>
              )}
            >
              <div className={`step-label ${index === activeStep ? 'active' : index < activeStep ? 'completed' : ''}`}>
                <Typography variant="h6">{step.label}</Typography>
                <Typography variant="body2">{step.description}</Typography>
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="buttons-container">
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className="button"
        >
          Prev
        </Button>
        <Button
          disabled={activeStep === steps.length - 1}
          onClick={handleNext}
          className="button"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CustomStepper;
