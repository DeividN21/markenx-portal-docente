import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import polyglotI18nProvider from "ra-i18n-polyglot";
import spanishMessages from "ra-language-spanish";

// 1. Configuración de Idioma Español
const i18nProvider = polyglotI18nProvider(() => spanishMessages, "es");

// 2. Data Provider Temporal (JSONPlaceholder)
const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => (
  <Admin dataProvider={dataProvider} i18nProvider={i18nProvider}>
    {/* Resource es cada "tabla" que se va a administrar. 
        ListGuesser "adivina" las columnas por ahora. */}
    <Resource name="users" list={ListGuesser} />
  </Admin>
);

// Exportación por defecto para que main.tsx lo reconozca
export default App;