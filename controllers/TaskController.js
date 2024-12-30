const Task = require('../models/Task'); // Importamos el modelo de Task
const { validationResult } = require('express-validator');

// Crear una nueva tarea
exports.createTask = async (req, res) => {
  // Verificar si hay errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
    });

    // Guardar la tarea en la base de datos
    await newTask.save();

    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear la tarea', error });
  }
};

// Obtener todas las tareas
exports.getAllTasks = async (req, res) => {
  try {
    // Filtrar por estado si es necesario
    const { completed } = req.query;

    let tasks;
    if (completed !== undefined) {
      tasks = await Task.find({ completed: completed === 'true' });
    } else {
      tasks = await Task.find();
    }

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener las tareas', error });
  }
};

// Obtener una tarea por ID
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener la tarea', error });
  }
};

// Actualizar una tarea
exports.updateTask = async (req, res) => {
  // Verificar si hay errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar la tarea', error });
  }
};

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    return res.status(200).json({ message: 'Tarea eliminada con éxito' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar la tarea', error });
  }
};
