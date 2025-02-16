const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'ChronoCanvas API',
    description: 'API Documentation for ChronoCanvas'
  },
  host: 'chronocanvas-api.onrender.com', // Ajusta esto según tu puerto
  schemes: ['https']
};

//const outputFile = './swagger-output.json';
const outputFile = './swagger.json';
const endpointsFiles = ['./server.js']; // Ajusta esto a tu archivo principal

swaggerAutogen(outputFile, endpointsFiles, doc);