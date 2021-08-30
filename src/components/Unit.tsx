import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    height: 200,
    [theme.breakpoints.down(470)]: {
      height: 'auto',
    },
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
  },
  helperText: {
    '& .MuiFormHelperText-root.Mui-error': {
      marginTop: '14.3rem',
      [theme.breakpoints.down(470)]: {
        marginTop: '25rem',
      },
    },
  },
}));

export default function Unit({
  unit,
  handleChange,
  errors,
  handleStepChange,
  ...stepWizardChildProps
}) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down(470));

  const { currentStep, nextStep } = stepWizardChildProps;

  const {
    choir,
    ushering,
    media,
    drama,
    technical,
    sanctuary,
    prayer,
    evangelism,
    academic,
  } = unit;

  return (
    <>
      <Typography
        variant="h5"
        paragraph
        style={{
          marginTop: '-2rem',
        }}
      >
        Phew 💨, we&#39;re almost done
      </Typography>

      <FormControl
        error={errors.unit !== undefined}
        className={classes.helperText}
        style={{
          marginBottom: '2rem',
          minWidth: matchesSM ? 0 : 250,
          width: matchesSM ? 'auto' : 400,
        }}
      >
        <FormLabel
          component="legend"
          style={{
            marginBottom: '0.5rem',
          }}
        >
          Pick unit(s) you belong to
        </FormLabel>
        <FormGroup className={classes.root}>
          <div className={classes.block}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={choir}
                  onChange={handleChange}
                  name="choir"
                />
              }
              label="House of Honour Choir"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={drama}
                  onChange={handleChange}
                  name="drama"
                />
              }
              label="Drama and choreography"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={media}
                  onChange={handleChange}
                  name="media"
                />
              }
              label="Media and publicity"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ushering}
                  onChange={handleChange}
                  name="ushering"
                />
              }
              label="Ushering"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={technical}
                  onChange={handleChange}
                  name="technical"
                />
              }
              label="Technical"
            />
          </div>

          <div className={classes.block}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={sanctuary}
                  onChange={handleChange}
                  name="sanctuary"
                />
              }
              label="Sanctuary and Decoration"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={prayer}
                  onChange={handleChange}
                  name="prayer"
                />
              }
              label="Prayer"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={evangelism}
                  onChange={handleChange}
                  name="evangelism"
                />
              }
              label="Evangelism"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={academic}
                  onChange={handleChange}
                  name="academic"
                />
              }
              label="Education Resource"
            />
          </div>
        </FormGroup>
        <FormHelperText>{errors.unit}</FormHelperText>
      </FormControl>

      <Button
        onClick={() => handleStepChange(currentStep, nextStep)}
        style={{
          marginBottom: '2.5rem',
        }}
      >
        Next
      </Button>
    </>
  );
}
