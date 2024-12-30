// Importar dependencias
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const taskRoutes = require('./routes/TaskRoutes'); // Importa las rutas de tareas
const authRoutes = require('./routes/AuthRoutes'); // Importa las rutas de autenticación

// Crear instancia de Express
const app = express();
const PORT = process.env.PORT || 4000; // Definir puerto
const cors = require('cors');


// Configuración básica de CORS
app.use(cors());

app.get('/example', (req, res) => {
  res.json({ message: 'CORS habilitado temporalmente' });
});

// app.listen(4000, () => {
//   console.log('Servidor escuchando en el puerto 4000');
// });
// Conectar a la base de datos MongoDB usando la variable de entorno
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((err) => {
    console.error('Error de conexión a MongoDB:', err);
  });

// Definición de la configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Versión de OpenAPI
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'API para gestionar tareas (CRUD)',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`, // URL del servidor local
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/TaskRoutes.js', './routes/AuthRoutes.js'], // Archivos donde están las rutas y sus comentarios Swagger
};

// Crear el especificador Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Documentación Swagger en el endpoint /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware para interpretar JSON
app.use(express.json()); // Usamos el middleware integrado de Express para interpretar JSON

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido a Task Manager!');
});

// Usar las rutas de autenticación
app.use('/api/auth', authRoutes);

// Usar las rutas de tareas
app.use('/api', taskRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
  console.log(`Documentación de la API en http://localhost:${PORT}/api-docs`);
});
