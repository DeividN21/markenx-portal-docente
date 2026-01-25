/**
 * Botón para cambiar el estado de un período académico
 * Implementa PATCH /academic-terms/{id}/status
 */

import { Button, useRecordContext, useRefresh, useNotify } from 'react-admin';
import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import type { Term, TermStatusCode } from '../types/term.types';
import { getAvailableStatuses } from '../utils/term.utils';
import { changeTermStatus } from '../services/term.service';

export const TermChangeStatusButton = () => {
  const record = useRecordContext<Term>();
  const refresh = useRefresh();
  const notify = useNotify();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  if (!record) return null;

  const availableStatuses = getAvailableStatuses(record.status.code);

  if (availableStatuses.length === 0) return null;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = async (newStatusCode: TermStatusCode) => {
    try {
      await changeTermStatus(record.id, newStatusCode);
      notify('Estado actualizado correctamente', { type: 'success' });
      refresh();
    } catch (error) {
      const apiError = error as { body?: { userMessage?: string } };
      notify(
        apiError.body?.userMessage || 'Error al cambiar el estado',
        { type: 'error' }
      );
    }
    handleClose();
  };

  const getStatusLabel = (code: TermStatusCode): string => {
    switch (code) {
      case 'UPCOMING':
        return 'Próximo';
      case 'ACTIVE':
        return 'En curso';
      case 'ENDED':
        return 'Finalizado';
      default:
        return code;
    }
  };

  return (
    <>
      <Button
        label="Cambiar Estado"
        onClick={handleClick}
        variant="outlined"
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {availableStatuses.map((statusCode) => (
          <MenuItem
            key={statusCode}
            onClick={() => handleStatusChange(statusCode)}
          >
            {getStatusLabel(statusCode)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
