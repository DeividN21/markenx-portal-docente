import { useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';
import { Button, Card, CircularProgress, TextField, Typography, Box, InputAdornment } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        login({ username: email, password })
            .catch(() => {
                notify('Credenciales incorrectas');
                setLoading(false);
            });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
                // Fondo Degradado
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                backgroundSize: 'cover',
            }}
        >
            <Card sx={{ 
                minWidth: 380, 
                maxWidth: 450, 
                padding: 4, 
                borderRadius: 4,
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)'
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                    <Box sx={{ 
                        m: 1, 
                        bgcolor: 'primary.main', 
                        borderRadius: 3, 
                        p: 1.5,
                        boxShadow: '0 4px 6px -1px rgb(37 99 235 / 0.3)'
                    }}>
                        <SchoolIcon sx={{ color: 'white', fontSize: 40 }} />
                    </Box>
                    <Typography component="h1" variant="h4" fontWeight="800" color="primary.dark">
                        MarkenX
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        Portal del Docente
                    </Typography>
                </Box>
                
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        <TextField
                            label="Correo Institucional"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            fullWidth
                            required
                            placeholder="admin@markenx.com"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Contraseña"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            fullWidth
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            disabled={loading}
                            size="large"
                            sx={{ 
                                mt: 2, 
                                py: 1.5,
                                fontSize: '1.1rem',
                                boxShadow: '0 4px 6px -1px rgb(37 99 235 / 0.4)'
                            }}
                        >
                            {loading ? <CircularProgress size={26} color="inherit" /> : 'Acceder al Portal'}
                        </Button>
                    </Box>
                </form>
                
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="caption" color="text.disabled">
                        © 2026 MarkenX Simulation System
                    </Typography>
                </Box>
            </Card>
            <Notification />
        </Box>
    );
};

export default LoginPage;