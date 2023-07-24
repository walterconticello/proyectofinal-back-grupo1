import fieldModel from "../models/fields.model";
import validation from "../helpers/fields.validation";

//GET
const getAllFields = async (req, res) => {
    try {
        const allFields = await fieldModel.find();
        res.status(200).json(allFields);
    }
    catch(error) {
        console.log(error);
    }
}

//GET by ID
const getFieldByID = async (req, res) => {
    try {
        const field = await fieldModel.findById(req.params.id);
        if(field) {
            res.status(200).json(field);
        }
        else {
            res.status(404).json("Field Not Found");
        }
    }
    catch(error) {
        console.log(error);
    }
}

//POST
const createField = async (req, res) => {
    try {
        const bodyfield = {
            name: req.body.name,
            openHour: req.body.openHour,
            closeHour: req.body.closeHour,
            pricePerHour: req.body.pricePerHour,
        }
        if(!validation.createFieldDataValidation(bodyfield)){
            res.status(400).json("Some data is missing");
        }

        if(validation.nameValidation(bodyfield.name) && validation.hourValidation(bodyfield.openHour) && validation.hourValidation(bodyfield.closeHour) && validation.priceValidation(bodyfield.pricePerHour)){
            const newField = new fieldModel(bodyfield);
            await newField.save();
            res.status(201).json(newField);
        }
        else {
            res.status(400).json("The written data is invalid");
        }
    }
    catch(error) {
        console.log(error);
    }
}

//PUT
const updateField = async (req, res) => {
    try {
        const field = await fieldModel.findById(req.params.id);
        if(field) {
            if(req.body.name) field.name = req.body.name;
            if(req.body.openHour) field.openHour = req.body.openHour;
            if(req.body.closeHour) field.closeHour = req.body.closeHour;
            if(req.body.pricePerHour) field.pricePerHour = req.body.pricePerHour;
            
            if(validation.nameValidation(field.name) && validation.hourValidation(field.openHour) && validation.hourValidation(field.closeHour) && validation.priceValidation(field.pricePerHour)){
                await field.save();
                res.status(200).json(field);
            }
            else {
                res.status(400).json("The written data is invalid");
            }
        }
        else {
            res.status(404).json("Field Not Found");
        }
    }
    catch(error) {
        console.log(error);
    }
}

//DELETE
const deleteField = async (req, res) => {
    try {
        const deletedField = await fieldModel.findOneAndDelete({_id: {$eq: req.params.id}}); //$eq: req.params.id means that the id from params must be equa to the field's id
        if(deletedField) {
            res.status(200).json({message: "The Field has been Deleted", field: deletedField});
        }
        else {
            res.status(404).send("Field Not Found");
        }
    }
    catch(error) {
        console.log(error);
    }
}

export default {createField, getAllFields, getFieldByID, updateField, deleteField};