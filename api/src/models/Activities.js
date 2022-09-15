const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    sequelize.define('activities', {
        nombre:{
          type: DataTypes.STRING,
        },
        dificultad:{
          type: DataTypes.ENUM('1', '2', '3', '4', '5')
        },
        duracion:{
          type: DataTypes.TEXT
        },
        temporada:{
          type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera')
        },
        
      },{ timestamps: true, createdAt: "creado", updatedAt: false }
      );
};
