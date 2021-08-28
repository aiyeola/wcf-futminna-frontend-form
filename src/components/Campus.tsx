import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  helperText: {
    '& .MuiFormHelperText-root.Mui-error': {
      marginTop: 80,
    },
  },
});

export default function Campus({
  campus,
  handleChange,
  errors,
  handleStepChange,
  ...stepWizardChildProps
}) {
  const classes = useStyles();

  const { currentStep, nextStep } = stepWizardChildProps;

  return (
    <>
      <FormControl
        component="fieldset"
        error={errors.campus !== undefined}
        className={classes.helperText}
        style={{
          marginBottom: '2rem',
          minWidth: 200,
        }}
      >
        <FormLabel component="legend">Campus</FormLabel>
        <RadioGroup
          aria-label="campus"
          name="campus"
          value={campus}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Gidan-Kwano"
            control={<Radio />}
            label="Gidan-Kwano"
          />
          <FormControlLabel value="Bosso" control={<Radio />} label="Bosso" />
        </RadioGroup>
        <FormHelperText>{errors.campus}</FormHelperText>
      </FormControl>
      <Button onClick={() => handleStepChange(currentStep, nextStep)}>
        Next
      </Button>
    </>
  );
}
