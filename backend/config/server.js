require('dotenv').config({ path: '../.env' }); 

const express = require('express');
const cors = require('cors');

const connectDB = require('./db'); 

const app = express();
app.use(cors()); 
app.use(express.json()); 

const mongoUri = process.env.MONGO_URI; 
const PORT = process.env.PORT || 5000;

if (!mongoUri) {
    console.error('Error: La variable MONGO_URI no se cargó.');
    process.exit(1);
}

connectDB(mongoUri);

app.use('/api/games', require('../rutas/games'));
app.use('/api/reviews', require('../rutas/reviews'));

app.get('/', (req, res) => {
    res.send('<h1>Servidor Express Funcionando!</h1><p>Conexión a MongoDB establecida. API lista.</p>');
});

app.listen(PORT, () => console.log(` Servidor Express escuchando en http://localhost:${PORT}`));