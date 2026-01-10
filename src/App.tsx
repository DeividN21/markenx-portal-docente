import { Admin, Resource, ListGuesser } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import spanishMessages from "ra-language-spanish";
import { dataProvider } from "./providers/dataProvider"; // Importamos TU provider

const i18nProvider = polyglotI18nProvider(() => spanishMessages, "es");

const App = () => (
  <Admin dataProvider={dataProvider} i18nProvider={i18nProvider}>
    {/* Definimos las rutas de tu sistema */}
    <Resource name="academic-terms" list={ListGuesser} />
    <Resource name="courses" list={ListGuesser} />
    <Resource name="students" list={ListGuesser} />
  </Admin>
);

export default App;