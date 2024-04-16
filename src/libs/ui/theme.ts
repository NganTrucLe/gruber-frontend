'use client';
import { Be_Vietnam_Pro } from 'next/font/google';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import colors from './colors';

const beVietnamPro = Be_Vietnam_Pro({
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['vietnamese'],
});

let theme = createTheme({
  palette: {
    background: {
      default: colors.neutral[50],
    },
    primary: {
      main: colors.blue[500],
      light: colors.blue[200],
      dark: colors.blue[700],
      darker: colors.blue[900],
    },
    secondary: {
      main: colors.blue[500],
      light: colors.blue[200],
      dark: colors.blue[700],
    },
    info: {
      main: colors.neutral[50],
      light: colors.neutral[50],
      dark: colors.neutral[100],
      contrastText: colors.blue[900],
    },
    success: {
      main: colors.notification.success,
      contrastText: colors.neutral.white,
    },
    warning: {
      main: colors.notification.warning,
    },
    error: {
      main: colors.notification.error,
    },
  },
  typography: {
    fontFamily: beVietnamPro.style.fontFamily + ',Be Vietnam Pro, sans-serif',
    linkPrimary: {
      color: colors.blue[500],
      textDecoration: 'underline',
      fontWeight: 600,
      fontSize: '14px',
      '&:hover': {
        color: colors.blue[700],
      },
    },
    linkAccent: {
      color: colors.blue[900],
      textDecoration: 'underline',
      fontWeight: 600,
      fontSize: '14px',
      '&:hover': {
        color: colors.blue[700],
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          color: 'inherit',
          textDecoration: 'none',
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variant: 'body2',
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      variants: [
        {
          props: { size: 'large' },
          style: {
            height: '2.75rem',
            padding: '0.5rem 1.25rem',
          },
        },
        {
          props: { variant: 'text', color: 'primary' },
          style: {
            '&:hover': {
              backgroundColor: colors.blue[50],
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            '&:hover': {
              backgroundColor: colors.blue[50],
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          boxShadow: 'none',
          textTransform: 'none',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          fontSize: '14px',
          borderRadius: '0.5rem',
          '&.Mui-disabled': {},
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      variants: [
        {
          props: { variant: 'section' },
          style: {
            borderRadius: '0.75rem',
            padding: '1.5rem',
          },
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '.5rem !important',
          fontSize: '14px',
          height: '40px',
          '& .MuiOutlinedInput-input': {
            padding: '.5rem .5rem',
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: colors.neutral[100],
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '& .MuiFormLabel-asterisk': {
            color: 'red',
          },
        },
      },
    },
    MuiAlert: {
      variants: [
        {
          props: { severity: 'success' },
          style: {
            color: colors.notification.success,
          },
        },
        {
          props: { severity: 'warning' },
          style: {
            color: colors.notification.warning,
          },
        },
        {
          props: { severity: 'error' },
          style: {
            color: colors.notification.error,
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        },
      ],
      styleOverrides: {
        root: {
          padding: '.5rem 1rem',
          border: '1px solid',
          borderRadius: '.5rem',
          '& .MuiAlert-message': {
            padding: 0,
          },
          '& .MuiAlert-action': {
            padding: 0,
            margin: 0,
            height: '19px',
            width: '19px',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          width: 'max-content',
        },
      },
    },
    MuiChip: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            background: colors.blue[50],
          },
        },
        {
          props: { color: 'default' },
          style: {
            color: colors.blue[500],
            background: colors.neutral[25],
          },
        },
      ],
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          '& .MuiDialog-paper': {
            padding: '0',
          },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '1rem',
        },
        spacing: {
          '& > :not(:first-of-type)': {
            marginLeft: '1rem',
          },
        },
      },
    },
  },
} as any);

theme = responsiveFontSizes(theme);

declare module '@mui/material/styles' {
  interface TypographyVariants {
    linkPrimary: React.CSSProperties;
    linkAccent: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    linkPrimary?: React.CSSProperties;
    linkAccent?: React.CSSProperties;
  }

  interface PaperVariants {
    section: React.CSSProperties;
  }

  interface PaperVariantsOptions {
    section?: React.CSSProperties;
  }
}

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    section: true;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    linkPrimary: true;
    linkAccent: true;
  }
}

export default theme;
