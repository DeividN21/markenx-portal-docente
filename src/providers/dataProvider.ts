import fakeRestDataProvider from "ra-data-fakerest";

// Datos de prueba iniciales (Simulando BD)
const data = {
  "academic-terms": [
    {
      id: "at-1",
      name: "1er Semestre - 2026",
      start_date: "2026-03-01",
      end_date: "2026-07-01",
      status: "UPCOMING",
    },
    {
      id: "at-2",
      name: "2do Semestre - 2025",
      start_date: "2025-09-01",
      end_date: "2026-02-01",
      status: "ACTIVE",
    },
  ],
  courses: [
    {
      id: "c-1",
      name: "Marketing Estratégico A",
      code: 101,
      academic_term_id: "at-1",
      lifecycle_status: "ACTIVE",
    },
    {
      id: "c-2",
      name: "Simulación de Negocios B",
      code: 102,
      academic_term_id: "at-2",
      lifecycle_status: "ACTIVE",
    },
  ],
  students: [
    {
      id: "std-1",
      first_name: "Juan",
      last_name: "Pérez",
      email: "juan.perez@udla.edu.ec",
      course_id: "c-1",
      status: "ACTIVE",
    },
    {
      id: "std-2",
      first_name: "María",
      last_name: "López",
      email: "maria.lopez@udla.edu.ec",
      course_id: "c-2",
      status: "PENDING_IDENTITY",
    },
  ],
  tasks: [], // Tareas vacías por ahora
  scenarios: [], // Escenarios vacíos por ahora
};

// Creación del proveedor simulado
// loggingEnabled: true nos mostrará en la consola del navegador cada "consulta" que haga React Admin
export const dataProvider = fakeRestDataProvider(data, true);