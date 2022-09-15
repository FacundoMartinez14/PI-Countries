const { Router } = require('express');
const axios = require("axios");
const router = Router();
const { Op, Country, Activities } = require('../db');



router.get('/', async (req, res) =>{
    const {name} = req.query;
    if(name) {
        try{
            const countries = await Country.findAll({
                where:{
                    name:{[Op.iLike]: `%${name}%`}
                },
                include: Activities
            })
            res.status(200).json(countries);
        }catch(e){
            console.log(e)
        }
    }else{
        try{
            console.log('entro aca')
            const thecountries = await Country.findAll({
                include: Activities
            });
            if(thecountries.length) res.status(200).json(thecountries);
            else{
                const allCountries = await axios.get(
                    `https://restcountries.com/v3/all`
                );
                console.log('sigo aca')
                const country = allCountries.data.map( info => {
                    const o = {
                    id: info.cca3,
                    name: info.name.common,
                    traduccion: info.translations.spa.common,
                    capital: info.capital || ["No registered capital"],
                    subregion: info.subregion || "No registered subregion",
                    area: info.area,
                    population: info.population,
                    flag: info.flags[1],
                    continent: info.region,
                }
                try{
                        Country.findOrCreate({
                            where:{
                                name: o.name,  
                            },
                            defaults: o,
                        })
                    }catch(e){
                        console.log(e)
                    }
                    return o
                });
                console.log('termino aca')
                res.json(country);
            }
        }catch(e){
            res.json(e);
        }
    }
    
})
router.get("/:id", async (req, res) =>{
    const {id} = req.params;
    try{
        const country = await Country.findByPk(id, { include: Activities})
        res.status(200).json(country);

    }catch(e){
        console.log(e)
    }
})


module.exports = router;