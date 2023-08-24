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
    console.log("1")
    const bodySportCenter = {
      ownerId: req.body.ownerId,
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      services: {
        bar: req.body.services.bar,
        showers: req.body.services.showers,
        grill: req.body.services.grill,
        parking: req.body.services.parking,
      },
      fields: req.body.fields,
      openHour: req.body.openHour,
      closeHour: req.body.closeHour,
      social: {
        facebook: req.body.social.facebook,
        instagram: req.body.social.instagram,
      },
      latitude: req.body.latitude,
      location: req.body.location,
      photo: req.body.photo
    };
    console.log("2")
    if (!validation.postSportCenterDataValidation(bodySportCenter)) {
      return res.status(400).json({ mensaje: "Error en los datos ingresados" });
    } else if (
      validation.nameValidation(bodySportCenter.name) &&
      validation.addressValidation(bodySportCenter.address) &&
      validation.phoneValidation(bodySportCenter.phone)
    ) {
      console.log("3")
      const sportCenter = new sportCenterModel(bodySportCenter);
      console.log("4")
      await sportCenter.save();
      console.log("5")
      res.json({ sportCenter: "Centro deportivo agregado con éxito" });
    } else {
      res.status(400).json({ mensaje: "Error en los datos ingresados" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error al agregar centro deportivo" });
  }
};

//Put

const putSportCenter = async (req, res) => {
  try {
    const sportCenter = await sportCenterModel.findById(req.params.id);
    if (sportCenter) {
      
      if (req.body.ownerId) {
        sportCenter.ownerId = req.body.ownerId;
      }
      if (req.body.name) {
        sportCenter.name = req.body.name;
      }
      if (req.body.address) {
        sportCenter.address = req.body.address;
      }
      if (req.body.phone) {
        sportCenter.phone = req.body.phone;
      }
      if (req.body.services) {
        sportCenter.services = {
          bar: req.body.services.bar,
          showers: req.body.services.showers,
          grill: req.body.services.grill,
          parking: req.body.services.parking,
        };
      }
      if (req.body.fields) {
        sportCenter.fields = req.body.fields;
      }
      if (req.body.openHour) {
        sportCenter.openHour = req.body.openHour;
      }
      if (req.body.closeHour) {
        sportCenter.closeHour = req.body.closeHour;
      }
      if (req.body.social) {
        sportCenter.social = {
          facebook: req.body.social.facebook,
          instagram: req.body.social.instagram,
        };
      }
      if (req.body.latitude) {
        sportCenter.latitude = req.body.latitude;
      }
      if (req.body.location) {
        sportCenter.location = req.body.location;
      }
      if (req.body.photo) {
        sportCenter.photo = req.body.photo;
      }

      if (
        validation.nameValidation(sportCenter.name) &&
        validation.addressValidation(sportCenter.address) &&
        validation.phoneValidation(sportCenter.phone) &&
        validation.servicesValidation(sportCenter.services) &&
        validation.fieldsValidation(sportCenter.fields) &&
        validation.openHourValidation(sportCenter.openHour) &&
        validation.closeHourValidation(sportCenter.closeHour) &&
        validation.socialValidation(sportCenter.social) &&
        validation.latitudeValidation(sportCenter.latitude) &&
        validation.locationValidation(sportCenter.location) &&
        validation.photoValidation(sportCenter.photo) 
      ) {
        await sportCenter.save();
        res.json({ mensaje: "Centro deportivo actualizado con éxito" });
      } else {
        res.status(400).json({ mensaje: "Error en los datos ingresados" });
      }
    } else {
      res.status(404).json({ mensaje: "Centro deportivo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar centro deportivo" });
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