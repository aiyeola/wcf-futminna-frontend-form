import React, { useState } from 'react';
import StepWizard, {
  StepWizardChildProps,
  StepWizardProps,
} from 'react-step-wizard';
import clsx from 'clsx';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Name from '@components/Name';
import Department from '@components/Department';
import validator from '@helpers/validator';
import Email from '@components/Email';
import SchoolAddress from '@components/SchoolAddress';
import HomeAddress from '@components/HomeAddress';
import Level from '@components/Level';
import ContactNumber from '@components/ContactNumber';
import AlternateNumber from '@components/AlternateNumber';
import Gender from '@components/Gender';
import Campus from '@components/Campus';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '40vh',
    // position: 'absolute',
    [theme.breakpoints.down(600)]: {
      padding: '0 2rem',
    },
    [theme.breakpoints.down(376)]: {
      marginTop: '2rem',
    },
  },
  screen: {
    height: '50vh',
    justifyContent: 'start',
    [theme.breakpoints.down(376)]: {
      marginTop: 0,
    },
  },
  textField: {
    // width: '15rem',
  },
  margin: {
    marginBottom: theme.spacing(3),
  },
  button: {
    background: '#ffcc66',
    color: '#fff',
    fontWeight: 600,
  },
  img: {
    width: 100,
    height: 100,
    marginTop: -40,
    borderRadius: 50,
    boxShadow: '2px 5px 10px rgb(0 0 0 / 30%)',
  },
  background: {
    background: '#f3e5e5',
    position: 'relative',
    overflow: 'auto',
    minHeight: '100vh',
    maxHeight: '100%',
  },
  stepWizard: {
    // background: 'red',
    // width: '100%'
  },
}));

type stepChange = {
  previousStep: number;
  activeStep: number;
};

type ControlButtonsProps = {
  StepWiz: Partial<StepWizardChildProps>;
};

type State = {
  SW?: Partial<StepWizardChildProps>;
  demo: boolean;
};

type FormState = {
  firstName: string;
  lastName: string;
  gender: string;
  department: string;
  level: string;
  campus: string;
  email: string;
  schoolAddress: string;
  homeAddress: string;
  contactNumber1: number | undefined;
  contactNumber2?: number;
  unit: string;
  origin: string;
  dob: string;
};

const ControlButtons = ({ StepWiz }: ControlButtonsProps) => (
  <>
    {/* <Button onClick={StepWiz.previousStep}>Prev Step</Button> */}
    <Button
      style={{
        width: 'auto',
      }}
      onClick={StepWiz.nextStep}
    >
      Next Step
    </Button>
  </>
);
export default function Form() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down(430));

  const [state, updateState] = useState<State>({
    demo: true,
  });

  const [details, setDetails] = useState<FormState>({
    firstName: '',
    lastName: '',
    gender: '',
    department: '',
    level: '',
    campus: '',
    email: '',
    schoolAddress: '',
    homeAddress: '',
    contactNumber1: undefined,
    contactNumber2: undefined,
    unit: '',
    origin: '',
    dob: '',
  });
  const {
    firstName,
    lastName,
    gender,
    department,
    level,
    campus,
    email,
    schoolAddress,
    homeAddress,
    contactNumber1,
    contactNumber2,
    unit,
    origin,
    dob,
  } = details;

  const [errors, setErrors] = useState({
    firstName: undefined,
    lastName: undefined,
    gender: undefined,
    department: undefined,
    level: undefined,
    campus: undefined,
    email: undefined,
    schoolAddress: undefined,
    homeAddress: undefined,
    contactNumber1: undefined,
    contactNumber2: undefined,
    unit: undefined,
    origin: undefined,
    dob: undefined,
  });

  const { SW, demo } = state;

  const onStepChange = (stepChange: stepChange) => console.log(stepChange);

  const setInstance = (SW: StepWizardProps) =>
    updateState({
      ...state,
      SW,
    });

  const validate = async (id: string, value: string) => {
    const { error } = await validator(id, value);
    return error;
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e,
  ) => {
    const { id, value, name } = e.target;
    setDetails({ ...details, [id || name]: value });
    setErrors({ ...errors, [id || name]: await validate(id || name, value) });
  };

  const handleStepChange = (currentStep: number, nextStep: () => void) => {
    switch (currentStep) {
      case 1:
        if (firstName.length === 0) {
          setErrors({ ...errors, firstName: 'This field is required' });
        } else if (lastName.length === 0) {
          setErrors({ ...errors, lastName: 'This field is required' });
        } else {
          nextStep();
        }
        break;
      case 2:
        if (gender.length === 0) {
          setErrors({ ...errors, gender: 'This field is required' });
        } else {
          nextStep();
        }
        break;
      case 3:
        department.length === 0
          ? setErrors({ ...errors, department: 'You no get department? 😏' })
          : nextStep();
        break;
      case 4:
        level.length === 1 || level === ''
          ? setErrors({ ...errors, level: '😏 ehn ehn!' })
          : nextStep();
        break;
      case 5:
        campus.length === 0
          ? setErrors({ ...errors, campus: 'so you no get Campus 🙁' })
          : nextStep();
        break;
      case 6:
        email.length === 0
          ? setErrors({ ...errors, email: 'Shey you dey whine us??' })
          : nextStep();
        break;
      case 7:
        schoolAddress.length === 0
          ? setErrors({
              ...errors,
              schoolAddress: "C'mon we can give you a surprise visit",
            })
          : nextStep();
        break;
      case 8:
        homeAddress.length === 0
          ? setErrors({
              ...errors,
              homeAddress: "C'mon we can give you a surprise visit",
            })
          : nextStep();
        break;
      case 9:
        if (contactNumber1 === undefined) {
          setErrors({ ...errors, contactNumber1: '😏 ehn ehn!' });
        } else if (errors.contactNumber1) {
          setErrors({ ...errors, contactNumber1: '😏 ehn ehn!' });
        } else {
          nextStep();
        }
        break;
      case 10:
        if (errors.contactNumber2) {
          setErrors({ ...errors, contactNumber2: '😏 ehn ehn!' });
        } else if (contactNumber1 === contactNumber2) {
          setErrors({
            ...errors,
            contactNumber2: "that's the same as before nah",
          });
        } else {
          nextStep();
        }
        break;
    }
  };

  return (
    <div className={clsx(classes.root, classes.background)}>
      <div className={classes.center}>
        <img
          src="/images/logo.jpg"
          alt="logo"
          className={clsx(classes.img, classes.margin)}
        />
        <Typography
          variant="h4"
          paragraph
          align="center"
          style={{
            fontWeight: 700,
            letterSpacing: 2,
            lineHeight: 1.5,
          }}
        >
          WCF FUTMinna {matchesSM ? <br /> : null}BioData Form
        </Typography>
      </div>

      <div className={clsx(classes.center, classes.screen)}>
        <StepWizard
          instance={setInstance}
          onStepChange={onStepChange}
          className={classes.stepWizard}
        >
          <Name
            firstName={firstName}
            lastName={lastName}
            handleChange={handleChange}
            handleStepChange={handleStepChange}
            errors={errors}
          />
          <Gender
            gender={gender}
            handleChange={handleChange}
            handleStepChange={handleStepChange}
            errors={errors}
          />
          <Department
            department={department}
            handleChange={handleChange}
            handleStepChange={handleStepChange}
            errors={errors}
          />
          <Level
            level={level}
            handleChange={handleChange}
            handleStepChange={handleStepChange}
            errors={errors}
          />
          <Campus
            campus={campus}
            handleChange={handleChange}
            handleStepChange={handleStepChange}
            errors={errors}
          />
          <Email
            email={email}
            handleChange={handleChange}
            handleStepChange={handleStepChange}
            errors={errors}
          />
          <SchoolAddress
            schoolAddress={schoolAddress}
            handleChange={handleChange}
            handleStepChange={handleStepChange}
            errors={errors}
          />
          <HomeAddress
            homeAddress={homeAddress}
            handleChange={handleChange}
            handleStepChange={handleStepChange}
            errors={errors}
          />

          <ContactNumber
            contactNumber1={contactNumber1}
            handleChange={handleChange}
            handleStepChange={handleStepChange}
            errors={errors}
          />
          <AlternateNumber
            contactNumber2={contactNumber2}
            handleChange={handleChange}
            handleStepChange={handleStepChange}
            errors={errors}
          />
        </StepWizard>
      </div>

      {/* {demo && SW && <ControlButtons StepWiz={SW} />} */}
    </div>
  );
}
