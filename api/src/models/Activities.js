const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    sequelize.define('activities', {
        id:{
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        nombre:{
          type: DataTypes.STRING
        },
        dificultad:{
          type: DataTypes.INTEGER
        },
        duracion:{
          type: DataTypes.FLOAT
        },
        temporada:{
          type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera')
        } 
      });
}