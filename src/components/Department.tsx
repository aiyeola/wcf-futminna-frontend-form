import Button from '@material-ui/core/Button';

import InputField from '@components/InputField';

export default function Department({
  department,
  handleChange,
  errors,
  handleStepChange,
  ...stepWizardChildProps
}) {
  const { currentStep, nextStep } = stepWizardChildProps;

  return (
    <>
      <InputField
        name="Department"
        id="department"
        value={department}
        onChange={handleChange}
        error={errors.department !== undefined}
        helperText={errors.department}
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
