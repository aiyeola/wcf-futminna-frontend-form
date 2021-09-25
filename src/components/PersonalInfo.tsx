import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useStateMachine, GlobalState } from 'little-state-machine';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';

import { updatePersonalInfo } from '@helpers/updateAction';
import { personalInfoSchema } from '@helpers/validator';
import { states } from '@helpers/states';

const useStyles = makeStyles({
  legend: {
    '& fieldset legend': {
      width: 78,
    },
  },
});

export default function PersonalInfo({ ...stepWizardChildProps }) {
  const { nextStep } = stepWizardChildProps;
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down(513));
  const { state, actions } = useStateMachine({ updatePersonalInfo });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GlobalState['personalInfo']>({
    defaultValues: state.personalInfo,
    //@ts-ignore
    resolver: yupResolver(personalInfoSchema),
  });

  const onSubmit = (data) => {
    actions.updatePersonalInfo(data);
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
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          item
          style={{
            marginTop: '2rem',
          }}
        >
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                error={errors.firstName !== undefined}
                helperText={errors.firstName?.message}
                fullWidth={matchesSM}
                style={{
                  marginRight: matchesSM ? 0 : '2rem',
                  marginBottom: matchesSM ? '2rem' : 0,
                }}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                error={errors.lastName !== undefined}
                helperText={errors.lastName?.message}
                fullWidth={matchesSM}
                style={{
                  marginBottom: '2rem',
                }}
              />
            )}
          />
        </Grid>

        <Grid item>
          <Controller
            name="gender"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl
                component="fieldset"
                error={errors.gender !== undefined}
                style={{
                  marginBottom: '2rem',
                }}
              >
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  value={value}
                  onChange={onChange}
                >
                  <FormControlLabel
                    value="male"
                    label="Male"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    value="female"
                    label="Female"
                    control={<Radio />}
                  />
                </RadioGroup>
                <FormHelperText>{errors.gender?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item>
          <Controller
            name="origin"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl
                component="fieldset"
                error={errors.origin !== undefined}
                className={classes.legend}
                style={{
                  marginBottom: '2rem',
                }}
              >
                <InputLabel id="origin" htmlFor="origin">
                  State of Origin
                </InputLabel>
                <Select
                  id="origin"
                  value={value}
                  onChange={onChange}
                  label="origin"
                  native
                >
                  <option aria-label="None" value={0} />
                  {React.Children.toArray(
                    states.map((state) => (
                      <option value={state.value}>{state.name}</option>
                    )),
                  )}
                </Select>
                <FormHelperText>{errors.origin?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item>
          <Controller
            name="homeAddress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Home Address"
                error={errors.homeAddress !== undefined}
                helperText={errors.homeAddress?.message}
                fullWidth
                style={{
                  marginBottom: '2rem',
                }}
              />
            )}
          />
        </Grid>

        <Grid item>
          <Controller
            name="schoolAddress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="School Address"
                error={errors.schoolAddress !== undefined}
                helperText={errors.schoolAddress?.message}
                fullWidth
                style={{
                  marginBottom: '2rem',
                }}
              />
            )}
          />
        </Grid>

        <Grid item>
          <FormControl
            error={errors.dob !== undefined}
            style={{
              marginBottom: '2rem',
            }}
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Controller
                name="dob"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    fullWidth
                    disableFuture
                    openTo="year"
                    format="dd/MM/yyyy"
                    label="Date of birth"
                    views={['year', 'month', 'date']}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </MuiPickersUtilsProvider>
            <FormHelperText>{errors.dob?.message}</FormHelperText>
          </FormControl>
        </Grid>

        <Button
          type="submit"
          style={{
            marginBottom: '2rem',
          }}
        >
          Next
        </Button>
      </form>
    </Grid>
  );
}
