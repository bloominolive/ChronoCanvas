/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

let database;
let client;

const initDb = async (callback) => {
    if (database) {
        console.warn('DB is already initialized!');
        return callback(null, database);
    }

    try {
        client = await MongoClient.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout de 5 segundos para la selección del servidor
            connectTimeoutMS: 10000,        // Timeout de 10 segundos para la conexión
            maxPoolSize: 10,                // Máximo de 10 conexiones en el pool
            socketTimeoutMS: 45000          // Timeout de 45 segundos para operaciones
        });

        database = client.db('Chrono_Canvas'); // Especificamos explícitamente el nombre de la base de datos

        // Verificar la conexión
        await database.command({ ping: 1 });
        console.log("✅ MongoDB connected successfully to Chrono_Canvas database");
        
        // Establecer eventos de monitoreo
        client.on('close', () => {
            console.warn('MongoDB connection closed');
            database = null;
        });

        client.on('error', (error) => {
            console.error('MongoDB connection error:', error);
            database = null;
        });

        callback(null, database);
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err);
        callback(err);
    }
};

const getDatabase = () => {
    if (!database) {
        throw new Error('❌ Database is not initialized');
    }
    return database;
};

// Función para cerrar la conexión de manera limpia
const closeConnection = async () => {
    if (client) {
        try {
            await client.close();
            database = null;
            console.log('MongoDB connection closed successfully');
        } catch (error) {
            console.error('Error closing MongoDB connection:', error);
        }
    }
};

// Manejar el cierre de la aplicación
process.on('SIGINT', async () => {
    await closeConnection();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await closeConnection();
    process.exit(0);
});

module.exports = { 
    initDb, 
    getDatabase,
    closeConnection 
};