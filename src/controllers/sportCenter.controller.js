import sportCenterModel from "../models/sportCenter.model.js";
import validation from "../helpers/sportCenter.validation.js";
import fieldsModel from "../models/fields.model.js";
import { uploadSportCenterImage, deleteImage } from "../utils/cloudinary.js";
import fs from "fs-extra";
import { createError } from "../utils/error.js";

//Get

const getAllSportCenters = async (req, res) => {
  try {
    const sportCenters = await sportCenterModel.find();
    const responseSportCenter = [];
    for (let i = 0; i < sportCenters.length; i++) {
      const fields = await fieldsModel.find({
        idSportCenter: sportCenters[i]._id,
      });
      const response = {
        ...sportCenters[i]._doc,
        fields,
      };
      responseSportCenter.push(response);
    }
    res.status(200).json(responseSportCenter);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message });
  }
};

//Get by id

const getSportCenterById = async (req, res, next) => {
  try {
    const sportCenter = await sportCenterModel.findById(req.params.id);
    if(sportCenter){
      const fields = await fieldsModel.find({ idSportCenter: sportCenter._id });
      res.status(200).json({
        ...sportCenter._doc,
        fields,
      });
    }
    else{
      return next(createError(404, "Centro deportivo no encontrado"));
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Post

const postSportCenter = async (req, res, next) => {
  try {
    const bodySportCenter = {
      ownerId: req.user.id,
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      description: req.body.description,
      services: {

      },
      social: {

      },
      location: {

      }
    };
    if(req.body.services.bar) bodySportCenter.services.bar = req.body.services.bar;
    if(req.body.services.showers) bodySportCenter.services.showers = req.body.services.showers;
    if(req.body.services.grill) bodySportCenter.services.grill = req.body.services.grill;
    if(req.body.services.parking) bodySportCenter.services.parking = req.body.services.parking;
    if(req.body.services.dressingRoom) bodySportCenter.services.dressingRoom = req.body.services.dressingRoom;

    if(req.body.social.facebook) bodySportCenter.social.facebook = req.body.social.facebook;
    if(req.body.social.instagram) bodySportCenter.social.instagram = req.body.social.instagram;
    
    if(req.body.location.latitude) bodySportCenter.location.latitude = req.body.location.latitude;
    if(req.body.location.longitude) bodySportCenter.location.longitude = req.body.location.longitude;

    if (
      validation.nameValidation(bodySportCenter.name) &&
      validation.addressValidation(bodySportCenter.address) &&
      validation.phoneValidation(bodySportCenter.phone) &&
      validation.descriptionValidation(bodySportCenter.description) &&
      (bodySportCenter.social.facebook && validation.facebookValidation(bodySportCenter.social.facebook)) &&
      (bodySportCenter.social.instagram && validation.instagramValidation(bodySportCenter.social.instagram)) &&
      (bodySportCenter.location.latitude && validation.latitudeValidation(bodySportCenter.location.latitude)) &&
      (bodySportCenter.location.longitude && validation.longitudeValidation(bodySportCenter.location.longitude))
    ) {
      const photo = {
        url: "",
        public_id: "",
      };
      if (req.files && req.files.image) {
        const result = await uploadSportCenterImage(
          req.files.image.tempFilePath
        );
        photo.url = result.secure_url;
        photo.public_id = result.public_id;
      }
      const newSportCenter = new sportCenterModel({
        ...bodySportCenter,
        photo,
      });
      await newSportCenter.save();
      fs.remove(req.files.image.tempFilePath);
      res.status(201).json(newSportCenter);
    } else {
      return next(createError(400, "Los datos ingresados no son válidos"));
    }
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

/// Put SportCenter

const putSportCenter = async (req, res, next) => {
  try {
    const sportCenterId = req.params.id;
    const sportCenter = await sportCenterModel.findById(sportCenterId);
    if(sportCenter){
      if(sportCenter.ownerId == req.user.id || req.user.isAdmin){
        if(req.body.name) sportCenter.name = req.body.name;
        if(req.body.address) sportCenter.address = req.body.address;
        if(req.body.phone) sportCenter.phone = req.body.phone;
        if(req.body.description) sportCenter.description = req.body.description;
        sportCenter.isActive = req.body.isActive; //Front has to send those via checkboxes
        sportCenter.services.bar = req.body.services.bar;
        sportCenter.services.showers = req.body.services.showers;
        sportCenter.services.grill = req.body.services.grill;
        sportCenter.services.parking = req.body.services.parking;
        sportCenter.services.dressingRoom = req.body.services.dressingRoom;
        if(req.body.social.facebook) sportCenter.social.facebook = req.body.social.facebook;
        if(req.body.social.instagram) sportCenter.social.instagram = req.body.social.instagram;
        if(req.body.location.latitude) sportCenter.location.latitude = req.body.location.latitude;
        if(req.body.location.longitude) sportCenter.location.longitude = req.body.location.longitude;

        if(
          validation.nameValidation(req.body.name) &&
          validation.addressValidation(req.body.address) &&
          validation.phoneValidation(req.body.phone) &&
          validation.descriptionValidation(req.body.description) &&
          validation.facebookValidation(req.body.social.facebook) &&
          validation.instagramValidation(req.body.social.instagram) &&
          validation.latitudeValidation(req.body.location.latitude) &&
          validation.longitudeValidation(req.body.location.longitude) &&
          typeof req.body.isActive === "boolean" &&
          typeof req.body.services.bar === "boolean" &&
          typeof req.body.services.showers === "boolean" &&
          typeof req.body.services.grill === "boolean" &&
          typeof req.body.services.parking === "boolean" &&
          typeof req.body.services.dressingRoom === "boolean"
        ){
          if(req.files && req.files.image){
            const result = await uploadSportCenterImage(req.files.image.tempFilePath);

            if (sportCenter.photo.public_id) {
              await deleteImage(sportCenter.photo.public_id);
            }

            sportCenter.photo.url = result.secure_url;
            sportCenter.photo.public_id = result.public_id;

            fs.remove(req.files.image.tempFilePath);
          }
          await sportCenter.save();
          res.status(200).json(sportCenter);
        } else{
          return next(createError(400, "Información inválida"));
        }
      } else{
        return next(
          createError(
            400,
            "No está autorizado a modificar  este complejo"
          )
        );
      }
    } else{
      return next(createError(404, "Complejo deportivo no encontrado"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al actualizar centro deportivo" });
  }
};

// Delete SportCenter

const deleteSportCenter = async (req, res) => {
  try {
    const sportCenterId = req.params.id;

    if (await validation.validateSportCenter(sportCenterId)) {
      const sportCenter = await sportCenterModel.findById(sportCenterId);
      if (req.user.id == sportCenter.ownerId || req.user.isAdmin) {
        if (sportCenter.photo.public_id) {
          await deleteImage(sportCenter.photo.public_id);
        }
        await sportCenterModel.findByIdAndDelete(sportCenterId);
        res.json({ mensaje: "Centro deportivo eliminado con éxito" });
      } else {
        return res.status(403).json({
          mensaje: "No tienes permiso para eliminar este centro deportivo",
        });
      }
    } else {
      return res
        .status(404)
        .json({ mensaje: "No se encontró el centro deportivo" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al eliminar centro deportivo" });
  }
};

export default {
  getAllSportCenters,
  getSportCenterById,
  postSportCenter,
  putSportCenter,
  deleteSportCenter,
};
