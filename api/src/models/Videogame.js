const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_raw: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    parent_platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://media.gq-magazine.co.uk/photos/645b5c3c8223a5c3801b8b26/16:9/w_2560%2Cc_limit/100-best-games-hp-b.jpg"
    },
    released: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    createdDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    timestamps: false
  });
};
