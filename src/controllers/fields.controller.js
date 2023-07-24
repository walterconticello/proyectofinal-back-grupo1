import fieldModel from "../models/fields.model";

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
        //data validation is missing
        const newField = new fieldModel(bodyfield);
        await newField.save();
        res.status(201).json(newField);
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
            await field.save();
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

//DELETE

export default {createField, getAllFields, getFieldByID, updateField};