import fieldModel from "../models/fields.model";

//GET


//GET by ID

//POST
const createField = async (req, res) => {
    try {
        const newField = new fieldModel(req.body);
        //data validation is missing
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