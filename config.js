const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://dbUser:<nuevaContraseña>@cluster0.qhinj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        process.exit(1); // Salir del proceso si falla la conexión
    }
};

module.exports = connectDB;
