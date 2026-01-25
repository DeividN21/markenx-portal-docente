import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import polyglotI18nProvider from "ra-i18n-polyglot";
import spanishMessages from "ra-language-spanish";

// 1. IMPORTS DE PROVEEDORES DE DATOS
import { dataProvider as mockDataProvider } from "./providers/dataProvider";
import { restProvider } from "./providers/restProvider";

// 2. IMPORT DEL AUTH PROVIDER
import { authProvider } from "./auth/authProvider";
import { markenxTheme } from './theme';

// 3. IMPORTS DE ICONOS
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';

// 4. IMPORTS DE RECURSOS (VISTAS)
import { AcademicTermList, AcademicTermCreate, AcademicTermEdit } from "./resources/terms/AcademicTerms";
import { CourseList, CourseCreate, CourseEdit } from "./resources/courses/Courses";
import { StudentList, StudentCreate, StudentEdit } from "./resources/students/Students";
import { ScenarioList, ScenarioCreate, ScenarioEdit } from "./resources/scenarios/Scenarios";
import { TaskList, TaskCreate, TaskEdit } from "./resources/tasks/Tasks";
import { PerformancePage } from "./pages/PerformancePage";

// CONFIGURACIÓN

const i18nProvider = polyglotI18nProvider(() => spanishMessages, "es");

// LÓGICA DE SELECCIÓN DE PROVEEDOR (Mock vs Real)
// Si en .env VITE_USE_MOCK es 'true', usa los datos falsos. Si no, conecta a la API.
const activeDataProvider = import.meta.env.VITE_USE_MOCK === 'true' 
    ? mockDataProvider 
    : restProvider;

const App = () => (
  <Admin
    theme={markenxTheme}
    dataProvider={activeDataProvider}
    authProvider={authProvider}
    loginPage={false}
    i18nProvider={i18nProvider}
    requireAuth
  >
    <Resource name="academic-terms" list={AcademicTermList} create={AcademicTermCreate} edit={AcademicTermEdit} options={{ label: 'Períodos' }} icon={CalendarMonthIcon} />
    <Resource name="courses" list={CourseList} create={CourseCreate} edit={CourseEdit} options={{ label: 'Cursos' }} icon={SchoolIcon} />
    <Resource name="students" list={StudentList} create={StudentCreate} edit={StudentEdit} options={{ label: 'Estudiantes' }} icon={GroupIcon} />
    <Resource name="scenarios" list={ScenarioList} create={ScenarioCreate} edit={ScenarioEdit} options={{ label: 'Escenarios (Juego)' }} icon={VideogameAssetIcon} />
    <Resource name="tasks" list={TaskList} create={TaskCreate} edit={TaskEdit} options={{ label: 'Tareas' }} icon={AssignmentIcon} />
    
    {/* VISTA PERSONALIZADA: MONITOR DE DESEMPEÑO */}
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