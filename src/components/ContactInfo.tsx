import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useStateMachine, GlobalState } from 'little-state-machine';

import { updateContactInfo } from '@helpers/updateAction';
import { contactInfoSchema } from '@helpers/validator';

export default function ContactInfo({ ...stepWizardChildProps }) {
  const { nextStep } = stepWizardChildProps;

  const { state, actions } = useStateMachine({ updateContactInfo });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GlobalState['contactInfo']>({
    defaultValues: state.contactInfo,
    //@ts-ignore
    resolver: yupResolver(contactInfoSchema),
  });

  const onSubmit = (data) => {
    actions.updateContactInfo(data);
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
        <Grid
          item
          style={{
            marginTop: '2rem',
          }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="E-mail Address"
                error={errors.email !== undefined}
                helperText={errors.email?.message}
                fullWidth
                type="email"
                style={{
                  marginBottom: '2rem',
                  maxWidth: 500,
                }}
              />
            )}
          />
        </Grid>

        <Grid item>
          <Controller
            name="contactNumber1"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Contact Number"
                error={errors.contactNumber1 !== undefined}
                helperText={errors.contactNumber1?.message}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+234</InputAdornment>
                  ),
                }}
                style={{
                  marginBottom: '2rem',
                }}
              />
            )}
          />
        </Grid>

        <Grid item>
          <Controller
            name="contactNumber2"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Alternate Number"
                error={errors.contactNumber2 !== undefined}
                helperText={errors.contactNumber2?.message}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+234</InputAdornment>
                  ),
                }}
                style={{
                  marginBottom: '2rem',
                }}
              />
            )}
          />
        </Grid>

        <Button type="submit">Next</Button>
      </form>
    </Grid>
  );
}
