import fieldModel from "../models/fields.model.js";
import validation from "../helpers/fields.validation.js";

//GET
const getAllFields = async (req, res) => { 
  try {
    const allFields = await fieldModel.find();
    res.status(200).json(allFields);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//GET by ID
const getFieldByID = async (req, res) => {
  try {
    const field = await fieldModel.findById(req.params.id);
    if (field) {
      res.status(200).json(field);
    } else {
      res.status(404).json("Field Not Found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//GET by page
const getPage = async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const pagedFields = await fieldModel.find().limit(10).skip(10 * (page - 1));
    res.status(200).json(pagedFields);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

//POST
const createField = async (req, res) => { //Only for the owner of the sportCenter, validate that
  try {
    const bodyfield = {
      name: req.body.name,
      openHour: req.body.openHour,
      closeHour: req.body.closeHour,
      pricePerHour: req.body.pricePerHour,
      size: req.body.size,
      isActive: req.body.isActive,
      idSportCenter: req.body.idSportCenter,
    };
    if (!validation.createFieldDataValidation(bodyfield)) {
      res.status(400).json("Some data is missing");
    } else if (
      validation.nameValidation(bodyfield.name) &&
      validation.hourValidation(bodyfield.openHour, bodyfield.closeHour) &&
      validation.priceValidation(bodyfield.pricePerHour) &&
      validation.sizeValidation(bodyfield.size) &&
      await validation.validateSportCenter(bodyfield.idSportCenter)
    ) {
      const newField = new fieldModel(bodyfield);
      await newField.save();
      res.status(201).json(newField);
    } else {
      res.status(400).json("The written data is invalid");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//PUT
const updateField = async (req, res) => { //For activate or deactivate a field, update that
                                          //Only for the owner of the sportCenter, validate that
  try {
    const field = await fieldModel.findById(req.params.id);
    if (field) {
      if (req.body.name) field.name = req.body.name;
      if (req.body.openHour) field.openHour = req.body.openHour;
      if (req.body.closeHour) field.closeHour = req.body.closeHour;
      if (req.body.pricePerHour) field.pricePerHour = req.body.pricePerHour;
      if (req.body.size) field.size = req.body.size;
      if (req.body.isActive) field.isActive = req.body.isActive;

      if (
        validation.nameValidation(field.name) &&
        validation.hourValidation(field.openHour, field.closeHour) &&
        validation.priceValidation(field.pricePerHour) &&
        validation.sizeValidation(field.size)
      ) {
        await field.save();
        res.status(200).json(field);
      } else {
        res.status(400).json("The written data is invalid");
      }
    } else {
      res.status(404).json("Field Not Found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//DELETE
const deleteField = async (req, res) => { //Only for the owner of the sportCenter, validate that
  try {
    const deletedField = await fieldModel.findOneAndDelete({
      _id: { $eq: req.params.id },
    }); //$eq: req.params.id means that the id from params must be equa to the field's id
    if (deletedField) {
      res
        .status(200)
        .json({ message: "The Field has been Deleted", field: deletedField });
    } else {
      res.status(404).send("Field Not Found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default {
  createField,
  getAllFields,
  getFieldByID,
  updateField,
  deleteField,
  getPage,
};
