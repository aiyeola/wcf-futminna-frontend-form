import React from 'react';
import StepWizard from 'react-step-wizard';
import clsx from 'clsx';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';

import NavStepper from '@components/NavStepper';
import PersonalInfo from '@components/PersonalInfo';
import ContactInfo from '@components/ContactInfo';
import AcademicInfo from '@components/AcademicInfo';
import FellowshipInfo from '@components/FellowshipInfo';

const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    marginBottom: theme.spacing(3),
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    boxShadow: '2px 5px 10px rgb(0 0 0 / 30%)',
  },
  background: {
    backgroundColor: '#f3e5e5',
    overflow: 'auto',
    minHeight: '100vh',
  },
}));

export default function Form() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down(430));

  return (
    <div className={classes.background}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item container direction="column" alignItems="center">
          <Grid
            item
            style={{
              marginTop: '2rem',
            }}
          >
            <img
              src="/images/logo.jpg"
              alt="logo"
              className={clsx(classes.img, classes.margin)}
            />
          </Grid>

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
        </Grid>

        <Grid item justifyContent="center">
          <StepWizard nav={<NavStepper />}>
            <PersonalInfo />

            <ContactInfo />

            <AcademicInfo />

            <FellowshipInfo />
          </StepWizard>
        </Grid>
      </Grid>
    </div>
  );
}
