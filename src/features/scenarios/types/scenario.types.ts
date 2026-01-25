/**
 * Scenario types following the exact API structure
 */

/**
 * Dimension entity
 * Represents a market dimension (e.g., Price, Quality)
 */
export interface Dimension {
  name: string;
  defaultValue: number; // 0.0 - 1.0
}

/**
 * Consumer dimension entity
 * Consumer's expectation for a specific dimension
 */
export interface ConsumerDimension {
  name: string;
  defaultValue: number; // 0.0 - 1.0
}

/**
 * Consumer entity
 * Represents the target consumer archetype
 */
export interface Consumer {
  name: string;
  dimensions: ConsumerDimension[];
}

/**
 * Effect entity
 * Represents the impact of an action or event on a dimension
 */
export interface Effect {
  dimensionName: string;
  effectValue: number; // Impact value
  target: 'PLAYER' | 'CONSUMER';
}

/**
 * Action entity
 * Represents a marketing action (4P)
 */
export interface Action {
  name: string;
  description: string;
  cooldownInSeconds: number;
  effects: Effect[];
}

/**
 * Event entity
 * Represents a random market event
 */
export interface Event {
  name: string;
  description: string;
  probability: number; // 0.0 - 1.0
  effects: Effect[];
}

/**
 * Scenario entity
 * Complete game scenario configuration
 */
export interface Scenario {
  id?: string;
  name: string;
  description: string;
  dimensions: Dimension[];
  consumer: Consumer;
  actions: Action[];
  events: Event[];
}

/**
 * Form data for creating/editing scenarios
 */
export interface ScenarioFormData {
  name: string;
  description: string;
  dimensions: Dimension[];
  consumer: Consumer;
  actions: Action[];
  events: Event[];
}
