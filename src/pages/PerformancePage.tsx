import { useState, useEffect } from 'react';
import { useDataProvider, Title } from 'react-admin';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api.service';
import { 
    Card, CardContent, Typography, Grid, Select, MenuItem, 
    FormControl, InputLabel, Box, List, ListItemButton, ListItemText, 
    ListItemAvatar, Avatar, Chip,
    Table, TableBody, TableCell, TableHead, TableRow, Button
} from '@mui/material';

// Iconos
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VisibilityIcon from '@mui/icons-material/Visibility';

// ESTILOS AUXILIARES
const cardStyle = { mb: 2, boxShadow: 3 };

// TRADUCCIÓN DE ESTADOS
const translateStatus = (status: string): string => {
    const translations: Record<string, string> = {
        'UNKNOWN': 'DESCONOCIDO',
        'APPROVED': 'COMPLETADO',
        'DISAPPROVED': 'FALLIDO'
    };
    return translations[status] || status;
};

// COLORES PARA ESTADOS
const getStatusColor = (status: string): 'success' | 'error' | 'default' => {
    if (status === 'APPROVED') return 'success';
    if (status === 'DISAPPROVED') return 'error';
    return 'default';
};

export const PerformancePage = () => {
    const dataProvider = useDataProvider();
    const navigate = useNavigate();
    
    // ESTADOS DE SELECCIÓN
    const [terms, setTerms] = useState<any[]>([]);
    const [selectedTerm, setSelectedTerm] = useState('');
    
    const [courses, setCourses] = useState<any[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);

    const [students, setStudents] = useState<any[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);

    const [studentTasks, setStudentTasks] = useState<any[]>([]);

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
        
        // Obtener todos los cursos y filtrar localmente por termId
        dataProvider.getList('courses', {
            pagination: { page: 1, perPage: 1000 },
            sort: { field: 'name', order: 'ASC' },
            filter: {}
        }).then(({ data }) => {
            const filteredCourses = data.filter((course: any) => course.termId === termId);
            setCourses(filteredCourses);
        });
    };

    // AL SELECCIONAR CURSO -> CARGAR ESTUDIANTES
    const handleCourseClick = (course: any) => {
        setSelectedCourse(course);
        setSelectedStudent(null);

        // Obtener todos los estudiantes y filtrar localmente por courseId
        dataProvider.getList('students', {
            pagination: { page: 1, perPage: 1000 },
            sort: { field: 'last_name', order: 'ASC' },
            filter: {}
        }).then(({ data }) => {
            const filteredStudents = data.filter((student: any) => student.courseId === course.id);
            setStudents(filteredStudents);
        });
    };

    // AL SELECCIONAR ESTUDIANTE -> CARGAR INTENTOS
    const handleStudentClick = async (student: any) => {
        setSelectedStudent(student);

        try {
            // Traer intentos del estudiante usando el endpoint específico
            const { json } = await apiService.get<any[]>(`/students/${student.id}/attempts`);
            setStudentTasks(json || []);
        } catch (error) {
            console.error('Error loading attempts:', error);
            setStudentTasks([]);
        }
    };

    return (
        <Box p={2}>
            <Title title="Monitor de Desempeño Académico" />
            
            <Grid container spacing={3}>
                {/* @ts-ignore - MUI v7 Grid compatibility */}
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
                                        <MenuItem key={term.id} value={term.id}>{term.label}</MenuItem>
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
                                        <ListItemButton 
                                            key={course.id} 
                                            selected={selectedCourse?.id === course.id}
                                            onClick={() => handleCourseClick(course)}
                                            sx={{ borderRadius: 2, mb: 1, bgcolor: selectedCourse?.id === course.id ? '#e0f2fe' : 'transparent' }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: '#2563eb' }}><SchoolIcon /></Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={course.name} secondary={`Código: ${course.code}`} />
                                        </ListItemButton>
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
                                        <ListItemButton 
                                            key={student.id} 
                                            selected={selectedStudent?.id === student.id}
                                            onClick={() => handleStudentClick(student)}
                                            sx={{ borderRadius: 2, mb: 0.5, bgcolor: selectedStudent?.id === student.id ? '#dcfce7' : 'transparent' }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar><PersonIcon /></Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={student.fullName} secondary={student.email} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    )}
                </Grid>
                {/* DETALLES DEL ESTUDIANTE SELECCIONADO */}
                {/* @ts-ignore - MUI v7 Grid compatibility */}
                <Grid item xs={12} md={8}>
                    {selectedStudent ? (
                        <Card sx={{ ...cardStyle, height: 'fit-content' }}>
                            <CardContent>
                                {studentTasks.length > 0 ? (
                                    <Box sx={{ maxHeight: 600, overflow: 'auto' }}>
                                        <Table>
                                        <TableHead>
                                            <TableRow sx={{ bgcolor: '#f8fafc' }}>
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Fecha y hora de inicio</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Fecha y hora de fin</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Puntuación</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acción</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {studentTasks.map((attempt: any) => (
                                                <TableRow key={attempt.attemptId}>
                                                    <TableCell align="center">
                                                        {new Date(attempt.startedAt).toLocaleString('es-ES', {
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {attempt.finishedAt ? new Date(attempt.finishedAt).toLocaleString('es-ES', {
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        }) : '-'}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Chip 
                                                            label={translateStatus(attempt.status)} 
                                                            color={getStatusColor(attempt.status)}
                                                            size="small"
                                                            sx={{
                                                                width: '120px',
                                                                '& .MuiChip-label': {
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    whiteSpace: 'nowrap',
                                                                }
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {attempt.score !== null && attempt.score !== undefined 
                                                            ? (attempt.score * 100).toFixed(0) + '%'
                                                            : '-'}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Button 
                                                            size="small" 
                                                            variant="text"
                                                            color="primary"
                                                            startIcon={<VisibilityIcon />}
                                                            onClick={() => navigate(`/attempts/${attempt.attemptId}`)}
                                                        >
                                                            Ver
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    </Box>
                                ) : (
                                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={4}>
                                        <AssignmentIcon sx={{ fontSize: 60, color: '#cbd5e1' }} />
                                        <Typography variant="body1" color="textSecondary" mt={2}>
                                            Este estudiante no tiene intentos registrados
                                        </Typography>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
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