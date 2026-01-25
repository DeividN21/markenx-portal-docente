/**
 * Componente para mostrar el estado del ciclo de vida como Chip
 * Usa colores según el estado (ACTIVE = verde, DISABLED = gris)
 */

import { ChipField, useRecordContext } from 'react-admin';
import type { LifecycleStatus } from '../../types/lifecycle.types';
import { LIFECYCLE_STATUS_COLORS } from '../../types/lifecycle.types';

interface StatusChipProps {
  source?: string;
  label?: string;
}

export const StatusChip = ({ source = 'status', label = 'Estado' }: StatusChipProps) => {
  const record = useRecordContext<{ [key: string]: LifecycleStatus }>();

  if (!record) return null;

  const status = record[source] as LifecycleStatus;
  const color = LIFECYCLE_STATUS_COLORS[status] || 'default';

  return <ChipField source={source} label={label} color={color} />;
};
