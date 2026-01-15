import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import polyglotI18nProvider from "ra-i18n-polyglot";
import spanishMessages from "ra-language-spanish";
import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./auth/authProvider";
import LoginPage from "./auth/LoginPage";
import { markenxTheme } from './theme';

// Imports de Iconos
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';

// Recursos
import { AcademicTermList, AcademicTermCreate, AcademicTermEdit } from "./resources/academic-terms/AcademicTerms";
import { CourseList, CourseCreate, CourseEdit } from "./resources/courses/Courses";
import { StudentList, StudentCreate, StudentEdit } from "./resources/students/Students";
import { ScenarioList, ScenarioCreate, ScenarioEdit } from "./resources/scenarios/Scenarios";
import { TaskList, TaskCreate, TaskEdit } from "./resources/tasks/Tasks";

// Página de Desempeño
import { PerformancePage } from "./pages/PerformancePage";

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
    <Resource name="academic-terms" list={AcademicTermList} create={AcademicTermCreate} edit={AcademicTermEdit} options={{ label: 'Períodos' }} icon={CalendarMonthIcon} />
    <Resource name="courses" list={CourseList} create={CourseCreate} edit={CourseEdit} options={{ label: 'Cursos' }} icon={SchoolIcon} />
    <Resource name="students" list={StudentList} create={StudentCreate} edit={StudentEdit} options={{ label: 'Estudiantes' }} icon={GroupIcon} />
    <Resource name="scenarios" list={ScenarioList} create={ScenarioCreate} edit={ScenarioEdit} options={{ label: 'Escenarios (Juego)' }} icon={VideogameAssetIcon} />
    <Resource name="tasks" list={TaskList} create={TaskCreate} edit={TaskEdit} options={{ label: 'Tareas' }} icon={AssignmentIcon} />
    
    {/* RECURSO PARA MOSTRAR EN EL MENÚ */}
    <Resource 
        name="performance" 
        list={PerformancePage}
        options={{ label: 'Consultar Desempeño' }} 
        icon={BarChartIcon} 
    />

    <Resource name="attempts" />

  </Admin>
);

export default App;