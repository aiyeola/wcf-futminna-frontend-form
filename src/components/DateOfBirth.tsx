import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

export default function DateOfBirth({
  dob,
  handleChange,
  errors,
  handleStepChange,
  ...stepWizardChildProps
}) {
  const { currentStep, nextStep } = stepWizardChildProps;

  return (
    <>
      <FormControl
        error={errors.dob !== undefined}
        style={{
          marginBottom: '2rem',
        }}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            disableFuture
            openTo="year"
            format="dd/MM/yyyy"
            label="Date of birth"
            views={['year', 'month', 'date']}
            value={dob}
            onChange={handleChange}
          />
        </MuiPickersUtilsProvider>
        <FormHelperText>{errors.dob}</FormHelperText>
      </FormControl>

      <Button onClick={() => handleStepChange(currentStep, nextStep)}>
        Next
      </Button>
    </>
  );
}
