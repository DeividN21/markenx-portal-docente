/**
 * Template data for scenario creation
 * Based on the Ecological Consumer example from VIDEOGAME_CONFIG.md
 */
export const scenarioTemplate = {
  title: "Escenario de Lanzamiento de Producto",
  description: "Simulación de estrategia de marketing para el lanzamiento de un nuevo producto tecnológico",
  consumer: {
    name: "Consumidor Ecológico",
    age: 30,
    budget: 1300,
    targetAcceptanceScore: 0.80
  },
  dimensions: [
    {
      name: "sensibilidad_al_precio",
      displayName: "Sensibilidad al precio",
      description: "Cuánto le importa al consumidor ahorrar dinero vs. pagar más por otras cualidades",
      consumerExpectation: 0.40,
      productInitialOffer: 0.50
    },
    {
      name: "interes_ecologico",
      displayName: "Interés ecológico",
      description: "Preocupación por la sostenibilidad y el impacto ambiental",
      consumerExpectation: 0.95,
      productInitialOffer: 0.10
    },
    {
      name: "exigencia_de_calidad",
      displayName: "Exigencia de calidad",
      description: "Nivel de calidad y durabilidad esperado",
      consumerExpectation: 0.80,
      productInitialOffer: 0.40
    }
  ],
  actions: [
    {
      id: "f1a2b3c4-d5e6-7890-abcd-ef1234567890",
      name: "Empaque Reciclado",
      description: "Cambiar a cartón 100% reciclado para el empaque del producto",
      cost: 150,
      category: "PRODUCTION",
      isInitiallyLocked: false,
      prerequisiteActionId: null,
      effects: [
        {
          dimensionId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
          delta: 0.15
        }
      ]
    },
    {
      id: "g2h3i4j5-k6l7-8901-mnop-123456789012",
      name: "Material Biodegradable",
      description: "Utilizar material biodegradable que se degrada en 30 días",
      cost: 200,
      category: "PRODUCTION",
      isInitiallyLocked: true,
      prerequisiteActionId: "f1a2b3c4-d5e6-7890-abcd-ef1234567890",
      effects: [
        {
          dimensionId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
          delta: 0.25
        }
      ]
    },
    {
      id: "a3b4c5d6-e7f8-9012-abcd-234567890123",
      name: "Campaña Verde",
      description: "Lanzar campaña publicitaria destacando el compromiso ecológico",
      cost: 300,
      category: "PROMOTION",
      isInitiallyLocked: false,
      prerequisiteActionId: null,
      effects: [
        {
          dimensionId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
          delta: 0.20
        }
      ]
    }
  ],
  events: [
    {
      id: "h3i4j5k6-l7m8-9012-nopq-345678901234",
      title: "El Mundo Se Vuelve Más Verde",
      description: "Impulso global por la sostenibilidad gana fuerza en los medios",
      effects: [
        {
          dimensionId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
          weightMultiplier: 1.5
        }
      ]
    },
    {
      id: "i4j5k6l7-m8n9-0123-pqrs-456789012345",
      title: "Crisis Económica",
      description: "Recesión económica aumenta la sensibilidad al precio del consumidor",
      effects: [
        {
          dimensionId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          weightMultiplier: 1.8
        }
      ]
    }
  ]
};
