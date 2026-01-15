import { useState, useEffect } from 'react';
import { useDataProvider, Title } from 'react-admin';
import { 
    Card, CardContent, Typography, Grid, Select, MenuItem, 
    FormControl, InputLabel, Box, List, ListItem, ListItemText, 
    ListItemAvatar, Avatar, Chip, Divider, Button, LinearProgress,
    Table, TableBody, TableCell, TableHead, TableRow, Paper, Alert
} from '@mui/material';

// Iconos
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VisibilityIcon from '@mui/icons-material/Visibility';

// ESTILOS AUXILIARES
const cardStyle = { mb: 2, boxShadow: 3 };

export const PerformancePage = () => {
    const dataProvider = useDataProvider();
    
    // ESTADOS DE SELECCIÓN
    const [terms, setTerms] = useState<any[]>([]);
    const [selectedTerm, setSelectedTerm] = useState('');
    
    const [courses, setCourses] = useState<any[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);

    const [students, setStudents] = useState<any[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);

    const [studentTasks, setStudentTasks] = useState<any[]>([]);
    const [selectedResult, setSelectedResult] = useState<any>(null); // El JSON de Unity

    // CARGA INICIAL: PERIODOS
    useEffect(() => {
        dataProvider.getList('academic-terms', { 
            pagination: { page: 1, perPage: 100 }, 
            sort: { field: 'name', order: 'DESC' }, 
            filter: {} 
        }).then(({ data }) => setTerms(data));
    }, [dataProvider]);

    // AL SELECCIONAR PERIODO -> CARGAR CURSOS
    const handleTermChange = (termId: string) => {
        setSelectedTerm(termId);
        setSelectedCourse(null);
        setSelectedStudent(null);
        setSelectedResult(null);
        
        dataProvider.getList('courses', {
            pagination: { page: 1, perPage: 100 },
            sort: { field: 'name', order: 'ASC' },
            filter: { academic_term_id: termId }
        }).then(({ data }) => setCourses(data));
    };

    // AL SELECCIONAR CURSO -> CARGAR ESTUDIANTES
    const handleCourseClick = (course: any) => {
        setSelectedCourse(course);
        setSelectedStudent(null);
        setSelectedResult(null);

        dataProvider.getList('students', {
            pagination: { page: 1, perPage: 100 },
            sort: { field: 'last_name', order: 'ASC' },
            filter: { course_id: course.id }
        }).then(({ data }) => setStudents(data));
    };

    // AL SELECCIONAR ESTUDIANTE -> CARGAR TAREAS E INTENTOS
    const handleStudentClick = async (student: any) => {
        setSelectedStudent(student);
        setSelectedResult(null);

        // 1. Traer tareas del curso
        const { data: tasks } = await dataProvider.getList('tasks', {
            pagination: { page: 1, perPage: 100 },
            sort: { field: 'deadline', order: 'DESC' },
            filter: { course_id: selectedCourse.id }
        });

        // 2. Traer intentos del estudiante
        const { data: attempts } = await dataProvider.getList('attempts', {
            pagination: { page: 1, perPage: 100 },
            sort: { field: 'sessionDate', order: 'DESC' },
            filter: { student_id: student.id }
        });

        // 3. Fusionar info: Tarea + Su mejor intento
        const tasksWithStatus = tasks.map((task: any) => {
            const attempt = attempts.find((a: any) => a.task_id === task.id);
            return {
                ...task,
                status: attempt ? 'COMPLETED' : 'PENDING',
                attemptData: attempt
            };
        });

        setStudentTasks(tasksWithStatus);
    };

    return (
        <Box p={2}>
            <Title title="Monitor de Desempeño Académico" />
            
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    {/* 1. SELECCIONAR PERIODO */}
                    <Card sx={cardStyle}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom color="primary">
                                1. Periodo Académico
                            </Typography>
                            <FormControl fullWidth size="small">
                                <InputLabel>Seleccionar Periodo</InputLabel>
                                <Select
                                    value={selectedTerm}
                                    label="Seleccionar Periodo"
                                    onChange={(e) => handleTermChange(e.target.value)}
                                >
                                    {terms.map(term => (
                                        <MenuItem key={term.id} value={term.id}>{term.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </CardContent>
                    </Card>

                    {/* 2. LISTA DE CURSOS */}
                    {selectedTerm && (
                        <Card sx={cardStyle}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom color="primary">
                                    2. Cursos
                                </Typography>
                                <List dense>
                                    {courses.map(course => (
                                        <ListItem 
                                            key={course.id} 
                                            button 
                                            selected={selectedCourse?.id === course.id}
                                            onClick={() => handleCourseClick(course)}
                                            sx={{ borderRadius: 2, mb: 1, bgcolor: selectedCourse?.id === course.id ? '#e0f2fe' : 'transparent' }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: '#2563eb' }}><SchoolIcon /></Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={course.name} secondary={`Código: ${course.code}`} />
                                        </ListItem>
                                    ))}
                                    {courses.length === 0 && <Typography variant="body2" color="textSecondary">No hay cursos en este periodo.</Typography>}
                                </List>
                            </CardContent>
                        </Card>
                    )}

                    {/* 3. LISTA DE ESTUDIANTES */}
                    {selectedCourse && (
                        <Card sx={cardStyle}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom color="primary">
                                    3. Estudiantes
                                </Typography>
                                <List dense sx={{ maxHeight: 300, overflow: 'auto' }}>
                                    {students.map(student => (
                                        <ListItem 
                                            key={student.id} 
                                            button 
                                            selected={selectedStudent?.id === student.id}
                                            onClick={() => handleStudentClick(student)}
                                            sx={{ borderRadius: 2, mb: 0.5, bgcolor: selectedStudent?.id === student.id ? '#dcfce7' : 'transparent' }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar><PersonIcon /></Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={`${student.first_name} ${student.last_name}`} secondary={student.email} />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    )}
                </Grid>
                {/* DETALLES DEL ESTUDIANTE SELECCIONADO */}
                <Grid item xs={12} md={8}>
                    {selectedStudent ? (
                        <>
                            {/* 4. LISTA DE ASIGNACIONES */}
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Asignaciones de {selectedStudent.first_name}
                            </Typography>
                            
                            <Grid container spacing={2} sx={{ mb: 4 }}>
                                {studentTasks.map(task => (
                                    <Grid item xs={12} sm={6} key={task.id}>
                                        <Card 
                                            onClick={() => task.status === 'COMPLETED' && setSelectedResult(task.attemptData)}
                                            sx={{ 
                                                cursor: task.status === 'COMPLETED' ? 'pointer' : 'default',
                                                borderLeft: task.status === 'COMPLETED' ? '6px solid #22c55e' : '6px solid #94a3b8',
                                                transition: 'transform 0.2s',
                                                '&:hover': { transform: task.status === 'COMPLETED' ? 'translateY(-2px)' : 'none' }
                                            }}
                                        >
                                            <CardContent>
                                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                                    <Typography variant="subtitle1" fontWeight="bold">{task.title}</Typography>
                                                    {task.status === 'COMPLETED' ? 
                                                        <Chip icon={<CheckCircleIcon />} label="Completada" color="success" size="small" /> : 
                                                        <Chip icon={<CancelIcon />} label="Pendiente" size="small" />
                                                    }
                                                </Box>
                                                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                                    Vence: {new Date(task.deadline).toLocaleDateString()}
                                                </Typography>
                                                {task.status === 'COMPLETED' && (
                                                    <Typography variant="caption" color="primary" sx={{ mt: 1, display: 'block' }}>
                                                        Clic para ver métricas 📊
                                                    </Typography>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>

                            {/* 5. VISUALIZACIÓN DE MÉTRICAS (JSON DE UNITY) */}
                            {selectedResult && (
                                <Box component={Paper} p={3} sx={{ bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                    <Typography variant="h5" color="primary.dark" gutterBottom>
                                        Reporte de Partida: {selectedResult.finalOutcome}
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <Grid container spacing={3} mb={3}>
                                        <Grid item xs={4}>
                                            <Card elevation={0} sx={{ bgcolor: 'white', border: '1px solid #ddd', textAlign: 'center', p: 1 }}>
                                                <TrendingUpIcon color="primary" fontSize="large" />
                                                <Typography variant="h4">{(selectedResult.finalAcceptance * 100).toFixed(0)}%</Typography>
                                                <Typography variant="caption">Aceptación Final</Typography>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Card elevation={0} sx={{ bgcolor: 'white', border: '1px solid #ddd', textAlign: 'center', p: 1 }}>
                                                <AttachMoneyIcon color="success" fontSize="large" />
                                                <Typography variant="h4">${selectedResult.remainingBudget}</Typography>
                                                <Typography variant="caption">Presupuesto Restante</Typography>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Card elevation={0} sx={{ bgcolor: 'white', border: '1px solid #ddd', textAlign: 'center', p: 1 }}>
                                                <VisibilityIcon color="secondary" fontSize="large" />
                                                <Typography variant="h4">{(selectedResult.profileDiscoveryPercentage * 100).toFixed(0)}%</Typography>
                                                <Typography variant="caption">Perfil Descubierto</Typography>
                                            </Card>
                                        </Grid>
                                    </Grid>

                                    {/* Tabla de Historial Turno a Turno */}
                                    <Typography variant="h6" gutterBottom>Historial de Decisiones (Turn-by-Turn)</Typography>
                                    <Table size="small" sx={{ bgcolor: 'white' }}>
                                        <TableHead>
                                            <TableRow sx={{ bgcolor: '#eff6ff' }}>
                                                <TableCell>Turno</TableCell>
                                                <TableCell>Aceptación</TableCell>
                                                <TableCell>Presupuesto</TableCell>
                                                <TableCell>Acciones Compradas</TableCell>
                                                <TableCell>Eventos</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {selectedResult.history.map((turn: any) => (
                                                <TableRow key={turn.turnNumber}>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>{turn.turnNumber}</TableCell>
                                                    <TableCell>
                                                        <Box display="flex" alignItems="center">
                                                            <LinearProgress variant="determinate" value={turn.acceptanceAtEnd * 100} sx={{ width: 50, mr: 1, height: 8, borderRadius: 5 }} />
                                                            {(turn.acceptanceAtEnd * 100).toFixed(0)}%
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>${turn.budgetAtEnd}</TableCell>
                                                    <TableCell>
                                                        {turn.actionsTakenIds.length > 0 ? (
                                                            turn.actionsTakenIds.map((act: string) => (
                                                                <Chip key={act} label={act} size="small" sx={{ mr: 0.5, mb: 0.5, fontSize: '0.7rem' }} />
                                                            ))
                                                        ) : <Typography variant="caption" color="textSecondary">Ninguna</Typography>}
                                                    </TableCell>
                                                    <TableCell>
                                                        {turn.eventOcurredTitle ? (
                                                            <Typography variant="caption" color="error" fontWeight="bold">
                                                                ⚠️ {turn.eventOcurredTitle}
                                                            </Typography>
                                                        ) : "-"}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                            )}
                        </>
                    ) : (
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" sx={{ opacity: 0.5 }}>
                            <AssignmentIcon sx={{ fontSize: 100, color: '#cbd5e1' }} />
                            <Typography variant="h6" color="textSecondary" mt={2}>
                                Selecciona un estudiante para ver su desempeño
                            </Typography>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};