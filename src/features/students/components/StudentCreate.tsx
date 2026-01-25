import React from 'react';
import { Create } from 'react-admin';
import { StudentForm } from './StudentForm';

/**
 * Student creation component
 */
export const StudentCreate: React.FC = () => {
  return (
    <Create title="Registrar Estudiante" redirect="list">
      <StudentForm />
    </Create>
  );
};
