const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/AuthController');
const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Permite registrar un nuevo usuario en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo del usuario.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: password123
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *       400:
 *         description: El correo ya está registrado o la solicitud es inválida.
 */
router.post(
    '/register',
    [
        check('email').isEmail().withMessage('Debe proporcionar un correo válido.'),
        check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
    ],
    authController.register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Permite a un usuario autenticarse en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo del usuario.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: password123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, retorna el token JWT.
 *       400:
 *         description: Credenciales inválidas.
 */
router.post(
    '/login',
    [
        check('email').isEmail().withMessage('Debe proporcionar un correo válido.'),
        check('password').notEmpty().withMessage('La contraseña es obligatoria.'),
    ],
    authController.login
);

module.exports = router;
