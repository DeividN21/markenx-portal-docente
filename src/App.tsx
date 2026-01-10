import { Admin, Resource, ListGuesser } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import spanishMessages from "ra-language-spanish";
import { dataProvider } from "./providers/dataProvider";

// Importar componentes visuales
import { AcademicTermList, AcademicTermCreate, AcademicTermEdit } from "./resources/academic-terms/AcademicTerms";

const i18nProvider = polyglotI18nProvider(() => spanishMessages, "es");

const App = () => (
  <Admin dataProvider={dataProvider} i18nProvider={i18nProvider}>
    
    {/* Se conectan los componentes reales aquí: */}
    <Resource 
      name="academic-terms" 
      list={AcademicTermList} 
      create={AcademicTermCreate} 
      edit={AcademicTermEdit}
      options={{ label: 'Períodos' }}
    />

    {/* Estos siguen en modo "adivinanza" por ahora */}
    <Resource name="courses" list={ListGuesser} options={{ label: 'Cursos' }} />
    <Resource name="students" list={ListGuesser} options={{ label: 'Estudiantes' }} />
    
  </Admin>
);

export default App;