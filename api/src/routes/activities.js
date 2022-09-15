const { Router } = require('express');
const axios = require("axios");
const router = Router();
const { Country, Activities } = require('../db');

router.post('/', async (req, res) =>{
  const { name, nombre, dificultad, duracion, temporada} = req.body;
  if( !name || !nombre || !dificultad || !duracion || !temporada){
      res.status(404).send("No se recibieron los parametros necesarios");
  }
  try{
    const activity = await Activities.findOrCreate({
      where:{
        nombre: nombre
      },
      defaults: req.body
    })
    let arr = []
    for(let i = 0; i < name.length; i++){
      const country = await Country.findOne({where:{ name: name[i]}});
      arr.push(country);
    }
    activity[0].addCountries(arr);
    
    res.json('arr')
  }catch(e){
    console.log(e)
  }
})

module.exports = router;