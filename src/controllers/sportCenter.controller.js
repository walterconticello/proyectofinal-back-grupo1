import sportCenterModel from "../models/sportCenter.model.js";
import validation from "../helpers/sportCenter.validation.js";
import fieldsModel from "../models/fields.model.js";
import { uploadSportCenterImage, deleteImage } from "../utils/cloudinary.js"
import fs from "fs-extra"


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
    res.json(responseSportCenter);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener los centros deportivos" });
  }
};

//Get by id

const getSportCenterById = async (req, res) => {
  try {
    const sportCenter = await sportCenterModel.findById(req.params.id);
    const fields = await fieldsModel.find({ idSportCenter: sportCenter._id });
    res.json({
      ...sportCenter._doc,
      fields,
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el centro deportivo" });
  }
};

//Post

const postSportCenter = async (req, res) => {
  try { 
    const bodySportCenter = {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      //services: req.body.services,
      //location: req.body.location,
      //social: req.body.social,
      //photo: req.body.photo,
    };

    if(req.user.id==sportCenter.ownerId || req.user.isAdmin){
      if(!validation.sportCenterDataValidation(bodySportCenter)){ 
        return res.status(400).json({ mensaje: "Error en los datos ingresados" });
      }
      else if (
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
          const result = await uploadSportCenterImage(req.files.image.tempFilePath);
          photo.url = result.secure_url;
          photo.public_id = result.public_id;
        }
        const newSportCenter = new sportCenterModel({
          ...bodySportCenter, photo,
        });
        await newSportCenter.save();
        fs.remove(req.files.image.tempFilePath);
        res. json({ mensaje: "Centro deportivo creado con éxito" });
      } else {
        return res.status(400).json({ mensaje: "Error en los datos ingresados" });
      }
    }
    else{
      return res.status(403).json({ mensaje: "No tienes permiso para crear un centro deportivo" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al crear centro deportivo" }); 
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
        if (
          !validation.sportCenterDataValidation(bodySportCenter)
        ) {
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
        return res
          .status(403)
          .json({ mensaje: "No tienes permiso para actualizar este centro deportivo" });
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
        return res
          .status(403)
          .json({ mensaje: "No tienes permiso para eliminar este centro deportivo" });
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
