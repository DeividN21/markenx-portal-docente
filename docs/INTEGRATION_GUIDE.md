# Guía de Integración MarkenX 🔗

Esta guía está dirigida para el desarrollo Backend e integración con Unity. Describe cómo conectar el Portal del Docente y el Videojuego con la API REST.

---

## 1. Conexión del Portal Docente (Frontend)

El frontend ya tiene toda la lógica lista. Solo se necesita cambiar la configuración para dejar de usar los datos simulados.

### Pasos para conectar a la API Real:

1.  Abrir el archivo `.env` en la raíz del proyecto.
2.  Cambiar la variable `VITE_USE_MOCK` a `false`.
3.  Asegurarse de que las URLs apunten a tu entorno local o servidor:

```ini
# .env
VITE_USE_MOCK=false
VITE_API_URL=http://localhost:8080/api
VITE_KEYCLOAK_URL=http://localhost:8080/realms/markenx/protocol/openid-connect/token
VITE_KEYCLOAK_CLIENT_ID=markenx-admin

