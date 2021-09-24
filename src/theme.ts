import '@fontsource/poppins';
import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';
import '@fontsource/crimson-pro';
import '@fontsource/crimson-pro/500.css';
import '@fontsource/crimson-pro/600.css';
import grey from '@material-ui/core/colors/grey';

import {
  createTheme,
  responsiveFontSizes,
  Theme,
} from '@material-ui/core/styles';

let theme: Theme = createTheme({
  palette: {
    primary: {
      main: grey[800],
    },
  },
  typography: {
    fontFamily: 'Crimson Pro',
    h3: {
      fontFamily: 'Poppins',
    },
  },
  props: {
    MuiButton: {
      variant: 'contained',
      disableElevation: true,
      fullWidth: true,
    },
    MuiTextField: {
      variant: 'outlined',
      type: 'text',
      size: 'small',
    },
    MuiFormControl: {
      size: 'small',
      variant: 'outlined',
      fullWidth: true,
    },
    MuiCircularProgress: {
      size: 24,
    },
    MuiOutlinedInput: {
      fullWidth: true,
    },
    MuiSnackbar: {
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        fontSize: 18,
        textTransform: 'none',
        color: '#fff',
        backgroundColor: '#f12424',
      },
    },

    MuiFormHelperText: {
      root: {
        '&.Mui-error': {
          position: 'absolute',
          marginTop: 40,
        },
      },

      marginDense: {
        marginTop: 0,
      },
    },
    MuiFormLabel: {
      root: {
        fontWeight: 600,
      },
    },
    MuiFormGroup: {
      root: {
        flexDirection: 'row',
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: 'inherit',
      },
    },
    MuiStepLabel: {
      label: {
        '&.MuiStepLabel-alternativeLabel': {
          marginTop: 12,
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
