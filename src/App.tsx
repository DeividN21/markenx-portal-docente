import { Admin, Resource, ListGuesser } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import spanishMessages from "ra-language-spanish";
import { dataProvider } from "./providers/dataProvider";

// Componentes de Periodos
import { AcademicTermList, AcademicTermCreate, AcademicTermEdit } from "./resources/academic-terms/AcademicTerms";

// Componentes de Cursos
import { CourseList, CourseCreate, CourseEdit } from "./resources/courses/Courses";

// Componentes de Estudiantes
import { StudentList, StudentCreate, StudentEdit } from "./resources/students/Students";

const i18nProvider = polyglotI18nProvider(() => spanishMessages, "es");

const App = () => (
  <Admin dataProvider={dataProvider} i18nProvider={i18nProvider}>
    
    <Resource 
      name="academic-terms" 
      list={AcademicTermList} 
      create={AcademicTermCreate} 
      edit={AcademicTermEdit}
      options={{ label: 'Períodos' }}
    />

    <Resource 
      name="courses" 
      list={CourseList} 
      create={CourseCreate} 
      edit={CourseEdit}
      options={{ label: 'Cursos' }} 
    />

    <Resource 
      name="students" 
      list={StudentList} 
      create={StudentCreate} 
      edit={StudentEdit}
      options={{ label: 'Estudiantes' }} 
    />
    
  </Admin>
);

export default App;