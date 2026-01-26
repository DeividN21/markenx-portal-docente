import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Title } from 'react-admin';
import { apiService } from '../services/api.service';
import {
    Box, Card, CardContent, Typography, Grid, Paper, Chip,
    Table, TableBody, TableCell, TableHead, TableRow, Button,
    LinearProgress, CircularProgress, Divider
} from '@mui/material';
import {
    LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Colores para el estado
const OUTCOME_COLORS: Record<string, string> = {
    WIN: '#22c55e',
    LOSE: '#ef4444',
    IN_PROGRESS: '#3b82f6',
};

const OUTCOME_LABELS: Record<string, string> = {
    WIN: 'COMPLETADO',
    LOSE: 'FALLIDO',
    IN_PROGRESS: 'EN PROGRESO',
};

// Función para obtener color según acceptance
const getAcceptanceColor = (value: number): string => {
    if (value < 0.4) return '#ef4444'; // Rojo
    if (value < 0.7) return '#f59e0b'; // Amarillo
    return '#22c55e'; // Verde
};

export const AttemptDashboardPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [attempt, setAttempt] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            apiService.get(`/attempts/${id}`)
                .then(({ json }) => {
                    setAttempt(json);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Error loading attempt:', err);
                    setError('No se pudo cargar el intento');
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (!attempt || error) {
        return (
            <Box p={3}>
                <Typography variant="h5" color="error" gutterBottom>
                    {error || 'No se pudo cargar el intento'}
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/performance')}
                    sx={{ mt: 2 }}
                >
                    Volver
                </Button>
            </Box>
        );
    }

    // Preparar datos para gráficas
    const evolutionData = attempt.history?.map((turn: any) => ({
        turno: turn.turnNumber,
        aceptacion: turn.acceptanceAtEnd,
        presupuesto: parseFloat(turn.budgetAtEnd),
    })) || [];

    const outcomeColor = OUTCOME_COLORS[attempt.outcome] || '#9ca3af';
    const outcomeLabel = OUTCOME_LABELS[attempt.outcome] || attempt.outcome;
    const acceptanceColor = getAcceptanceColor(attempt.finalAcceptance);

    // Generar interpretación
    const generateInterpretation = () => {
        const acceptance = attempt.finalAcceptance * 100;
        const discovery = attempt.profileDiscoveryPercentage * 100;
        
        if (attempt.outcome === 'WIN') {
            return `El estudiante completó exitosamente la sesión con un ${acceptance.toFixed(0)}% de aceptación final. ${
                discovery > 70 ? 'Demostró un excelente nivel de investigación del perfil del consumidor.' : 'Podría mejorar en la investigación del perfil del consumidor.'
            }`;
        } else if (attempt.outcome === 'LOSE') {
            return `La sesión concluyó sin alcanzar el objetivo. Se logró un ${acceptance.toFixed(0)}% de aceptación. ${
                attempt.remainingBudget < 50 ? 'El presupuesto se agotó rápidamente, sugiriendo decisiones costosas.' : 'Se requiere optimizar la estrategia de marketing.'
            }`;
        }
        return 'La sesión está en progreso.';
    };

    return (
        <Box p={4} maxWidth="1800px" margin="0 auto">
            {/* ENCABEZADO */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                    <Title title="Dashboard de Desempeño" />
                </Box>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/performance')}
                >
                    Volver
                </Button>
            </Box>

            {/* INFORMACIÓN GENERAL */}
            <Paper sx={{ p: 4, mb: 4, bgcolor: '#f8fafc', textAlign: 'center' }}>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    Fecha de sesión: <strong>{new Date(attempt.sessionDate).toLocaleString('es-ES')}</strong>
                </Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ color: outcomeColor, mt: 2 }}>
                    {outcomeLabel}
                </Typography>
            </Paper>

            {/* MÉTRICAS Y GRÁFICA */}
            <Grid container spacing={4} mb={4}>
                {/* COLUMNA IZQUIERDA: KPIs */}
                {/* @ts-ignore */}
                <Grid item xs={12} md={4}>
                    <Box display="flex" flexDirection="column" gap={3}>
                        {/* KPI 1: Aceptación Final */}
                        <Card>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    Aceptación Final
                                </Typography>
                                <Typography variant="h3" fontWeight="bold" sx={{ color: acceptanceColor, mb: 2 }}>
                                    {(attempt.finalAcceptance * 100).toFixed(1)}%
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={attempt.finalAcceptance * 100}
                                    sx={{
                                        height: 10,
                                        borderRadius: 5,
                                        bgcolor: '#e5e7eb',
                                        '& .MuiLinearProgress-bar': { bgcolor: acceptanceColor }
                                    }}
                                />
                            </CardContent>
                        </Card>

                        {/* KPI 2: Presupuesto Restante */}
                        <Card>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    Presupuesto Restante
                                </Typography>
                                <Typography variant="h3" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
                                    ${attempt.remainingBudget}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    De ${evolutionData[0]?.presupuesto || 0} inicial
                                </Typography>
                            </CardContent>
                        </Card>

                        {/* KPI 3: Perfil Descubierto */}
                        <Card>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    Perfil Descubierto
                                </Typography>
                                <Typography variant="h3" fontWeight="bold" sx={{ color: '#14b8a6', mb: 2 }}>
                                    {(attempt.profileDiscoveryPercentage * 100).toFixed(0)}%
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={attempt.profileDiscoveryPercentage * 100}
                                    sx={{
                                        height: 10,
                                        borderRadius: 5,
                                        bgcolor: '#e5e7eb',
                                        '& .MuiLinearProgress-bar': { bgcolor: '#14b8a6' }
                                    }}
                                />
                            </CardContent>
                        </Card>

                        {/* KPI 4: Turnos Utilizados */}
                        <Card>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    Turnos Utilizados
                                </Typography>
                                <Typography variant="h3" fontWeight="bold" color="textPrimary">
                                    {attempt.totalTurnsUsed}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>

                {/* COLUMNA DERECHA: GRÁFICA */}
                {/* @ts-ignore */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" gutterBottom fontWeight="600">
                            Relación entre Aceptación y Presupuesto
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        <ResponsiveContainer width="100%" height={500}>
                            <LineChart data={evolutionData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis 
                                    dataKey="turno" 
                                    label={{ value: 'Turno', position: 'insideBottom', offset: -5 }}
                                    stroke="#6b7280"
                                />
                                <YAxis 
                                    yAxisId="left"
                                    label={{ value: 'Aceptación', angle: -90, position: 'insideLeft' }}
                                    stroke="#3b82f6"
                                    domain={[0, 1]}
                                    tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                                />
                                <YAxis 
                                    yAxisId="right"
                                    orientation="right"
                                    label={{ value: 'Presupuesto ($)', angle: 90, position: 'insideRight' }}
                                    stroke="#f59e0b"
                                />
                                <Tooltip 
                                    formatter={(value: any, name?: string) => {
                                        if (name === 'Aceptación') return `${(value * 100).toFixed(1)}%`;
                                        return `$${value}`;
                                    }}
                                    contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }}
                                />
                                <Legend />
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="aceptacion"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    dot={{ fill: '#3b82f6', r: 5 }}
                                    name="Aceptación"
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="presupuesto"
                                    stroke="#f59e0b"
                                    strokeWidth={3}
                                    dot={{ fill: '#f59e0b', r: 5 }}
                                    name="Presupuesto"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>

            {/* HISTORIAL DETALLADO */}
            <Paper sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom fontWeight="600" textAlign="center" mb={3}>
                    Historial Detallado por Turno
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f8fafc' }}>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Turno</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Aceptación</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Presupuesto</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Evento</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attempt.history?.map((turn: any) => (
                            <TableRow key={turn.turnNumber} sx={{ '&:nth-of-type(even)': { bgcolor: '#fafafa' } }}>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                                    {turn.turnNumber}
                                </TableCell>
                                <TableCell align="center">
                                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={turn.acceptanceAtEnd * 100}
                                            sx={{ 
                                                width: 100, 
                                                height: 8, 
                                                borderRadius: 5,
                                                bgcolor: '#e5e7eb',
                                                '& .MuiLinearProgress-bar': { 
                                                    bgcolor: getAcceptanceColor(turn.acceptanceAtEnd) 
                                                }
                                            }}
                                        />
                                        <Typography variant="body2" fontWeight="500">
                                            {(turn.acceptanceAtEnd * 100).toFixed(1)}%
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: '500', fontSize: '1rem' }}>
                                    ${turn.budgetAtEnd}
                                </TableCell>
                                <TableCell align="center">
                                    {turn.eventOccurredTitle ? (
                                        <Chip 
                                            label={turn.eventOccurredTitle} 
                                            size="small"
                                            sx={{ bgcolor: '#fef2f2', color: '#991b1b', fontWeight: '500' }}
                                        />
                                    ) : (
                                        <Typography variant="caption" color="textSecondary">-</Typography>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
};
