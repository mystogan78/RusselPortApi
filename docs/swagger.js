const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Russell Port API',
      version: '1.0.0',
      description: 'Documentation de l’API de gestion de catways et de réservations',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur local',
      },
    ],
  },
  apis: ['./routes/*.js'], // Adapté à l’emplacement de tes routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
