import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import InputField from '@components/InputField';

export default function FirstName({
  firstName,
  lastName,
  handleChange,
  errors,
  handleStepChange,
  ...stepWizardChildProps
}) {
  const { currentStep, nextStep } = stepWizardChildProps;

  return (
    <>
      <Typography variant="h5" paragraph>
        Let&apos;s get to know you
      </Typography>

      <InputField
        name="First Name"
        id="firstName"
        value={firstName}
        onChange={handleChange}
        error={errors.firstName !== undefined}
        helperText={errors.firstName}
        style={{
          marginBottom: '2rem',
        }}
      />
      <InputField
        name="Last Name"
        id="lastName"
        value={lastName}
        onChange={handleChange}
        error={errors.lastName !== undefined}
        helperText={errors.lastName}
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
