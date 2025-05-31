# Chok-chok Backend

Base de backend para el proyecto Chok-chok.

## Estructura

- `src/controllers`: Lógica de controladores (manejo de peticiones).
- `src/routes`: Definición de rutas.
- `src/models`: Modelos de datos (ej: Mongoose, Sequelize, etc).
- `src/middlewares`: Middlewares personalizados.
- `src/services`: Lógica de negocio y servicios externos.
- `src/utils`: Utilidades y helpers.
- `src/app.ts`: Punto de entrada de la app.

## Instalación

1. Instala dependencias:
   ```sh
   npm install
   ```
2. Copia `.env.example` a `.env` y configura tus variables.
3. Ejecuta en desarrollo:
   ```sh
   npm run dev
   ```

## Requisitos

- Node.js >= 18
- npm >= 9

## Scripts útiles

- `npm run dev`: Inicia el servidor en modo desarrollo.
- `npm run build`: Compila TypeScript.
- `npm start`: Inicia el servidor compilado.

## Endpoints principales

### POST /api/analysis

- **Descripción:** Recibe una imagen (base64) y devuelve un análisis facial simulado.
- **Body:**
  ```json
  {
    "image": "data:image/jpeg;base64,..."
  }
  ```
- **Respuesta:**
  ```json
  {
    "overallScore": 85,
    "skinType": "Mixta",
    "concerns": { ... },
    "recommendations": [],
    "routine": { ... }
  }
  ```

### Otros endpoints

- `/` (GET): Prueba de vida del backend.

## Mejores prácticas implementadas

- Validación de datos con Zod
- Manejo centralizado de errores
- Logger de peticiones
- Estructura escalable y mantenible

## Futuras mejoras

- Autenticación JWT
- Conexión a base de datos
- Pruebas unitarias y de integración
- Documentación OpenAPI/Swagger
