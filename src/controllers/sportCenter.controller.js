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

const putSportCenter = async (req, res) => {
  try {
    const sportCenterId = req.params.id;
    const bodySportCenter = {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      //services: req.body.services,
      //location: req.body.location,
      //social: req.body.social,
      //photo: req.body.photo,
    };

    if (await validation.validateSportCenter(sportCenterId)) {
      const sportCenter = await sportCenterModel.findById(sportCenterId);
      if (req.user.id == sportCenter.ownerId || req.user.isAdmin) {
        if (!validation.sportCenterDataValidation(bodySportCenter)) {
          return res
            .status(400)
            .json({ mensaje: "Error en los datos ingresados" });
        } else if (
          validation.nameValidation(bodySportCenter.name) &&
          validation.addressValidation(bodySportCenter.address) &&
          validation.phoneValidation(bodySportCenter.phone)
          //validation.servicesValidation(bodySportCenter.services) &&
          //validation.locationValidation(bodySportCenter.location) &&
          //validation.socialValidation(bodySportCenter.social)
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
            if (sportCenter.photo.public_id) {
              await deleteImage(sportCenter.photo.public_id);
            }
          }
          const updatedSportCenter = {
            ...bodySportCenter,
            photo,
          };
          await sportCenterModel.findByIdAndUpdate(
            sportCenterId,
            updatedSportCenter
          );
          fs.remove(req.files.image.tempFilePath);
          res.json({ mensaje: "Centro deportivo actualizado con éxito" });
        } else {
          return res
            .status(400)
            .json({ mensaje: "Error en los datos ingresados" });
        }
      } else {
        return res.status(403).json({
          mensaje: "No tienes permiso para actualizar este centro deportivo",
        });
      }
    } else {
      return res
        .status(404)
        .json({ mensaje: "No se encontró el centro deportivo" });
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
