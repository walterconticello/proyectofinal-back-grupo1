import Sale from "../models/sales.model.js";
import jwt from "jsonwebtoken";

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
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error creating sale:", error);
    res.status(500).json({ message: "Error creating sale" });
  }
};

const getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate("productId").populate("userId");

    res.status(200).json(sales);
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).json({ message: "Error fetching sales" });
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
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (error) {
    console.error("Error fetching sale:", error);
    res.status(500).json({ message: "Error fetching sale" });
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
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching sales by user id" });
  }
};

export default {
  createSale,
  getSales,
  getSaleById,
  getSalesByUserId,
};
