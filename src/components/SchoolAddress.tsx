import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import InputField from '@components/InputField';

export default function SchoolAddress({
  schoolAddress,
  handleChange,
  errors,
  handleStepChange,
  ...stepWizardChildProps
}) {
  const { currentStep, nextStep } = stepWizardChildProps;

  return (
    <>
      <Typography variant="h5" paragraph>
        Where you stay in school?
      </Typography>

      <InputField
        name="School Address"
        id="schoolAddress"
        value={schoolAddress}
        onChange={handleChange}
        error={errors.schoolAddress !== undefined}
        helperText={errors.schoolAddress}
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
