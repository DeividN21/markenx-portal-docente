import React from 'react';
import { 
  TabbedForm, 
  FormTab,
  TextInput,
  NumberInput,
  ArrayInput,
  SimpleFormIterator,
  SelectInput,
  required,
  minValue,
  maxValue
} from 'react-admin';

const validateRequired = [required()];
const validateProbability = [required(), minValue(0), maxValue(1)];

/**
 * Scenario form component
 * Used by both ScenarioCreate and ScenarioEdit
 * Follows exact API structure with tabs for organization
 */
export const ScenarioForm: React.FC = () => {
  return (
    <TabbedForm>
      {/* TAB 1: GENERAL INFO */}
      <FormTab label="General">
        <TextInput 
          source="name" 
          label="Nombre del Escenario" 
          fullWidth 
          validate={validateRequired} 
        />
        <TextInput 
          source="description" 
          label="Descripción" 
          multiline 
          fullWidth 
          rows={3} 
        />
      </FormTab>

      {/* TAB 2: DIMENSIONS */}
      <FormTab label="Dimensiones">
        <ArrayInput source="dimensions" label="Dimensiones del Mercado">
          <SimpleFormIterator inline>
            <TextInput 
              source="name" 
              label="Nombre (ej: Precio, Calidad)" 
              validate={validateRequired} 
            />
            <NumberInput 
              source="defaultValue" 
              label="Valor Inicial (0.0 - 1.0)" 
              step={0.05} 
              validate={validateProbability} 
            />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>

      {/* TAB 3: CONSUMER */}
      <FormTab label="Consumidor">
        <TextInput 
          source="consumer.name" 
          label="Nombre del Arquetipo" 
          fullWidth 
          validate={validateRequired} 
        />
        <ArrayInput source="consumer.dimensions" label="Expectativas del Consumidor">
          <SimpleFormIterator inline>
            <TextInput 
              source="name" 
              label="Nombre Dimensión" 
              helperText="Debe coincidir con una dimensión creada"
              validate={validateRequired} 
            />
            <NumberInput 
              source="defaultValue" 
              label="Expectativa (0.0 - 1.0)" 
              step={0.05} 
              validate={validateProbability} 
            />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>

      {/* TAB 4: ACTIONS */}
      <FormTab label="Acciones">
        <ArrayInput source="actions" label="Acciones Disponibles">
          <SimpleFormIterator>
            <TextInput 
              source="name" 
              label="Nombre de la Acción" 
              fullWidth
              validate={validateRequired} 
            />
            <TextInput 
              source="description" 
              label="Descripción" 
              fullWidth
              multiline 
              rows={2}
            />
            <NumberInput 
              source="cooldownInSeconds" 
              label="Tiempo de Espera (segundos)" 
              validate={[required(), minValue(0)]} 
            />
            
            {/* Effects inside Actions */}
            <ArrayInput source="effects" label="Efectos">
              <SimpleFormIterator inline>
                <TextInput 
                  source="dimensionName" 
                  label="Dimensión" 
                  helperText="Debe coincidir con una dimensión creada"
                />
                <NumberInput 
                  source="effectValue" 
                  label="Valor del Efecto" 
                  step={0.05} 
                />
                <SelectInput 
                  source="target" 
                  label="Objetivo" 
                  choices={[
                    { id: 'PLAYER', name: 'Jugador' },
                    { id: 'CONSUMER', name: 'Consumidor' },
                  ]} 
                  validate={validateRequired}
                />
              </SimpleFormIterator>
            </ArrayInput>
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>

      {/* TAB 5: EVENTS */}
      <FormTab label="Eventos">
        <ArrayInput source="events" label="Eventos Aleatorios">
          <SimpleFormIterator>
            <TextInput 
              source="name" 
              label="Nombre del Evento" 
              fullWidth
              validate={validateRequired} 
            />
            <TextInput 
              source="description" 
              label="Descripción" 
              fullWidth
              multiline 
              rows={2}
            />
            <NumberInput 
              source="probability" 
              label="Probabilidad (0.0 - 1.0)" 
              step={0.05} 
              validate={validateProbability} 
              helperText="0.1 = 10% de probabilidad"
            />
            
            {/* Effects inside Events */}
            <ArrayInput source="effects" label="Efectos">
              <SimpleFormIterator inline>
                <TextInput 
                  source="dimensionName" 
                  label="Dimensión" 
                  helperText="Debe coincidir con una dimensión creada"
                />
                <NumberInput 
                  source="effectValue" 
                  label="Valor del Efecto" 
                  step={0.05} 
                />
                <SelectInput 
                  source="target" 
                  label="Objetivo" 
                  choices={[
                    { id: 'PLAYER', name: 'Jugador' },
                    { id: 'CONSUMER', name: 'Consumidor' },
                  ]} 
                  validate={validateRequired}
                />
              </SimpleFormIterator>
            </ArrayInput>
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  );
};
