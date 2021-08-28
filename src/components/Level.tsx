import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

export default function Level({
  level,
  handleChange,
  errors,
  handleStepChange,
  ...stepWizardChildProps
}) {
  const { currentStep, nextStep } = stepWizardChildProps;

  return (
    <>
      <FormControl
        error={errors.level !== undefined}
        style={{
          marginBottom: '2rem',
          minWidth: 200,
        }}
      >
        <InputLabel id="level" htmlFor="level">
          Level
        </InputLabel>
        <Select
          id="level"
          value={level}
          onChange={handleChange}
          label="Level"
          native
        >
          <option aria-label="None" value={0} />
          <option value={100}>100</option>
          <option value={200}>200</option>
          <option value={300}>300</option>
          <option value={400}>400</option>
          <option value={500}>500</option>
        </Select>
        <FormHelperText>{errors.level}</FormHelperText>
      </FormControl>

      <Button onClick={() => handleStepChange(currentStep, nextStep)}>
        Next
      </Button>
    </>
  );
}
