/**
 * Toggle para cambiar el estado del ciclo de vida de un curso
 * Con modal de confirmación
 */

import { useState } from 'react';
import { useRefresh, useNotify } from 'react-admin';
import { Switch, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import type { Course } from '../types/course.types';
import type { LifecycleStatus } from '../../../types/lifecycle.types';
import { changeCourseLifecycleStatus } from '../services/course.service';

interface CourseLifecycleToggleProps {
  record: Course;
}

export const CourseLifecycleToggle = ({ record }: CourseLifecycleToggleProps) => {
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
      await changeCourseLifecycleStatus(record.id, pendingStatus);
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

      <Dialog 
        open={open} 
        onClose={handleCancel} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            px: 1,
            py: 1,
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            fontSize: '1.5rem',
            fontWeight: 600,
            color: 'text.primary',
            pb: 2,
            pt: 3,
          }}
        >
          Confirmación de cambio de estado
        </DialogTitle>
        
        <DialogContent sx={{ pb: 3 }}>
          {/* Bloque 1: Descripción de la acción con entidad destacada */}
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: '1rem',
              lineHeight: 1.6,
              mb: 3,
            }}
          >
            Está a punto de modificar el estado del{' '}
            <Typography 
              component="span" 
              sx={{ 
                fontWeight: 600,
                color: 'primary.main',
              }}
            >
              Curso
            </Typography>
            {' '}(
            <Typography 
              component="span" 
              sx={{ 
                fontWeight: 600,
              }}
            >
              {record.name}
            </Typography>
            ).
          </Typography>

          {/* Bloque 2: Consecuencia de la acción */}
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: '0.938rem',
              color: 'text.secondary',
              lineHeight: 1.5,
              mb: 3,
              py: 1.5,
              px: 2,
              bgcolor: 'action.hover',
              borderRadius: 1,
              borderLeft: 3,
              borderColor: 'primary.main',
            }}
          >
            Este cambio afectará su disponibilidad dentro del sistema.
          </Typography>

          {/* Bloque 3: Pregunta de confirmación */}
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: '1rem',
              fontWeight: 500,
              color: 'text.primary',
            }}
          >
            ¿Desea continuar con la acción?
          </Typography>
        </DialogContent>

        <DialogActions 
          sx={{ 
            px: 3, 
            pb: 3,
            pt: 1,
            gap: 1.5,
          }}
        >
          {/* Botón secundario: Bajo énfasis */}
          <Button 
            onClick={handleCancel} 
            variant="outlined"
            color="inherit"
            sx={{
              minWidth: 120,
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Cancelar
          </Button>
          
          {/* Botón principal: Alto énfasis */}
          <Button 
            onClick={handleConfirm} 
            variant="contained" 
            color="primary"
            sx={{
              minWidth: 200,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: 2,
              '&:hover': {
                boxShadow: 4,
              }
            }}
          >
            Confirmar cambio de estado
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
