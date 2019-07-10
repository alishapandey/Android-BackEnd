module.exports = (sequelize, Type) => {
    return sequelize.define('medicinetable', {
       
        medicineid: {
          type: Type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },

        medicinename:{
            type:Type.STRING,
            allowNull:false,
        },

        unit:{
            type:Type.STRING,
        },

        frequencyofintake:{
            type:Type.STRING,
        },

        manufacturingdate:{
            type:Type.STRING,
        },
       
        expirydate:{
            type:Type.STRING,
        },
        image:{
            type:Type.STRING
        },
        createdAt: Type.DATE,
        updatedAt: Type.DATE,
    },
    
    {
      freezeTableName: true,
    })
}


    





      


        