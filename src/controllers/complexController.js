import complexModel from "../model/complexModel.js";

export default {
    get: async (req, res) => {
        try {
            const result = await complexModel.find();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }  
    },
    post: async (req, res) => {
        try {
            const result = await complexModel.create(req.body);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }, 
    put: async (req, res) => {
        try {
            const result = await complexModel.updateOne({ _id: req.params.id }, req.body);
            res.status(200).json(result);
        } 
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }, 
    delete: async (req, res) => {
        try {
            const result = await complexModel.deleteOne({ _id: req.params.id });
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

// Path: src\routes\complexRoutes.js 