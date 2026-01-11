import { useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';
import { Button, Card, CardActions, CircularProgress, TextField, Typography, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Se llama al authProvider.login
        login({ username: email, password })
            .catch(() => {
                notify('Usuario o contraseña incorrectos');
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
                backgroundColor: '#f5f5f5',
            }}
        >
            <Card sx={{ minWidth: 350, maxWidth: 400, padding: 3, boxShadow: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                    {/* Logo Simulado o Icono */}
                    <Box sx={{ m: 1, bgcolor: 'primary.main', borderRadius: '50%', p: 1 }}>
                        <LockIcon sx={{ color: 'white' }} />
                    </Box>
                    <Typography component="h1" variant="h5" fontWeight="bold">
                        MarkenX Admin
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Sistema de Gestión Académica
                    </Typography>
                </Box>
                
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            fullWidth
                            required
                            placeholder="admin@markenx.com"
                        />
                        <TextField
                            label="Contraseña"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            fullWidth
                            required
                        />
                        
                        <CardActions sx={{ padding: 0, marginTop: 1 }}>
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                fullWidth
                                disabled={loading}
                                size="large"
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Iniciar Sesión'}
                            </Button>
                        </CardActions>
                    </Box>
                </form>
            </Card>
            <Notification />
        </Box>
    );
};

export default LoginPage;