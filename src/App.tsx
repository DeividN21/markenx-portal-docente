import { Admin, Resource, ListGuesser } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import spanishMessages from "ra-language-spanish";
import { dataProvider } from "./providers/dataProvider";

// Imports de Iconos
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import AssignmentIcon from '@mui/icons-material/Assignment';

// Import de tema
import { markenxTheme } from './theme';

// Imports de Autenticación
import { authProvider } from "./auth/authProvider";
import LoginPage from "./auth/LoginPage";

// Componentes de Periodos
import { AcademicTermList, AcademicTermCreate, AcademicTermEdit } from "./resources/academic-terms/AcademicTerms";

// Componentes de Cursos
import { CourseList, CourseCreate, CourseEdit } from "./resources/courses/Courses";

// Componentes de Estudiantes
import { StudentList, StudentCreate, StudentEdit } from "./resources/students/Students";

// Componentes de Escenarios
import { ScenarioList, ScenarioCreate, ScenarioEdit } from "./resources/scenarios/Scenarios";

// Componentes de Tareas
import { TaskList, TaskCreate, TaskEdit } from "./resources/tasks/Tasks";

const i18nProvider = polyglotI18nProvider(() => spanishMessages, "es");

const App = () => (
  <Admin
    theme={markenxTheme}
    dataProvider={dataProvider} 
    authProvider={authProvider}
    loginPage={LoginPage}
    i18nProvider={i18nProvider}
    requireAuth
  >
    
    <Resource 
      name="academic-terms" 
      list={AcademicTermList} 
      create={AcademicTermCreate} 
      edit={AcademicTermEdit}
      options={{ label: 'Períodos' }}
      icon={CalendarMonthIcon}
    />

    <Resource 
      name="courses" 
      list={CourseList} 
      create={CourseCreate} 
      edit={CourseEdit}
      options={{ label: 'Cursos' }}
      icon={SchoolIcon}
    />

    <Resource 
      name="students" 
      list={StudentList} 
      create={StudentCreate} 
      edit={StudentEdit}
      options={{ label: 'Estudiantes' }}
      icon={GroupIcon}
    />

    <Resource 
      name="scenarios" 
      list={ScenarioList} 
      create={ScenarioCreate} 
      edit={ScenarioEdit}
      options={{ label: 'Diseñador de Escenarios' }}
      icon={VideogameAssetIcon}
    />

    <Resource 
      name="tasks" 
      list={TaskList} 
      create={TaskCreate} 
      edit={TaskEdit}
      options={{ label: 'Tareas' }}
      icon={AssignmentIcon}
    />
    
  </Admin>
);

export default App;