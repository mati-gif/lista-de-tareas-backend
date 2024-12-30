const express = require('express');
const { check } = require('express-validator');
const taskController = require('../controllers/TaskController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware de autenticación
const router = express.Router();

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     description: Permite crear una nueva tarea.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: El título de la tarea.
 *                 example: Comprar pan
 *               description:
 *                 type: string
 *                 description: Descripción de la tarea.
 *                 example: Ir al supermercado y comprar pan fresco.
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente.
 *       400:
 *         description: Error en la solicitud.
 */
router.post(
    '/tasks',
    authMiddleware, // Proteger la ruta
    [check('title').notEmpty().withMessage('El título es obligatorio')],
    taskController.createTask
);

/***
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     description: Retorna una lista de todas las tareas disponibles, con la opción de filtrar por estado (completada o pendiente).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: string
 *           enum: [true, false]  # Opcional, pero puedes agregar esto si quieres limitar los valores
 *         description: Filtra las tareas por estado (completada o pendiente).
 *         required: false
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida exitosamente.
 *       401:
 *         description: No autorizado.
 */
router.get('/tasks', authMiddleware, taskController.getAllTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     description: Retorna una tarea específica basada en su ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea.
 *     responses:
 *       200:
 *         description: Tarea obtenida exitosamente.
 *       404:
 *         description: Tarea no encontrada.
 */
router.get('/tasks/:id', authMiddleware, taskController.getTaskById);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea
 *     description: Permite actualizar una tarea existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Nuevo título de la tarea.
 *               description:
 *                 type: string
 *                 description: Nueva descripción de la tarea.
 *               completed:
 *                 type: boolean
 *                 description: Estado de completado.
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente.
 *       404:
 *         description: Tarea no encontrada.
 */
router.put(
    '/tasks/:id',
    authMiddleware,
    [
        check('title').optional().notEmpty().withMessage('El título no puede estar vacío'),
        check('completed')
            .optional()
            .isBoolean()
            .withMessage('El estado completado debe ser un valor booleano'),
    ],
    taskController.updateTask
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     description: Permite eliminar una tarea existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea.
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente.
 *       404:
 *         description: Tarea no encontrada.
 */
router.delete('/tasks/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
