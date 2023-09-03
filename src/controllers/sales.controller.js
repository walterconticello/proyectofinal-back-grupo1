import Sale from "../models/sales.model.js";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

const createSale = async (req, res) => {
  try {
    const token = req.header("access_token");
    const id = jwt.verify(token, process.env.JWT);
    if (id && id.id) {
      const newSale = new Sale({
        productId: req.body.productId,
        userId: id.id,
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice,
      });

      console.log(newSale);
      await newSale.save();

      res.status(201).json(newSale);
    } else {
      const error = createError(401, "Unauthorized");
      res.status(error.status).json({ message: error.message });
    }
  } catch (err) {
    const error = createError(500, "Error creating Sale");
    res.status(error.status).json({ message: error.message });
  }
};

const getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate("productId").populate("userId");

    res.status(200).json(sales);
  } catch (err) {
    const error = createError(500, "Error fetching sales");
    res.status(error.status).json({ message: error.message });
  }
};

const getSaleById = async (req, res) => {
  try {
    const saleId = req.params.id;
    const sale = await Sale.findById(saleId)
      .populate("productId")
      .populate("userId");
    if (sale) {
      res.status(200).json(sale);
    } else {
      const error = createError(404, "Sale not found");
      res.status(error.status).json({ message: error.message });
    }
  } catch (err) {
    const error = createError(500, "Error fetching sale");
    res.status(error.status).json({ message: error.message });
  }
};

const getSalesByUserId = async (req, res) => {
  try {
    const token = req.header("access_token");
    const id = jwt.verify(token, process.env.JWT);

    if (id && id.id) {
      const sales = await Sale.find({ userId: id.id })
        .populate("productId")
        .populate("userId");
      res.status(200).json(sales);
    } else {
      const error = createError(401, "Unauthorized access token");
      res.status(error.status).json({ message: error.message });
    }
  } catch (err) {
    const error = createError(500, "Error fetching sales by user id");
    res.status(error.status).json({ message: error.message });
  }
};

export default {
  createSale,
  getSales,
  getSaleById,
  getSalesByUserId,
};
