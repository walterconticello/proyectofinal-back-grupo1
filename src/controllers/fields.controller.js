import fieldModel from "../models/fields.model.js";
import validation from "../helpers/fields.validation.js";
import { uploadFieldImage, deleteImage } from "../utils/cloudinary.js";
import fs from "fs-extra";
import sportCenterModel from "../models/sportCenter.model.js";
import { createError } from "../utils/error.js";
import mongoose from "mongoose";
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

const getOwnerFields = async (req , res ) =>{
  try{
    const sportCenter = await sportCenterModel.find({ ownerId: req.user.id })
    if(sportCenter.length > 0 && req.user.isOwner == true){
      const sportCenters = sportCenter.map((center) => center._id)
      let fields = [];
      for(const id of sportCenters ){
        const field = await fieldModel.find({idSportCenter : id})
        fields = fields.concat(field);
      }
      console.log(fields);
      if (fields.length > 0) {
        return res.status(200).json(fields);
      }
      console.log(fields);
      res.status(404).json("no tiene sport Center");
    }
  }catch (error){
    console.log(error);
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
}
//Get filds by ID sportCenter

const getFieldBySportCenter = async (req, res ) =>{
  try {
    const field = await fieldModel.find({idSportCenter : req.params.id});
    if(field.length > 0 && req.user.isOwner == true){
      return res.status(200).json(field);
    }else{
      res.status(404).json("no tiene fields");
    }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//GET by ID
const getFieldByID = async (req, res, next) => {
  try {
    const field = await fieldModel.findById(req.params.id);
    if (field) {
      res.status(200).json(field);
    } else {
      return next(createError(404, "Cancha no encontrada"));
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
    const pagedFields = await fieldModel
      .find()
      .limit(10)
      .skip(10 * (page - 1));
    res.status(200).json(pagedFields);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//POST
const createField = async (req, res, next) => {
  //Only for the owner of the sportCenter, validate that
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

    if (await validation.validateSportCenter(req.body.idSportCenter)) {
      const sportCenter = await sportCenterModel.findById(
        bodyfield.idSportCenter
      );
      if (req.user.id == sportCenter.ownerId || req.user.isAdmin) {
        if (!validation.createFieldDataValidation(bodyfield)) {
          return next(createError(400, "Falta ingresar información"));
        } else if (
          validation.nameValidation(bodyfield.name) &&
          validation.hourValidation(bodyfield.openHour, bodyfield.closeHour) &&
          validation.priceValidation(bodyfield.pricePerHour) &&
          validation.sizeValidation(bodyfield.size) &&
          (await validation.validateSportCenter(bodyfield.idSportCenter))
        ) {
          const photo = {
            url: "",
            public_id: "",
          };
          if (req.files && req.files.image) {
            console.log(req.files.image);
            const result = await uploadFieldImage(req.files.image.tempFilePath);
            photo.url = result.secure_url;
            photo.public_id = result.public_id;
            fs.remove(req.files.image.tempFilePath);
          }
          const newField = new fieldModel({ ...bodyfield, photo });
          await newField.save();
          res.status(201).json(newField);
        } else {
          return next(createError(404, "Informacion no válida"));
        }
      } else {
        return next(
          createError(
            400,
            "No esta autorizado a crear canchas en este complejo"
          )
        );
      }
    } else {
      return next(createError(400, "Complejo no válido"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//PUT
const updateField = async (req, res, next) => {
  //For activate or deactivate a field, update that
  //Only for the owner of the sportCenter, validate that
  try {
    const field = await fieldModel.findById(req.params.id);
    if (field) {
      const sportCenter = await sportCenterModel.findById(field.idSportCenter);
      if (sportCenter.ownerId == req.user.id || req.user.isAdmin) {
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
          if (req.files && req.files.image) {
            const result = await uploadFieldImage(req.files.image.tempFilePath);

            if (field.photo.public_id) {
              await deleteImage(field.photo.public_id);
            }

            field.photo.url = result.secure_url;
            field.photo.public_id = result.public_id;
            fs.remove(req.files.image.tempFilePath);
          }
          await field.save();
          res.status(200).json(field);
        } else {
          return next(createError(400, "Información inválida"));
        }
      } else {
        return next(
          createError(
            400,
            "No está autorizado a modificar canchas en este complejo"
          )
        );
      }
    } else {
      return next(createError(404, "Cancha no encontrada"));
    }
  } catch (error) {
    console.log(error);
    console.log(error.message);
    // res.status(500).json({ message: error.message });
  }
};

// Put State 

const putState = async (req,res,next) =>{
  try {
    console.log(req.params);
    const field = await fieldModel.findById(req.params.id);
    if(field){
      field.isActive = !field.isActive;
      await field.save();
      return res.status(200).json({ message: 'Estado actualizado correctamente', isActive: field.isActive });
    }

    
  } catch (error) {
    
  }
}


//DELETE
const deleteField = async (req, res, next) => {
  //Only for the owner of the sportCenter, validate that
  try {
    const field = await fieldModel.findById(req.params.id);
    if (field) {
      const sportCenter = await sportCenterModel.findById(field.idSportCenter);
      if (sportCenter.ownerId == req.user.id || req.user.isAdmin) {
        const deletedField = await fieldModel.findOneAndDelete({
          _id: { $eq: req.params.id },
        }); //$eq: req.params.id means that the id from params must be equa to the field's id
        if (deletedField) {
          if (deletedField.photo && deletedField.photo.public_id) {
            await deleteImage(deletedField.photo.public_id);
          }
          res.status(200).json({
            message: "La cancha fue eliminada",
            field: deletedField,
          });
        } else {
          return next(createError(404, "Cancha no encontrada"));
        }
      } else {
        return next(
          createError(
            400,
            "No está autorizado a eliminar canchas en este complejo"
          )
        );
      }
    } else {
      return next(createError(404, "Cancha no encontrada"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default {
  createField,
  getOwnerFields,
  getFieldBySportCenter,
  putState,
  getAllFields,
  getFieldByID,
  updateField,
  deleteField,
  getPage,
};
