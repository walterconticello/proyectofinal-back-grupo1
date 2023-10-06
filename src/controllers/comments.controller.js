import commentModel from "../models/comments.model.js";
import validation from "../helpers/comments.validation.js";
import { createError } from "../utils/error.js";


//GET by User
const getCommentsByUser = async (req, res, next) => {
  try {
    const comments = await commentModel
      .find({ userId: req.params.user })
      .populate({
        path: "userId",
        select: ["username", "email", "photo"],
      });
    const docs = await commentModel.find({ userId: req.params.user }).count();
    if (comments.length > 0) {
      res.status(200).json({ comments, length: docs });
    } else {
      return next(createError(404, "No hay comentarios"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//GET by SportCenter
const getCommentsBySportCenter = async (req, res, next) => {
  try {
    const page = parseInt(req.params.page);
    const comments = await commentModel
      .find({ sportCenterId: req.params.sportcenter })
      .limit(10)
      .skip(10 * (page - 1))
      .populate({
        path: "userId",
        select: ["username", "email", "photo"],
      });
    let docs = await commentModel
      .find({ sportCenterId: req.params.sportcenter })
      .count();
    docs = Math.ceil(docs / 10);
    res.status(200).json({ comments, pages: docs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//POST
const createComment = async (req, res, next) => {
  try {
    const token = req.header("access_token");
    const id = req.user.id;
    if (id) {
      const bodyComment = {
        text: req.body.text,
        rating: req.body.rating,
        sportCenterId: req.body.sportCenterId,
        userId: id,
      };
      if (!validation.createCommentDataValidation(bodyComment)) {
        return next(createError(400, "Falta información por ingresar"));
      } else if (
        validation.ratingValidation(bodyComment.rating) &&
        validation.textValidation(bodyComment.text) &&
        (await validation.userValidation(bodyComment.userId)) &&
        (await validation.sportCenterValidation(bodyComment.sportCenterId))
      ) {
        const newComment = new commentModel(bodyComment);
        await newComment.save();
        res.status(201).json(newComment);
      } else {
        return next(createError(400, "Informacion inválida"));
      }
    } else {
      return next(createError(400, "Inicia sesión para comentar"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//PUT
const updateComment = async (req, res, next) => {
  try {
    const token = req.header("access_token");
    const id = req.user.id;
    if (id) {
      const comment = await commentModel.findById(req.params.id);
      if (comment) {
        if (id == comment.userId) {
          if (req.body.text) comment.text = req.body.text;
          if (req.body.rating) comment.rating = req.body.rating;
          if (
            validation.ratingValidation(comment.rating) &&
            validation.textValidation(comment.text)
          ) {
            await comment.save();
            res.status(200).json(comment);
          } else {
            return next(createError(400, "Informacion inválida"));
          }
        } else {
          return next(createError(400, "Solo puedes modificar tu propio comentario"));
        }
      } else {
        return next(createError(404, "Comentario no encontrado"));
      }
    } else {
      return next(createError(400, "Inicia sesión para modificar un comentario"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//DELETE
const deleteComment = async (req, res, next) => {
  try {
    const token = req.header("access_token");
    const id = req.user.id;
    if (id) {
      const comment = await commentModel.findById(req.params.id);
      if (comment) {
        if (id == comment.userId) {
          const deletedComment = await commentModel.findOneAndDelete({
            _id: { $eq: req.params.id },
          });
          if (deletedComment) {
            res.status(200).json({
              message: "The Comment has been deleted",
              comment: deletedComment,
            });
          } else {
            return next(createError(404, "Comentario no encontrado"));
          }
        } else {
          return next(createError(400, "Solo puedes eliminar tu propio comentario"));
        }
      } else {
        return next(createError(404, "Comentario no encontrado"));
      }
    } else {
      return next(createError(400, "Inicia sesión para eliminar un comentario"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getRating = async (req, res) => {
  try {
    const comments = await commentModel.find({
      sportCenterId: req.params.sportcenter,
    });
    let rating = 0;
    if (comments.length > 0) {
      for (let i = 0; i < comments.length; i++) {
        rating += comments[i].rating;
      }
      rating = Math.floor(rating / comments.length);
      res.status(200).json(rating);
    } else {
      res.status(200).json(rating);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default {
  createComment,
  getCommentsByUser,
  getCommentsBySportCenter,
  updateComment,
  deleteComment,
  getRating,
};
