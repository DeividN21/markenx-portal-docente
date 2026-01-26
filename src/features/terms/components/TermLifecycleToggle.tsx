/**
 * Toggle para cambiar el estado del ciclo de vida de un período académico
 * Con modal de confirmación
 */

import { useState } from 'react';
import { useRefresh, useNotify } from 'react-admin';
import { Switch, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import type { Term, LifecycleStatus } from '../types/term.types';
import { changeTermLifecycleStatus } from '../services/term.service';

interface TermLifecycleToggleProps {
  record: Term;
}

export const TermLifecycleToggle = ({ record }: TermLifecycleToggleProps) => {
  const [open, setOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<LifecycleStatus | null>(null);
  const refresh = useRefresh();
  const notify = useNotify();

  const handleToggleClick = () => {
    const newStatus: LifecycleStatus = record.lifecycleStatus === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';
    setPendingStatus(newStatus);
    setOpen(true);
  };

  const handleConfirm = async () => {
    if (!pendingStatus) return;

    try {
      await changeTermLifecycleStatus(record.id, pendingStatus);
      notify('Estado actualizado correctamente', { type: 'success' });
      refresh();
    } catch (error) {
      const apiError = error as { body?: { userMessage?: string } };
      notify(
        apiError.body?.userMessage || 'Error al cambiar el estado',
        { type: 'error' }
      );
    }
    setOpen(false);
    setPendingStatus(null);
  };

  const handleCancel = () => {
    setOpen(false);
    setPendingStatus(null);
  };

  return (
    <>
      <Switch
        checked={record.lifecycleStatus === 'ACTIVE'}
        onChange={handleToggleClick}
        color="primary"
      />

      <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
        <DialogTitle>Confirmación de cambio de estado</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Está a punto de modificar el estado de la entidad <strong>Período Académico</strong> (<strong>{record.label}</strong>).
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Este cambio afectará su disponibilidad dentro del sistema.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            ¿Desea continuar con la acción?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="inherit">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} variant="contained" color="primary">
            Confirmar cambio de estado
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
