import React, {useState} from 'react';
import {Box, Button, Paper, Step, StepContent, StepLabel, Stepper, Typography} from "@mui/material";
import Passenger from "./passenger/Passenger";

const StepperComponent = ({formik, steps}) => {

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        formik.handleReset()
        setActiveStep(0);
    };

    return (
        <Box sx={{backgroundColor: 'white', p:2, borderRadius: '10px'}}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel>
                            {step.type.toUpperCase()} {index + 1}
                        </StepLabel>
                        <StepContent>
                            <Typography>
                                <Passenger
                                    formik={formik}
                                    index={index}
                                />
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}>
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Box sx={{ p: 2 }}>
                    <Typography sx={{fontWeight: 500}}>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1, fontWeight: 700 }}>
                        Reset
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default StepperComponent;
