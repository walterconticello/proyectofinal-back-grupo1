import sportCenterModel from "../models/sportCenter.model.js";
import validation from "../helpers/sportCenter.validation.js";
import fieldsModel from "../models/fields.model.js";

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
    const { name, address, phone, services, location, social, photo } =
      req.body;

    const ownerId = req.user.ownerId;
    const isAdmin = req.user.isAdmin;

    const sportCenterData = {
      ownerId,
      name,
      address,
      phone,
    };

    if (
      validation.nameValidation(sportCenterData.name) &&
      validation.addressValidation(sportCenterData.address) &&
      validation.phoneValidation(sportCenterData.phone)
      // validation.locationValidation(sportCenterData.location) &&
      // validation.socialValidation(sportCenterData.social) &&
      // validation.photoValidation(sportCenterData.photo)
    ) {
      if (isAdmin) {
        const sportCenter = new sportCenterModel(sportCenterData);
        await sportCenter.save();
        return res
          .status(201)
          .json({ mensaje: "Centro deportivo creado con éxito" });
      } else {
        const sportCenter = await sportCenterModel.findOne({
          _id: sportCenterData.ownerId,
        });
        if (!sportCenter) {
          return res
            .status(404)
            .json({ mensaje: "No se encontró el centro deportivo" });
        }
        if (sportCenter.ownerId !== ownerId) {
          return res
            .status(403)
            .json({ mensaje: "No tienes permiso para crear este centro deportivo" });
        }
        const newSportCenter = new sportCenterModel(sportCenterData);
        await newSportCenter.save();
        return res
          .status(201)
          .json({ mensaje: "Centro deportivo creado con éxito" });
      }
    } else {
      res.status(400).json({ mensaje: "Error en los datos ingresados" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al crear centro deportivo" });
  }
};

//Put SportCenter

const putSportCenter = async (req, res) => {
  try {
    const { name, address, phone, services, location, social, photo } =
      req.body;

    const sportCenterData = {
      name,
      address,
      phone,
    };
    const sportCenter = await sportCenterModel.findById(req.params.id);

    if (!sportCenter) {
      return res
        .status(404)
        .json({ message: "Centro deportivo no encontrado" });
    }

    const ownerId = req.user.ownerId;
    const isAdmin = req.user.isAdmin;

    if (!isAdmin && sportCenter.ownerId !== ownerId) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para actualizar este centro deportivo" });
    }

    sportCenter.set(sportCenterData);

    if (
      validation.nameValidation(sportCenterData.name) &&
      validation.addressValidation(sportCenterData.address) &&
      validation.phoneValidation(sportCenterData.phone)
      // validation.locationValidation(sportCenterData.location) &&
      // validation.socialValidation(sportCenterData.social) &&
      // validation.photoValidation(sportCenterData.photo) &&
      // validationResult
    ) {
      await sportCenter.save();
      res.json({ mensaje: "Centro deportivo actualizado con éxito" });
    } else {
      res.status(400).json({ mensaje: "Error en los datos ingresados" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al actualizar centro deportivo" });
  }
};

//Delete

const deleteSportCenter = async (req, res) => {
  try {
    const sportCenter = await sportCenterModel.findById(req.params.id);
    if (!sportCenter) {
      return res.status(404).json({ message: "Centro deportivo no encontrado" });
    }

    const ownerId = req.user.ownerId;
    const isAdmin = req.user.isAdmin;

    if (!isAdmin && sportCenter.ownerId !== ownerId) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para eliminar este centro deportivo" });
    }

    const deleteSportCenter = await sportCenterModel.findByIdAndDelete(
      req.params.id
    );
    res.json({ mensaje: "Centro deportivo eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar centro deportivo" });
  }
};

export default {
  getAllSportCenters,
  getSportCenterById,
  postSportCenter,
  putSportCenter,
  deleteSportCenter,
};
