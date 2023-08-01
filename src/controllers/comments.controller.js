import commentModel from "../models/comments.model";

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
//GET by User
//GET by SportCenter
//POST
//PUT
//DELETE

export default {
    getAllComments
};