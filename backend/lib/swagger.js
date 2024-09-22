const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'E-Commerce API',
        version: '1.0.0',
        description: 'API documentation for the E-Commerce application',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
      ],
    },
    apis: ['./routes/*.js'], // Path to the API docs
  };
  
  const swaggerDocs = swaggerJsdoc(swaggerOptions);

  module.exports = {
    swaggerUi,
    swaggerDocs
  };