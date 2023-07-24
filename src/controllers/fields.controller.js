import fieldModel from "../models/fields.model";

//GET


//GET by ID

//POST
const createField = async (req, res) => {
    try {
        const bodyfield = {
            name: req.body.name,
            openHour: req.body.openHour,
            closeHour: req.body.closeHour,
            pricePerHour: req.body.pricePerHour,
        }
        //data validation is missing
        const newField = new fieldModel(bodyfield);
        await newField.save();
        res.status(201).json(newField);
    }
    catch(error){
        console.log(error);
    }
}

//PUT

//DELETE

export default {createField};