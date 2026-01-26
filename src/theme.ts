import { defaultTheme } from 'react-admin';
import type { RaThemeOptions } from 'react-admin';

export const markenxTheme: RaThemeOptions = {
    ...defaultTheme,
    palette: {
        ...defaultTheme.palette,
        mode: 'light' as const,
        primary: {
            main: '#2563eb',
            light: '#60a5fa',
            dark: '#1e40af',
        },
        secondary: {
            main: '#475569',
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: { fontWeight: 700 },
        h2: { fontWeight: 600 },
        h3: { fontWeight: 600 },
    },
    components: {
        ...defaultTheme.components,
        // Mejorar inputs
        MuiTextField: {
            defaultProps: {
                variant: 'outlined' as const,
                size: 'small' as const,
            },
        },
        // Botones modernos y redondeados
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '8px 16px',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                elevation1: {
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                },
            },
        },
        // AppBar (barra superior)
        MuiAppBar: {
            styleOverrides: {
                colorSecondary: {
                    color: '#1e293b',
                    backgroundColor: '#ffffff',
                    borderBottom: '1px solid #e2e8f0',
                    boxShadow: 'none',
                },
            },
        },
    },
};