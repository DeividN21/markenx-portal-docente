import { Admin, Resource } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import spanishMessages from "ra-language-spanish";

// 1. IMPORTS DE PROVEEDORES DE DATOS
import { dataProvider } from "./providers/dataProvider";

// 2. IMPORT DEL AUTH PROVIDER
import { authProvider } from "./auth/authProvider";
import { markenxTheme } from './theme';

// 3. IMPORTS DE TRADUCCIONES
import { customTranslations } from "./i18n/customTranslations";

// 4. IMPORTS DE ICONOS
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';

// 5. IMPORTS DE RECURSOS (VISTAS)
import { CourseList, CourseCreate, CourseEdit } from "./features/courses";
import { StudentList, StudentCreate, StudentEdit } from "./features/students";
import { ScenarioList, ScenarioCreate, ScenarioEdit } from "./features/scenarios";
import { TaskList, TaskCreate, TaskEdit } from "./features/tasks";
import { PerformancePage } from "./pages/PerformancePage";
import { TermList, TermCreate, TermEdit } from "./features/terms";

// Combinar traducciones base con personalizadas
const i18nProvider = polyglotI18nProvider(() => ({
  ...spanishMessages,
  ra: {
    ...spanishMessages.ra,
    action: {
      ...spanishMessages.ra.action,
      ...customTranslations.ra.action,
    },
    navigation: {
      ...spanishMessages.ra.navigation,
      ...customTranslations.ra.navigation,
    },
  },
}), 'es');

const App = () => (
  <Admin
    theme={markenxTheme}
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
    loginPage={false}
    requireAuth
  >
    <Resource name="academic-terms" list={TermList} create={TermCreate} edit={TermEdit} options={{ label: 'Períodos' }} icon={CalendarMonthIcon} />
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