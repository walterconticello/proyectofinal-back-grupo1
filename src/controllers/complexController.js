import complexModel from "../model/complexModel";
import validation from "../helpers/complexValidation";  
//Get 

const getAllComplex = async (req, res) => {
  try {
    const complex = await complexModel.find();
    res.json(complex);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los complejos" });
  }
}

//Get by id

const getComplexById = async (req, res) => {
    try {
        const complex = await complexModel.findById(req.params.id);
        res.json(complex);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el complejo" });
    }
}

//Post

const postComplex = async (req, res) => {
    try {
        const bodycomplex = {
            name: req.body.name,
            capacity: req.body.capacity,
            address: req.body.address,
            idComplex: req.body.idComplex,
        }
        
        if(!validation.postComplexDataValidation(bodycomplex)){
            return res.status(400).json({ mensaje: "Error en los datos ingresados" });
        }

        else if (validation.nameValidation(bodycomplex.name) && validation.capacityValidation(bodycomplex.capacity) && validation.addressValidation(bodycomplex.address) && validation.idComplexValidation(bodycomplex.idComplex)) {
            const complex = new complexModel(bodycomplex);
            await complex.save();
            res.json({ mensaje: "Complejo agregado con éxito" });
        }

        else { res.status(400).json({ mensaje: "Error en los datos ingresados" }); }

    } catch (error) {

        res.status(500).json({ mensaje: "Error al agregar complejo" });
    }
}

//Put

const putComplex = async (req, res) => {
    try {
        const complex= await complexModel.findById(req.params.id);
        if(complex) {
            if(req.body.name) { complex.name = req.body.name; }
            if(req.body.capacity) { complex.capacity = req.body.capacity; }
            if(req.body.address) { complex.address = req.body.address; }
            if(req.body.idComplex) { complex.idComplex = req.body.idComplex; }
            
            if(validation.nameValidation(complex.name) && validation.capacityValidation(complex.capacity) && validation.addressValidation(complex.address) && validation.idComplexValidation(complex.idComplex)) {
                await complex.save();
                res.json({ mensaje: "Complejo actualizado con éxito" });
            }

            else { res.status(400).json({ mensaje: "Error en los datos ingresados" }); }

        } else { res.status(404).json({ mensaje: "Complejo no encontrado" }); }

    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar complejo" });
    }
}

//Delete

const deleteComplex = async (req, res) => {
    try {
        const deleteComplex = await complexModel.findByIdAndDelete(req.params.id);
        if(deleteComplex) { res.json({ mensaje: "Complejo eliminado con éxito" }); }

        else { res.status(404).json({ mensaje: "Complejo no encontrado" }); }

    } catch (error) {

        res.status(500).json({ mensaje: "Error al eliminar complejo" });
    }
}

export default { getAllComplex, getComplexById, postComplex, putComplex, deleteComplex };

// Path: src\validation\complexValidation.js