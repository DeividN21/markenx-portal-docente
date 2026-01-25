/**
 * Botón genérico para cambiar el estado de una entidad
 * Implementa PATCH /{resource}/{id}/status
 */

import { Button, useRecordContext } from 'react-admin';
import { useChangeStatus } from '../../hooks/useChangeStatus';
import type { LifecycleStatus } from '../../types/lifecycle.types';

interface ChangeStatusButtonProps {
  resource: string;
  label?: string;
}

export const ChangeStatusButton = ({ resource, label }: ChangeStatusButtonProps) => {
  const record = useRecordContext<{ id: string; status: LifecycleStatus }>();
  const { changeStatus } = useChangeStatus(resource);

  if (!record) return null;

  // Determinar el siguiente estado
  const nextStatus: LifecycleStatus =
    record.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';

  const buttonLabel = label || (nextStatus === 'ACTIVE' ? 'Habilitar' : 'Deshabilitar');

  const handleClick = async () => {
    await changeStatus(record.id, nextStatus);
  };

  return (
    <Button
      label={buttonLabel}
      onClick={handleClick}
      variant="outlined"
    />
  );
};
