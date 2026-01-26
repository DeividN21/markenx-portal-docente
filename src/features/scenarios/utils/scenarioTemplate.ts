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
  productionActions: [
    {
      name: "Empaque Reciclado",
      description: "Cambiar a cartón 100% reciclado para el empaque del producto",
      cost: 150,
      isInitiallyLocked: false,
      prerequisiteActionId: null,
      effects: [
        {
          dimensionId: "interes_ecologico",
          delta: 0.15
        }
      ]
    },
    {
      name: "Mejora de Calidad",
      description: "Implementar controles de calidad más estrictos y materiales premium",
      cost: 300,
      isInitiallyLocked: false,
      prerequisiteActionId: null,
      effects: [
        {
          dimensionId: "exigencia_de_calidad",
          delta: 0.25
        }
      ]
    },
    {
      name: "Material Biodegradable",
      description: "Utilizar material biodegradable que se degrada en 30 días",
      cost: 200,
      isInitiallyLocked: true,
      prerequisiteActionId: "Empaque Reciclado",
      effects: [
        {
          dimensionId: "interes_ecologico",
          delta: 0.25
        }
      ]
    }
  ],
  priceActions: [
    {
      name: "Descuento Inicial",
      description: "Ofrecer un descuento del 15% en el precio de lanzamiento",
      cost: 100,
      isInitiallyLocked: false,
      prerequisiteActionId: null,
      effects: [
        {
          dimensionId: "sensibilidad_al_precio",
          delta: 0.20
        }
      ]
    },
    {
      name: "Precio Competitivo",
      description: "Ajustar precio para estar por debajo de la competencia",
      cost: 150,
      isInitiallyLocked: false,
      prerequisiteActionId: null,
      effects: [
        {
          dimensionId: "sensibilidad_al_precio",
          delta: 0.30
        }
      ]
    },
    {
      name: "Plan de Financiamiento",
      description: "Ofrecer pagos en cuotas sin intereses",
      cost: 80,
      isInitiallyLocked: false,
      prerequisiteActionId: null,
      effects: [
        {
          dimensionId: "sensibilidad_al_precio",
          delta: 0.15
        }
      ]
    }
  ],
  placeActions: [
    {
      name: "Venta en Línea",
      description: "Abrir canal de venta directa en línea con entrega a domicilio",
      cost: 250,
      isInitiallyLocked: false,
      prerequisiteActionId: null,
      effects: [
        {
          dimensionId: "sensibilidad_al_precio",
          delta: 0.10
        }
      ]
    },
    {
      name: "Tiendas Especializadas",
      description: "Distribuir en tiendas ecológicas y de productos premium",
      cost: 200,
      isInitiallyLocked: false,
      prerequisiteActionId: null,
      effects: [
        {
          dimensionId: "interes_ecologico",
          delta: 0.10
        },
        {
          dimensionId: "exigencia_de_calidad",
          delta: 0.10
        }
      ]
    },
    {
      name: "Red de Distribuidores",
      description: "Expandir a múltiples distribuidores regionales",
      cost: 400,
      isInitiallyLocked: false,
      prerequisiteActionId: null,
      effects: [
        {
          dimensionId: "sensibilidad_al_precio",
          delta: -0.05
        }
      ]
    }
  ],
  promotionActions: [
    {
      name: "Campaña Verde",
      description: "Lanzar campaña publicitaria destacando el compromiso ecológico",
      cost: 300,
      isInitiallyLocked: false,
      prerequisiteActionId: null,
      effects: [
        {
          dimensionId: "interes_ecologico",
          delta: 0.20
        }
      ]
    },
    {
      name: "Redes Sociales",
      description: "Campaña en redes sociales con influencers ecológicos",
      cost: 200,
      isInitiallyLocked: false,
      prerequisiteActionId: null,
      effects: [
        {
          dimensionId: "interes_ecologico",
          delta: 0.15
        }
      ]
    },
    {
      name: "Certificación Ecológica",
      description: "Obtener y publicitar certificación ambiental internacional",
      cost: 350,
      isInitiallyLocked: true,
      prerequisiteActionId: "Campaña Verde",
      effects: [
        {
          dimensionId: "interes_ecologico",
          delta: 0.30
        },
        {
          dimensionId: "exigencia_de_calidad",
          delta: 0.15
        }
      ]
    }
  ],
  events: [
    {
      title: "El Mundo Se Vuelve Más Verde",
      description: "Impulso global por la sostenibilidad gana fuerza en los medios",
      effects: [
        {
          dimensionId: "interes_ecologico",
          weightMultiplier: 1.5
        }
      ]
    },
    {
      title: "Crisis Económica",
      description: "Recesión económica aumenta la sensibilidad al precio del consumidor",
      effects: [
        {
          dimensionId: "sensibilidad_al_precio",
          weightMultiplier: 1.8
        }
      ]
    }
  ]
};
