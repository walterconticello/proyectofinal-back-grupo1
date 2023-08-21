import complexModel from "../models/complexModel";
import validation from "../helpers/complexValidation";
//Get

const getAllComplex = async (req, res) => {
  try {
    const complex = await complexModel.find();
    res.json(complex);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los complejos" });
  }
};

//Get by id

const getComplexById = async (req, res) => {
  try {
    const complex = await complexModel.findById(req.params.id);
    res.json(complex);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el complejo" });
  }
};

//Post

const postComplex = async (req, res) => {
  try {
    const bodycomplex = {
      ownerId: req.body.ownerId,
      name: req.body.name,
      capacity: req.body.capacity,
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
        facebook: req.body.facebook,
        instagram: req.body.instagram,
      },
      latitude: req.body.latitude,
      location: req.body.location,
      photo: req.body.photo
    };

    if (!validation.postComplexDataValidation(bodycomplex)) {
      return res.status(400).json({ mensaje: "Error en los datos ingresados" });
    } else if (
      validation.nameValidation(bodycomplex.name) &&
      validation.addressValidation(bodycomplex.address) &&
      validation.phoneValidation(bodycomplex.phone) &&
      validation.servicesValidation(bodycomplex.services) &&
      validation.fieldsValidation(bodycomplex.fields) &&
      validation.openHourValidation(bodycomplex.openHour) &&
      validation.closeHourValidation(bodycomplex.closeHour) &&
      validation.socialValidation(bodycomplex.social) &&
      validation.latitudeValidation(bodycomplex.latitude) &&
      validation.ownerIdValidation(bodycomplex.ownerId) &&
      validation.locationValidation(bodycomplex.location) &&
      validation.photoValidation(bodycomplex.photo)
    ) {
      const complex = new complexModel(bodycomplex);
      await complex.save();
      res.json({ mensaje: "Complejo agregado con éxito" });
    } else {
      res.status(400).json({ mensaje: "Error en los datos ingresados" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error al agregar complejo" });
  }
};

//Put

const putComplex = async (req, res) => {
  try {
    const complex = await complexModel.findById(req.params.id);
    if (complex) {

      if (req.body.ownerId) {
        complex.ownerId = req.body.ownerId;
      }
      if (req.body.name) {
        complex.name = req.body.name;
      }
      if (req.body.address) {
        complex.address = req.body.address;
      }
      if (req.body.phone) {
        complex.phone = req.body.phone;
      }
      if (req.body.services) {
        complex.services = {
          bar: req.body.services.bar,
          showers: req.body.services.showers,
          grill: req.body.services.grill,
          parking: req.body.services.parking,
        };
      }
      if (req.body.fields) {
        complex.fields = req.body.fields;
      }
      if (req.body.openHour) {
        complex.openHour = req.body.openHour;
      }
      if (req.body.closeHour) {
        complex.closeHour = req.body.closeHour;
      }
      if (req.body.social) {
        complex.social = {
          facebook: req.body.social.facebook,
          instagram: req.body.social.instagram,
        };
      }
      if (req.body.latitude) {
        complex.latitude = req.body.latitude;
      }
      if (req.body.location) {
        complex.location = req.body.location;
      }
      if (req.body.photo) {
        complex.photo = req.body.photo;
      }

      if (
        validation.nameValidation(complex.name) &&
        validation.addressValidation(complex.address) &&
        validation.phoneValidation(complex.phone) &&
        validation.servicesValidation(complex.services) &&
        validation.fieldsValidation(complex.fields) &&
        validation.openHourValidation(complex.openHour) &&
        validation.closeHourValidation(complex.closeHour) &&
        validation.socialValidation(complex.social) &&
        validation.latitudeValidation(complex.latitude) &&
        validation.ownerIdValidation(complex.ownerId) &&
        validation.locationValidation(complex.location) &&
        validation.photoValidation(complex.photo) 
      ) {
        await complex.save();
        res.json({ mensaje: "Complejo actualizado con éxito" });
      } else {
        res.status(400).json({ mensaje: "Error en los datos ingresados" });
      }
    } else {
      res.status(404).json({ mensaje: "Complejo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar complejo" });
  }
};

//Delete

const deleteComplex = async (req, res) => {
  try {
    const deleteComplex = await complexModel.findByIdAndDelete(req.params.id);
    if (deleteComplex) {
      res.json({ mensaje: "Complejo eliminado con éxito" });
    } else {
      res.status(404).json({ mensaje: "Complejo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar complejo" });
  }
};

export default {
  getAllComplex,
  getComplexById,
  postComplex,
  putComplex,
  deleteComplex,
};
