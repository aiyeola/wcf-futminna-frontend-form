import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';

import InputField from '@components/InputField';

export default function AlternateNumber({
  contactNumber2,
  handleChange,
  errors,
  handleStepChange,
  ...stepWizardChildProps
}) {
  const { currentStep, nextStep } = stepWizardChildProps;

  return (
    <>
      <Typography variant="h5" paragraph>
        Most likely you have another one
      </Typography>

      <InputField
        name="Alternate Number"
        id="contactNumber2"
        type="number"
        value={contactNumber2}
        onChange={handleChange}
        error={errors.contactNumber2 !== undefined}
        helperText={errors.contactNumber2}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">+234</InputAdornment>
          ),
        }}
        style={{
          marginBottom: '2rem',
        }}
      />

      <Button onClick={() => handleStepChange(currentStep, nextStep)}>
        Next
      </Button>
    </>
  );
}
