import fakeRestDataProvider from "ra-data-fakerest";

const data = {
  "academic-terms": [
    { id: "at-1", name: "1er Semestre - 2026", start_date: "2026-03-01", end_date: "2026-07-01", status: "UPCOMING" },
    { id: "at-2", name: "2do Semestre - 2025", start_date: "2025-09-01", end_date: "2026-02-01", status: "ACTIVE" },
  ],
  courses: [
    { id: "c-1", name: "Marketing Estratégico A", code: 101, academic_term_id: "at-1", lifecycle_status: "ACTIVE" },
    { id: "c-2", name: "Simulación de Negocios B", code: 102, academic_term_id: "at-2", lifecycle_status: "ACTIVE" },
  ],
  students: [
    { id: "std-1", first_name: "Juan", last_name: "Pérez", email: "juan.perez@udla.edu.ec", course_id: "c-1", status: "ACTIVE" },
    { id: "std-2", first_name: "María", last_name: "López", email: "maria.lopez@udla.edu.ec", course_id: "c-1", status: "ACTIVE" },
    { id: "std-3", first_name: "Carlos", last_name: "Andrade", email: "carlos.a@udla.edu.ec", course_id: "c-2", status: "ACTIVE" },
  ],
  scenarios: [
    {
      id: "scn-1",
      title: "Consumidor Ecológico",
      description: "Escenario donde el mercado valora la sostenibilidad.",
    }
  ],
  tasks: [
    {
      id: "tsk-1",
      title: "Misión: Salvar el Planeta",
      course_id: "c-1",
      scenario_id: "scn-1",
      deadline: "2026-06-15",
      max_attempts: 3,
      min_score_to_pass: 0.7
    }
  ],
  // Resultados de partidas (Estructura basada en GameSessionReport de C#)
  attempts: [
    {
      id: "att-1",
      student_id: "std-1",
      task_id: "tsk-1",
      // Datos del GameSessionReport
      sessionDate: "2026-01-14 10:30:00",
      finalOutcome: "GANASTE",
      finalAcceptance: 0.85,
      remainingBudget: 450,
      totalTurnsUsed: 5,
      profileDiscoveryPercentage: 0.75,
      // Historial Turno a Turno
      history: [
        { turnNumber: 1, acceptanceAtEnd: 0.20, budgetAtEnd: 1100, eventOcurredTitle: "", actionsTakenIds: ["act-pack-recycle"] },
        { turnNumber: 2, acceptanceAtEnd: 0.45, budgetAtEnd: 900, eventOcurredTitle: "EL MUNDO SE VUELVE MÁS VERDE", actionsTakenIds: ["act-bio-mat"] },
        { turnNumber: 3, acceptanceAtEnd: 0.60, budgetAtEnd: 750, eventOcurredTitle: "", actionsTakenIds: ["act-local"] },
        { turnNumber: 4, acceptanceAtEnd: 0.78, budgetAtEnd: 550, eventOcurredTitle: "", actionsTakenIds: ["act-pub-social"] },
        { turnNumber: 5, acceptanceAtEnd: 0.85, budgetAtEnd: 450, eventOcurredTitle: "", actionsTakenIds: ["act-pub-influ"] }
      ]
    },
    {
      id: "att-2",
      student_id: "std-2",
      task_id: "tsk-1",
      sessionDate: "2026-01-15 09:00:00",
      finalOutcome: "PERDISTE",
      finalAcceptance: 0.65,
      remainingBudget: 0, // Se quedó sin dinero
      totalTurnsUsed: 4,
      profileDiscoveryPercentage: 0.40,
      history: [
        { turnNumber: 1, acceptanceAtEnd: 0.10, budgetAtEnd: 800, eventOcurredTitle: "", actionsTakenIds: ["act-expensive"] },
        { turnNumber: 2, acceptanceAtEnd: 0.30, budgetAtEnd: 400, eventOcurredTitle: "", actionsTakenIds: ["act-wrong"] },
        { turnNumber: 3, acceptanceAtEnd: 0.50, budgetAtEnd: 100, eventOcurredTitle: "", actionsTakenIds: ["act-ads"] },
        { turnNumber: 4, acceptanceAtEnd: 0.65, budgetAtEnd: 0, eventOcurredTitle: "", actionsTakenIds: [] }
      ]
    }
  ]
};

export const dataProvider = fakeRestDataProvider(data, true);