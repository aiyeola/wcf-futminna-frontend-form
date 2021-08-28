import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';

import InputField from '@components/InputField';

export default function ContactNumber({
  contactNumber1,
  handleChange,
  errors,
  handleStepChange,
  ...stepWizardChildProps
}) {
  const { currentStep, nextStep } = stepWizardChildProps;

  return (
    <>
      <Typography variant="h5" paragraph>
        Preferably WhatsApp 🙂
      </Typography>

      <InputField
        name="Contact Number"
        id="contactNumber1"
        type="number"
        value={contactNumber1}
        onChange={handleChange}
        error={errors.contactNumber1 !== undefined}
        helperText={errors.contactNumber1}
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
