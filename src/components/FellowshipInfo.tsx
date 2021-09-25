import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import { useForm, Controller } from 'react-hook-form';
import { useStateMachine, GlobalState } from 'little-state-machine';

import { updateFellowshipInfo } from '@helpers/updateAction';
import { units1, units2 } from '@helpers/units';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    height: 200,
    [theme.breakpoints.down(470)]: {
      height: 'auto',
    },
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
  },
  helperText: {
    '& .MuiFormHelperText-root.Mui-error': {
      marginTop: '12.3rem',
      [theme.breakpoints.down(470)]: {
        marginTop: '25rem',
      },
    },
  },
}));

export default function FellowshipInfo({ ...stepWizardChildProps }) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down(470));

  const { nextStep } = stepWizardChildProps;

  const [units, setUnit] = useState([]);
  const { state, actions } = useStateMachine({ updateFellowshipInfo });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GlobalState['fellowshipInfo']>({
    defaultValues: state.fellowshipInfo,
  });

  // handling the selection manually here
  const handleSelect = (value: string) => {
    const isPresent = units.indexOf(value);
    if (isPresent !== -1) {
      const remaining = units.filter((item) => item !== value);
      setUnit(remaining);
    } else {
      setUnit((prevItems) => [...prevItems, value]);
    }
  };

  // setting form value manually here
  useEffect(() => {
    setValue('unit', units);
  }, [units]);

  const onSubmit = (data) => {
    console.log('data: ', data);
    actions.updateFellowshipInfo(data);
    if (Object.keys(errors).length === 0) {
      nextStep();
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{
        maxWidth: 450,
        margin: '0 auto',
      }}
    >
      <Grid
        item
        container
        style={{
          marginTop: '2rem',
          width: '92%',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            error={errors.unit !== undefined}
            className={classes.helperText}
          >
            <FormLabel
              component="legend"
              style={{
                marginBottom: '0.5rem',
              }}
            >
              Pick unit(s) you belong to
            </FormLabel>
            <Grid item container direction="column">
              <FormGroup>
                {React.Children.toArray(
                  units1.map((unit) => (
                    <FormControlLabel
                      label={unit.name}
                      control={
                        <Controller
                          name="unit"
                          control={control}
                          render={() => (
                            <Checkbox
                              checked={units.includes(unit.value)}
                              onChange={() => handleSelect(unit.value)}
                            />
                          )}
                        />
                      }
                    />
                  )),
                )}
              </FormGroup>
            </Grid>

            <Grid item container direction="column">
              <FormGroup>
                {React.Children.toArray(
                  units2.map((unit) => (
                    <FormControlLabel
                      label={unit.name}
                      control={
                        <Controller
                          name="unit"
                          control={control}
                          render={() => (
                            <Checkbox
                              checked={units.includes(unit.value)}
                              onChange={() => handleSelect(unit.value)}
                            />
                          )}
                        />
                      }
                    />
                  )),
                )}
              </FormGroup>
            </Grid>

            <FormHelperText>
              {
                //@ts-ignore
                errors.unit?.message
              }
            </FormHelperText>
          </FormControl>

          <Button
            type="submit"
            style={{
              marginTop: '2.5rem',
            }}
          >
            Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}
