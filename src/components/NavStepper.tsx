import React from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import { StepIconProps } from '@material-ui/core/StepIcon';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#f12424',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#f12424',
    },
  },
  line: {
    borderColor: '#424242',
    borderTopWidth: 3,
    borderRadius: 10,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#424242',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#f12424',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#f12424',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props: StepIconProps) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

const getSteps = () => [
  'Personal Information',
  'Contact Details',
  'Academic Information',
  'Fellowship Information',
];

export default function NavStepper(props) {
  const { currentStep } = props;
  const steps = getSteps();

  return (
    <Stepper
      alternativeLabel
      activeStep={currentStep - 1}
      connector={<QontoConnector />}
    >
      {React.Children.toArray(
        steps.map((label) => (
          <Step>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        )),
      )}
    </Stepper>
  );
}
