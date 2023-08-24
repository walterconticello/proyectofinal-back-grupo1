import commentModel from "../models/comments.model.js";
import validation from "../helpers/comments.validation.js";
import jwt from "jsonwebtoken";

//GET
const getAllComments = async (req, res) => {
    try {
        const allComments = await commentModel.find().populate({
            path: "userId",
            select: ["username", "email"], //Add profile photo field
        });
        const docs = await commentModel.count();
        res.status(200).json({comments: allComments, length: docs});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//GET by ID
const getByID = async (req, res) => {
    try {
        const comment = await commentModel.findById(req.params.id).populate({
            path: "userId",
            select: ["username", "email"], //Add profile photo field
        });;
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
const getCommentsByUser = async (req, res) => {
    try {
        const comments = await commentModel.find({userId: req.params.user}).populate({
            path: "userId",
            select: ["username", "email"], //Add profile photo field
        });;
        const docs = await commentModel.find({userId: req.params.user}).count();
        if(comments.length > 0){
            res.status(200).json({comments, length: docs});
        }
        else {
            res.status(404).json("There are no comments");
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//GET by SportCenter
const getCommentsBySportCenter = async (req, res) => {
    try {
        const page = parseInt(req.params.page);
        const comments = await commentModel.find({sportCenterId: req.params.sportcenter}).limit(10).skip(10 * (page - 1)).populate({
            path: "userId",
            select: ["username", "email"], //Add profile photo field
        });;
        let docs = await commentModel.find({sportCenterId: req.params.sportcenter}).count();
        docs = Math.ceil(docs / 10);
        if(comments.length > 0){
            res.status(200).json({comments, pages: docs});
        }
        else {
            res.status(404).json("There are no comments");
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//POST
const createComment = async (req, res) => {
    try {
        const token = req.header("access_token");
        const { id } = jwt.verify(token, process.env.JWT);
        const bodyComment = {
            text: req.body.text,
            rating: req.body.rating,
            sportCenterId: req.body.sportCenterId,
            userId: id,
        };
        if(!validation.createCommentDataValidation(bodyComment)){
            res.status(400).json("Some data is missing");
        }
        else if(validation.ratingValidation(bodyComment.rating) && validation.textValidation(bodyComment.text) && await validation.userValidation(bodyComment.userId) && await validation.sportCenterValidation(bodyComment.sportCenterId)){
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
const updateComment = async (req, res) => {
    try {
        const comment = await commentModel.findById(req.params.id);
        if(comment){
            if(req.body.text) comment.text = req.body.text;
            if(req.body.rating) comment.rating = req.body.rating;

            if(validation.ratingValidation(comment.rating) && validation.textValidation(comment.text)){
                await comment.save();
                res.status(200).json(comment);
            }
            else {
                res.status(400).json("The written data is invalid");
            }
        }
        else {
            res.status(404).json("Comment Not Found");
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//DELETE
const deleteComment = async (req, res) => {
    try {
        const deletedComment = await commentModel.findOneAndDelete({ _id: { $eq: req.params.id }});
        if(deletedComment) {
            res.status(200).json({ message: "The Comment has been deleted", comment: deletedComment});
        }
        else {
            res.status(404).json("Comment Not Found");
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const getRating = async (req, res) => {
    try {
        const comments = await commentModel.find({sportCenterId: req.params.sportcenter});
        let rating = 0;
        if(comments.length>0){
            for (let i = 0; i < comments.length; i++) {
                rating += comments[i].rating;
            }
            rating = Math.floor(rating/comments.length);
            res.status(200).json(rating);
        }
        else {
            res.status(404).json(rating);
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export default {getAllComments, getByID, createComment, getCommentsByUser, getCommentsBySportCenter, updateComment, deleteComment, getRating};