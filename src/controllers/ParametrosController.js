const controller = {}
// import model
var Parametros = require('../models/Parametros');

// validation
const Joi = require('@hapi/joi');


const schemaCreate = Joi.object({
    name: Joi.string().required(),
    value: Joi.string().required()    
})

const schemaUpdate = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    value: Joi.string().required()    
})


controller.all = async (req,res) => {

  const response = await Parametros.findAll()
  .then(function(data){
    const res = { success: true, data: data }
    return res;
  })
  .catch(error =>{
    const res = { success: false, error: error }
    return res;
  })

  res.json(response);

};

controller.create = async (req, res) => {
    console.log("CUERPO: ", req.body);
    // validate user
    const { error } = schemaCreate.validate(req.body)

    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }
  
    // Create a User
    const body = {
        name: req.body.name,
        value: req.body.value        
    };
    
    // Save User in the database
    await Parametros.create(body)
        .then(data => {
            res.status(200).send({success:true, data:data});
        })
        .catch(err => {
            res.status(500).send({
                success:false,
                message:
                err.message || "Hubo un error al guardar el vendedor."
            });
        });
};

controller.update = async (req, res) => {

    console.log("CUERPO: ", req.body);
    // validate user
    const { error } = schemaUpdate.validate(req.body)

    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }
  
    // Create a User
    const body = {
        name: req.body.name,
        value: req.body.value        
    };
    
    // Save User in the database
    await Parametros.create(body, {where: {id: req.body.id }})
        .then(data => {
            res.status(200).send({success:true, data:data});
        })
        .catch(err => {
            res.status(500).send({
                success:false,
                message:
                err.message || "Hubo un error al guardar el vendedor."
            });
        });
}

controller.selectById = async (req, res) => {   

    await Parametros.findOne({where: { id: req.body.id }}).then((data)=>{

        res.status(200).send({
            success: true, data: data
        })

    }).catch(err => {

        res.status(400).send({success: false, message: err})

    })
    
}

controller.destroy = async (req, res) => {   

    await Parametros.destroy({where: { id: req.body.id }}).then((data)=>{

        res.status(200).send({
            success: true, data: data
        })

    }).catch(err => {

        res.status(400).send({success: false, message: err})

    })
    
}



module.exports = controller;