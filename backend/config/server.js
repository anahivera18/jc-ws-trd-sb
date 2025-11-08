require('dotenv').config({ path: '../.env' });

const connectDB = require('./db'); 

const MONGO_URI = process.env.MONGO_URI; 
const PORT = process.env.PORT || 5000;

const iniciaApp = async () => {
    
    if (!MONGO_URI) {
        console.error('Error: La variable MONGO_URI no se cargó.');
        process.exit(1);
    }

    await connectDB(MONGO_URI); 

    console.log(`Servidor iniciando en http://localhost:${PORT}`);
};

iniciaApp(); 