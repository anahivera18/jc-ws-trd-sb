require('dotenv').config({ path: '../.env' });

const express = require('express');
const connectDB = require('./db'); 

const MONGO_URI = process.env.MONGO_URI; 
const PORT = process.env.PORT || 5000;
const app = express();

const iniciaApp = async () => {
    
    if (!MONGO_URI) {
        console.error('Error: La variable MONGO_URI no se cargó.');
        process.exit(1);
    }

    await connectDB(MONGO_URI); 

    app.get('/', (req, res) => {
        res.send('<h1> Servidor Express Funcionando</h1><p>Conexión a MongoDB exitosa.</p>');
    });

    app.listen(PORT, () => {
        console.log(`Servidor Express en: http://localhost:${PORT}`);
    });
};

iniciaApp(); 