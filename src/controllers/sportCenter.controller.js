import sportCenterModel from "../models/sportCenter.model.js";
import validation from "../helpers/sportCenter.validation.js";
import fieldsModel from "../models/fields.model.js";
import { uploadSportCenterImage, deleteImage } from "../utils/cloudinary.js";
import fs from "fs-extra";
import { createError } from "../utils/error.js";
import fieldModel from "../models/fields.model.js";

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
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//Get by id

const getSportCenterById = async (req, res, next) => {
  try {
    const sportCenter = await sportCenterModel.findById(req.params.id);
    if (sportCenter) {
      const fields = await fieldsModel.find({ idSportCenter: sportCenter._id });
      res.status(200).json({
        ...sportCenter._doc,
        fields,
      });
    } else {
      return next(createError(404, "Centro deportivo no encontrado"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//GetSportCenterOwner

const getSportCenterOwner = async (req, res, next) => {
  try {
    const sportCenter = await sportCenterModel.find({ ownerId: req.params.id });
    if (sportCenter) {
      res.status(200).json(sportCenter);
    } else {
      return next(createError(404, "Centro deportivo no encontrado"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//Post

const postSportCenter = async (req, res, next) => {
  try {
    const bodySportCenter = {
      ownerId: req.body.ownerId,
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      // description: req.body.description,
      services: {},
      social: {},
      location: {},
    };
    if (req.body.services) {
      if (req.body.services.bar)
        bodySportCenter.services.bar = req.body.services.bar;
      if (req.body.services.showers)
        bodySportCenter.services.showers = req.body.services.showers;
      if (req.body.services.grill)
        bodySportCenter.services.grill = req.body.services.grill;
      if (req.body.services.parking)
        bodySportCenter.services.parking = req.body.services.parking;
      if (req.body.services.dressingRoom)
        bodySportCenter.services.dressingRoom = req.body.services.dressingRoom;
    }
    if (req.body.social) {
      if (req.body.social.facebook)
        bodySportCenter.social.facebook = req.body.social.facebook;
      if (req.body.social.instagram)
        bodySportCenter.social.instagram = req.body.social.instagram;
    }
    if (req.body.location) {
      if (req.body.location.latitude)
        bodySportCenter.location.latitude = req.body.location.latitude;
      if (req.body.location.longitude)
        bodySportCenter.location.longitude = req.body.location.longitude;
    }

    if (
      validation.nameValidation(bodySportCenter.name) &&
      validation.addressValidation(bodySportCenter.address) &&
      validation.phoneValidation(bodySportCenter.phone) &&
      (bodySportCenter.social.facebook
        ? validation.facebookValidation(bodySportCenter.social.facebook)
        : true) &&
      (bodySportCenter.social.instagram
        ? validation.instagramValidation(bodySportCenter.social.instagram)
        : true) &&
      (bodySportCenter.location.latitude
        ? validation.latitudeValidation(bodySportCenter.location.latitude)
        : true) &&
      (true || bodySportCenter.location.longitude
        ? validation.longitudeValidation(bodySportCenter.location.longitude)
        : true)
    ) {

      const photo = {
        url: "",
        public_id: "",
      };
      if (req.files && req.files.photo) {
        const result = await uploadSportCenterImage(
          req.files.photo.tempFilePath
        );
        photo.url = result.secure_url;
        photo.public_id = result.public_id;
        fs.remove(req.files.photo.tempFilePath);
      }
      const newSportCenter = new sportCenterModel({
        ...bodySportCenter,
        photo,
      });
      await newSportCenter.save();
      res.status(201).json(newSportCenter);
    } else {
      return next(createError(400, "Los datos ingresados no son válidos"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: error.message });
  }
};

/// Put SportCenter

const putSportCenter = async (req, res, next) => {
  try {
    const sportCenterId = req.params.id;
    const sportCenter = await sportCenterModel.findById(sportCenterId);
    if (sportCenter) {
      if (sportCenter.ownerId == req.user.id || req.user.isAdmin) {
        if (req.body.name) sportCenter.name = req.body.name;
        if (req.body.address) sportCenter.address = req.body.address;
        if (req.body.phone) sportCenter.phone = req.body.phone;
        if (typeof req.body.isActive === "boolean")
          sportCenter.isActive = req.body.isActive; //Front has to send all those via checkboxes
        if (req.body.services && typeof req.body.services.bar === "boolean")
          sportCenter.services.bar = req.body.services.bar;
        if (req.body.services && typeof req.body.services.showers === "boolean")
          sportCenter.services.showers = req.body.services.showers;
        if (req.body.services && typeof req.body.services.grill === "boolean")
          sportCenter.services.grill = req.body.services.grill;
        if (req.body.services && typeof req.body.services.parking === "boolean")
          sportCenter.services.parking = req.body.services.parking;
        if (
          req.body.services &&
          typeof req.body.services.dressingRoom === "boolean"
        )
          sportCenter.services.dressingRoom = req.body.services.dressingRoom;
        if (req.body.social && req.body.social.facebook)
          sportCenter.social.facebook = req.body.social.facebook;
        if (req.body.social && req.body.social.instagram)
          sportCenter.social.instagram = req.body.social.instagram;
        if (req.body.social && req.body.location.latitude)
          sportCenter.location.latitude = req.body.location.latitude;
        if (req.body.social && req.body.location.longitude)
          sportCenter.location.longitude = req.body.location.longitude;

        if (
          validation.nameValidation(sportCenter.name) &&
          validation.addressValidation(sportCenter.address) &&
          validation.phoneValidation(sportCenter.phone) &&
          (req.body.social && req.body.social.facebook
            ? validation.facebookValidation(req.body.social.facebook)
            : true) &&
          (req.body.social && req.body.social.instagram
            ? validation.instagramValidation(req.body.social.instagram)
            : true) &&
          (req.body.location && req.body.location.latitude
            ? validation.latitudeValidation(req.body.location.latitude)
            : true) &&
          (req.body.location && req.body.location.longitude
            ? validation.longitudeValidation(req.body.location.longitude)
            : true)
          // typeof sportCenter.isActive === "boolean" &&
          // typeof sportCenter.services.bar === "boolean" &&
          // typeof sportCenter.services.showers === "boolean" &&
          // typeof sportCenter.services.grill === "boolean" &&
          // typeof sportCenter.services.parking === "boolean" &&
          // typeof sportCenter.services.dressingRoom === "boolean"
        ) {
          if (req.files && req.files.image) {
            const result = await uploadSportCenterImage(
              req.files.image.tempFilePath
            );

            if (sportCenter.photo.public_id) {
              await deleteImage(sportCenter.photo.public_id);
            }

            sportCenter.photo.url = result.secure_url;
            sportCenter.photo.public_id = result.public_id;

            fs.remove(req.files.image.tempFilePath);
          }
          await sportCenter.save();
          res.status(200).json(sportCenter);
        } else {
          return next(createError(400, "Información inválida"));
        }
      } else {
        return next(
          createError(400, "No está autorizado a modificar  este complejo")
        );
      }
    } else {
      return next(createError(404, "Complejo deportivo no encontrado"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: error.message });
  }
};

// Delete SportCenter

const deleteSportCenter = async (req, res, next) => {
  try {
    const sportCenterId = req.params.id;
    const sportCenter = await sportCenterModel.findById(sportCenterId);
    if (sportCenter) {
      if (sportCenter.ownerId == req.user.id || req.user.isAdmin) {
        const fields = await fieldModel.find({
          idSportCenter: { $eq: sportCenterId },
        });
        if (fields.length === 0) {
          const deletedSportCenter = await sportCenterModel.findByIdAndDelete(
            sportCenterId
          );
          if (deletedSportCenter) {
            if (
              deletedSportCenter.photo &&
              deletedSportCenter.photo.public_id
            ) {
              await deleteImage(deletedSportCenter.photo.public_id);
            }
            res.status(200).json({
              message: "Complejo eliminado",
              sportCenter: deletedSportCenter,
            });
          }
        } else {
          return next(
            createError(
              400,
              "No puede eliminar el complejo si tiene canchas creadas, eliminelas primero"
            )
          );
        }
      } else {
        return next(
          createError(400, "No está autorizado a eliminar este complejo")
        );
      }
    } else {
      return next(createError(404, "Complejo deportivo no encontrado"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al eliminar centro deportivo" });
  }
};

export default {
  getSportCenterOwner,
  getAllSportCenters,
  getSportCenterById,
  postSportCenter,
  putSportCenter,
  deleteSportCenter,
};
