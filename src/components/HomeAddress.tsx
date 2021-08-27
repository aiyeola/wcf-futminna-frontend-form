import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import InputField from '@components/InputField';

export default function HomeAddress({
  homeAddress,
  handleChange,
  errors,
  handleStepChange,
  ...stepWizardChildProps
}) {
  const { currentStep, nextStep } = stepWizardChildProps;

  return (
    <>
      <Typography variant="h5" paragraph>
        Your residential address
      </Typography>

      <InputField
        name="Home Address"
        id="homeAddress"
        value={homeAddress}
        onChange={handleChange}
        error={errors.homeAddress !== undefined}
        helperText={errors.homeAddress}
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
