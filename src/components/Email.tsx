import Button from '@material-ui/core/Button';

import InputField from '@components/InputField';

export default function Email({
  email,
  handleChange,
  errors,
  handleStepChange,
  ...stepWizardChildProps
}) {
  const { currentStep, nextStep } = stepWizardChildProps;

  return (
    <>
      <InputField
        name="Email"
        id="email"
        type="email"
        value={email}
        onChange={handleChange}
        error={errors.email !== undefined}
        helperText={errors.email}
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
