/**
 * Componente para mostrar scores como porcentaje
 * Convierte valores 0.0-1.0 a formato de porcentaje (0%-100%)
 */

import { FunctionField, type FunctionFieldProps } from 'react-admin';
import { formatScore } from '../../utils/formatters';

interface PercentageFieldProps extends Omit<FunctionFieldProps, 'render'> {
  source: string;
  label?: string;
}

export const PercentageField = ({ source, label, ...rest }: PercentageFieldProps) => (
  <FunctionField
    source={source}
    label={label}
    render={(record: Record<string, number | null | undefined>) => 
      formatScore(record[source])
    }
    {...rest}
  />
);
