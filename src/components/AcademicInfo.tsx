import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { useStateMachine, GlobalState } from 'little-state-machine';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { updateAcademicInfo } from '@helpers/updateAction';
import { academicInfoSchema } from '@helpers/validator';
import { levels } from '@helpers/levels';

const useStyles = makeStyles({
  legend: {
    '& fieldset legend': {
      width: 35,
    },
  },
});

export default function AcademicInfo({ ...stepWizardChildProps }) {
  const classes = useStyles();
  const { nextStep } = stepWizardChildProps;
  const { state, actions } = useStateMachine({ updateAcademicInfo });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GlobalState['academicInfo']>({
    defaultValues: state.academicInfo,
    //@ts-ignore
    resolver: yupResolver(academicInfoSchema),
  });

  const onSubmit = (data) => {
    actions.updateAcademicInfo(data);
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: '92%',
          marginTop: '2rem',
        }}
      >
        <Grid item>
          <Controller
            name="campus"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl
                component="fieldset"
                error={errors.campus !== undefined}
                style={{
                  marginBottom: '2rem',
                }}
              >
                <FormLabel component="legend">Campus</FormLabel>
                <RadioGroup
                  aria-label="campus"
                  value={value}
                  onChange={onChange}
                >
                  <FormControlLabel
                    value="Gidan-Kwano"
                    label="Gidan-Kwano"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    value="Bosso"
                    label="Bosso"
                    control={<Radio />}
                  />
                </RadioGroup>
                <FormHelperText>{errors.campus?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item>
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Department"
                error={errors.department !== undefined}
                helperText={errors.department?.message}
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
            name="level"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl
                component="fieldset"
                error={errors.level !== undefined}
                className={classes.legend}
                style={{
                  marginBottom: '2rem',
                }}
              >
                <InputLabel id="level" htmlFor="level">
                  Level
                </InputLabel>
                <Select
                  id="level"
                  value={value}
                  onChange={onChange}
                  label="level"
                  native
                >
                  <option aria-label="None" value={0} />
                  {React.Children.toArray(
                    levels.map((level) => (
                      <option value={level.value}>{level.name}</option>
                    )),
                  )}
                </Select>
                <FormHelperText>{errors.level?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        <Button type="submit"> Next</Button>
      </form>
    </Grid>
  );
}
