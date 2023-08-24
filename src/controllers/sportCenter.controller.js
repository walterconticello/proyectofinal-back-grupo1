import sportCenterModel from "../models/sportCenter.model.js";
import validation from "../helpers/sportCenter.validation.js";
//Get

const getAllSportCenters = async (req, res) => {
  try {
    const sportCenters = await sportCenterModel.find();
    res.json(sportCenters);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los centros deportivos" });
  }
};

//Get by id

const getSportCenterById = async (req, res) => {
  try {
    const sportCenter = await sportCenterModel.findById(req.params.id);
    res.json(sportCenter);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el centro deportivo" });
  }
};

//Post

const postSportCenter = async (req, res) => {
  try {
    const { ownerId, name, address, phone, fields, closeHour , openHour} = req.body;

    const sportCenterData = {
      ownerId,
      name,
      address,
      phone,
      fields,
      closeHour,
      openHour,
    };

    const sportCenter = new sportCenterModel(sportCenterData);
    await sportCenter.save();
    return res.status(201).json({ mensaje: "Centro deportivo creado con éxito" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al crear centro deportivo" });
  }
};

//Put

const putSportCenter = async (req, res) => {
  try {
    const { ownerId, name, address, phone, fields, closeHour , openHour} = req.body;

    const sportCenterData = {
      ownerId,
      name,
      address,
      phone,
      fields,
      closeHour,
      openHour,
    };

    const sportCenter = await sportCenterModel.findById(req.params.id);

    if (!sportCenter) {
      return res.status(404).json({ message: "Centro deportivo no encontrado" });
    }

    if (ownerId) {
      sportCenter.ownerId = ownerId;
    }
    if (name) {
      sportCenter.name = name;
    }
    if (address) {
      sportCenter.address = address;
    }
    if (phone) {
      sportCenter.phone = phone;
    }
    if (fields) {
      sportCenter.fields = fields;
    }
    if (closeHour) {
      sportCenter.closeHour = closeHour;
    }
    if (openHour) {
      sportCenter.openHour = openHour;
    }

    if (
      validation.ownerIdValidation(sportCenter.ownerId) &&
      validation.nameValidation(sportCenter.name) &&
      validation.addressValidation(sportCenter.address) &&
      validation.phoneValidation(sportCenter.phone) &&
      validation.fieldsValidation(sportCenter.fields) &&
      validation.closeHourValidation(sportCenter.closeHour) &&
      validation.openHourValidation(sportCenter.openHour)
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
    const deleteSportCenter = await sportCenterModel.findByIdAndDelete(req.params.id);
    if (deleteSportCenter) {
      res.json({ mensaje: "Centro deportivo eliminado con éxito" });
    } else {
      res.status(404).json({ mensaje: "Centro deportivo no encontrado" });
    }
  } catch (error) {
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