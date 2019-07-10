module.exports = (sequelize, Type) => {
    return sequelize.define('User', {
       
        id: {
          type: Type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },

        username:{
            type:Type.STRING,
            allowNull:false,
            unique:true
        },

        firstname:{
            type:Type.STRING,
            set(val) {
            this.setDataValue('firstname', val.toLowerCase())
        }
        },

        lastname:{
            type:Type.STRING,
            set(val) {
            this.setDataValue('lastname', val.toLowerCase())
        }
        },

        gender:{
            type:Type.STRING,
            set(val) {
            this.setDataValue('gender', val.toLowerCase())
        }
        },
        age:{
            type:Type.INTEGER
        },
        email:{
            type:Type.STRING,
            unique:true,
            validate: {
                isEmail:true
            }
        },

        password:{
            type:Type.STRING,
            allowNull:false,
            validate:{
                len:{
                    args:[8,64],
                    msg:"Please Enter Password more than 8 character and less than 64 character"
                }
            }
        },
        createdAt: Type.DATE,
        updatedAt: Type.DATE,
    },
    
    {
      freezeTableName: true,
    })
}

