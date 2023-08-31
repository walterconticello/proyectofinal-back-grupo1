import Sale from "../models/sales.model.js";

const createSale = async (req, res) => {
  try {
    const { productId, userId, quantity, totalPrice } = req.body;

    const newSale = new Sale({
      productId,
      userId,
      quantity,
      totalPrice,
    });

    await newSale.save();

    res.status(201).json(newSale);
  } catch (error) {
    console.error("Error creating sale:", error);
    res.status(500).json({ message: "Error creating sale" });
  }
};

const getSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).json({ message: "Error fetching sales" });
  }
};

const getSaleById = async (req, res) => {
  try {
    const saleId = req.params.id;
    const sale = await Sale.findById(saleId);
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

export default {
  createSale,
  getSales,
  getSaleById,
};
