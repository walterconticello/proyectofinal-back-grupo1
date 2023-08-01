import commentModel from "../models/comments.model.js";
import validation from "../helpers/comments.validation.js";

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
        if(!validation.createCommentDataValidation(bodyComment)){
            res.status(400).json("Some data is missing");
        }
        else if(validation.ratingValidation(bodyComment.rating) && validation.textValidation(bodyComment.text)){
            const newComment = new commentModel(bodyComment);
            await newComment.save();
            res.status(201).json(newComment);
        }
        else {
            res.status(400).json("The written data is invalid");
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//PUT
//DELETE

export default {getAllComments, getByID, createComment};