const mongoose = require('mongoose');

// Crear el esquema de la tarea (Task)
const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'El título es obligatorio'],
            trim: true, // Eliminar espacios innecesarios
        },
        description: {
            type: String,
            trim: true, // Eliminar espacios innecesarios
            default: '', // Valor por defecto vacío si no se proporciona
        },
        completed: {
            type: Boolean,
            default: false, // Por defecto, la tarea no está completada
        },
        createdAt: {
            type: Date,
            default: Date.now, // La fecha se genera automáticamente
        },
    },
    {
        timestamps: true, // Esto agregará createdAt y updatedAt automáticamente
    }
);

// Crear el modelo de Task
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
