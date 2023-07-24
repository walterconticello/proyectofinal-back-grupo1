import fieldModel from "../models/fields.model";

//GET


//GET by ID

//POST
const createField = async (req, res) => {
    try {
        // const newField = new fieldModel(req.body);
        //data validation is missing
        // await newField.save();
        const bodyfield = {
            idField: ,
            name: req.body.name,
            openHour: req.body.openHour,
            closeHour: req.body.closeHour,
            pricePerHour: req.body.pricePerHour,
            idSportCenter: 
        }
        res.status(201).json(req.body.name);
    }
    catch(error){
        console.log(error);
    }
}

//PUT

//DELETE

export default {createField};