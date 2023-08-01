import commentModel from "../models/comments.model.js";

//GET
const getAllComments = async (req, res) => {
    try {
        const allComments = await commentModel.find();
        res.status(200).json(allComments);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//GET by ID
const getByID = async (req, res) => {
    try {
        const comment = await commentModel.findById(req.params.id);
        if(comment){
            res.status(200).json(comment);
        }
        else {
            res.status(404).json("Comment not found");
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//GET by User
//GET by SportCenter
//POST
const createComment = async (req, res) => {
    try {
        const bodyComment = {
            text: req.body.text,
            rating: req.body.rating,
            // sportCenterId: ,
            // userId: 
        };
        
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//PUT
//DELETE

export default {getAllComments, getByID};