/**
 * Componente para mostrar errores de API de forma visual
 */

import { Alert, AlertTitle } from '@mui/material';
import type { ApiError } from '../../types/api.types';

interface ErrorDisplayProps {
  error: ApiError | null;
  title?: string;
}

export const ErrorDisplay = ({ error, title = 'Error' }: ErrorDisplayProps) => {
  if (!error) return null;

  return (
    <Alert severity="error" sx={{ mb: 2 }}>
      <AlertTitle>{title}</AlertTitle>
      {error.userMessage || error.message}
      {error.violations && error.violations.length > 0 && (
        <ul style={{ marginTop: '8px', marginBottom: 0 }}>
          {error.violations.map((violation, index) => (
            <li key={index}>
              <strong>{violation.field}:</strong> {violation.message}
            </li>
          ))}
        </ul>
      )}
    </Alert>
  );
};
