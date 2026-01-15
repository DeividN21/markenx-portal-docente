# MarkenX - Portal del Docente 🎓

Este repositorio contiene el **Frontend Administrativo** para el sistema educativo de simulación de marketing **MarkenX**. Está construido sobre **React Admin** y permite al docente gestionar cursos, estudiantes y configurar los escenarios del videojuego.

## 🚀 Tecnologías

- **Framework:** React Admin (v5) + React (v18)
- **Build Tool:** Vite
- **Lenguaje:** TypeScript
- **Estilos:** Material UI (MUI)
- **Iconos:** MUI Icons

## 📋 Módulos Implementados

1.  **Gestión Académica:**
    - CRUD de Periodos Académicos.
    - CRUD de Cursos (vinculados a periodos).
    - Gestión de Estudiantes (con soporte para carga masiva visual).

2.  **Diseñador de Escenarios (Game Config):**
    - Interfaz visual para crear JSONs complejos de configuración del juego.
    - Gestión de Dimensiones, Consumidores, Acciones y Eventos.
    - Validación de reglas de negocio (rangos 0.0 - 1.0).

3.  **Gestión de Tareas:**
    - Creación de Asignaciones (Múltiples intentos) y Evaluaciones (Intento único).
    - Vinculación de Escenarios a Cursos.

4.  **Monitor de Desempeño:**
    - Vista jerárquica: Periodo -> Curso -> Estudiante -> Tarea.
    - Visualización de reportes de partida (KPIs, Historial turno a turno).

## 🛠️ Instalación y Ejecución

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/TU_USUARIO/markenx-portal-docente.git](https://github.com/TU_USUARIO/markenx-portal-docente.git)
    cd markenx-portal-docente
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecutar en modo desarrollo:**
    ```bash
    npm run dev
    ```
    El portal estará disponible en `http://localhost:5173`.

## ⚙️ Configuración de Entorno (Mock vs Real)

El proyecto cuenta con un sistema de "Switch" para cambiar entre datos falsos (para desarrollo de UI) y la API real.

- Mirar el archivo `.env` para configurar:
  - `VITE_USE_MOCK`: `true` para desarrollo, `false` para producción.
  - `VITE_API_URL`: URL de tu backend Spring Boot.
  - `VITE_KEYCLOAK_URL`: URL de autenticación.

> Para más detalles sobre la integración con el Backend y Unity, revisar la carpeta `/docs`.