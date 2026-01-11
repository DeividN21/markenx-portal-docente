import fakeRestDataProvider from "ra-data-fakerest";

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
  ],
  // Estructura completa
  scenarios: [
    {
      id: "scn-1",
      title: "Consumidor Ecológico",
      description: "Escenario donde el mercado valora la sostenibilidad por encima del precio.",
      dimensions: [
        { name: "Precio", consumerExpectation: 0.4, productInitialOffer: 0.5 },
        { name: "Ecología", consumerExpectation: 0.95, productInitialOffer: 0.1 }
      ],
      consumer: {
        name: "Barry Seal",
        age: 30,
        budget: 1300,
        targetAcceptanceScore: 0.8
      },
      actions: [
        {
          name: "Empaque Reciclado",
          description: "Cartón 100% reciclado",
          cost: 150,
          category: "PRODUCTION",
          effects: [
            { dimensionName: "Ecología", delta: 0.15 }
          ]
        }
      ],
      events: []
    }
  ],
  // Tareas (Assignments)
  tasks: [
    {
      id: "tsk-1",
      title: "Misión: Salvar el Planeta",
      summary: "Logra convencer a Barry Seal usando estrategias verdes.",
      deadline: "2026-06-15",
      min_score_to_pass: 0.7,
      max_attempts: 3,
      course_id: "c-1",
      scenario_id: "scn-1",
      status: "NOT_STARTED"
    }
  ]
};

export const dataProvider = fakeRestDataProvider(data, true);