const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./Routes/authRoutes");

const { HoldingsModel } = require("./models/HoldingsModel");
const { PositionsModel } = require("./models/PositionsModel");
const { OrdersModel } = require("./models/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRoutes);

// =========================
// ADD SAMPLE HOLDINGS
// =========================

// app.get("/deleteHoldings", async (req, res) => {
//   try {
//     await HoldingsModel.deleteMany({});
//     res.send("All holdings deleted successfully!");
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error deleting holdings");
//   }
// });


// app.get("/addHoldings", async (req, res) => {
//   const tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   try {
//     await HoldingsModel.insertMany(tempHoldings);
//     res.send("Holdings added successfully!");
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error adding holdings");
//   }
// });


// =========================
// ADD SAMPLE POSITIONS
// =========================

// app.get("/addPositions", async (req, res) => {
//   const tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   try {
//     await PositionsModel.insertMany(tempPositions);
//     res.send("Positions added successfully!");
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error adding positions");
//   }
// });


// =========================
// GET ALL HOLDINGS
// =========================

app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});

    res.json(allHoldings);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to fetch holdings",
    });
  }
});


// =========================
// GET ALL POSITIONS
// =========================

app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});

    res.json(allPositions);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to fetch positions",
    });
  }
});


// =========================
// GET ALL ORDERS
// =========================

app.get("/allOrders", async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({});

    res.json(allOrders);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to fetch orders",
    });
  }
});


// =========================
// CREATE NEW ORDER
// BUY + SELL LOGIC
// =========================

app.post("/newOrder", async (req, res) => {
  try {
    let { name, qty, price, mode } = req.body;

    // Normalize values
    name = String(name || "").trim().toUpperCase();
    mode = String(mode || "").trim().toUpperCase();

    const quantity = Number(qty);
    const orderPrice = Number(price);

    // =========================
    // DEBUG LOG
    // =========================

    console.log("=================================");
    console.log("NEW ORDER RECEIVED");
    console.log("Name:", name);
    console.log("Quantity:", quantity);
    console.log("Price:", orderPrice);
    console.log("Mode:", mode);
    console.log("=================================");


    // =========================
    // BASIC VALIDATION
    // =========================

    if (!name || !mode) {
      return res.status(400).json({
        error: "Stock name and order mode are required",
      });
    }

    if (!Number.isFinite(quantity) || quantity <= 0) {
      return res.status(400).json({
        error: "Quantity must be greater than 0",
      });
    }

    if (!Number.isFinite(orderPrice) || orderPrice <= 0) {
      return res.status(400).json({
        error: "Price must be greater than 0",
      });
    }


    // =========================
    // BUY LOGIC
    // =========================

    if (mode === "BUY") {
      console.log("Processing BUY order...");

      const existingHolding = await HoldingsModel.findOne({
        name: name,
      });

      // ---------------------------------
      // EXISTING HOLDING
      // ---------------------------------

      if (existingHolding) {
        console.log("Existing holding found:", existingHolding);

        const oldQty = Number(existingHolding.qty);
        const oldAvg = Number(existingHolding.avg);

        const newQty = oldQty + quantity;

        const newAvg =
          (oldQty * oldAvg + quantity * orderPrice) / newQty;

        existingHolding.qty = newQty;
        existingHolding.avg = newAvg;
        existingHolding.price = orderPrice;

        await existingHolding.save();

        console.log("BUY HOLDING UPDATED:");
        console.log("Old Qty:", oldQty);
        console.log("New Qty:", newQty);
        console.log("New Average:", newAvg);
      }

      // ---------------------------------
      // NEW HOLDING
      // ---------------------------------

      else {
        console.log("No existing holding found.");
        console.log("Creating new holding...");

        const newHolding = new HoldingsModel({
          name: name,
          qty: quantity,
          avg: orderPrice,
          price: orderPrice,
          net: "0%",
          day: "0%",
          isLoss: false,
        });

        await newHolding.save();

        console.log("New holding created.");
      }


      // ---------------------------------
      // SAVE BUY ORDER
      // ---------------------------------

      const newOrder = new OrdersModel({
        name: name,
        qty: quantity,
        price: orderPrice,
        mode: "BUY",
      });

      await newOrder.save();

      console.log("BUY ORDER SAVED.");

      return res.json({
        success: true,
        message: "BUY order saved and holdings updated!",
      });
    }


    // =========================
    // SELL LOGIC
    // =========================

    if (mode === "SELL") {
      console.log("Processing SELL order...");

      // ---------------------------------
      // FIND EXISTING HOLDING
      // ---------------------------------

      const existingHolding = await HoldingsModel.findOne({
        name: name,
      });

      console.log("Existing holding for SELL:", existingHolding);


      // ---------------------------------
      // STOCK NOT OWNED
      // ---------------------------------

      if (!existingHolding) {
        console.log("SELL FAILED: Holding not found.");

        return res.status(400).json({
          error: `You don't own any shares of ${name}`,
        });
      }


      // ---------------------------------
      // SELL QUANTITY VALIDATION
      // ---------------------------------

      const currentQty = Number(existingHolding.qty);

      console.log("Current holding quantity:", currentQty);
      console.log("Selling quantity:", quantity);

      if (quantity > currentQty) {
        console.log("SELL FAILED: Insufficient quantity.");

        return res.status(400).json({
          error: `You only own ${currentQty} shares of ${name}`,
        });
      }


      // ---------------------------------
      // CALCULATE REMAINING QUANTITY
      // ---------------------------------

      const remainingQty = currentQty - quantity;

      console.log("Remaining quantity:", remainingQty);


      // ---------------------------------
      // UPDATE HOLDING
      // ---------------------------------

      if (remainingQty === 0) {
        console.log("Selling all shares.");

        await HoldingsModel.deleteOne({
          _id: existingHolding._id,
        });

        console.log("Holding deleted because quantity reached 0.");
      } else {
        console.log("Partial SELL.");
        console.log("Updating holding quantity...");

        const updatedHolding = await HoldingsModel.findOneAndUpdate(
          {
            _id: existingHolding._id,
          },
          {
            $set: {
              qty: remainingQty,
              price: orderPrice,
            },
          },
          {
            new: true,
          }
        );

        console.log("UPDATED HOLDING:", updatedHolding);
      }


      // ---------------------------------
      // SAVE SELL ORDER
      // ---------------------------------

      const newOrder = new OrdersModel({
        name: name,
        qty: quantity,
        price: orderPrice,
        mode: "SELL",
      });

      await newOrder.save();

      console.log("SELL ORDER SAVED.");
      console.log("SELL COMPLETED SUCCESSFULLY.");


      return res.json({
        success: true,
        message: "SELL order saved and holdings updated!",
      });
    }


    // =========================
    // INVALID MODE
    // =========================

    return res.status(400).json({
      error: "Invalid order mode",
    });

  } catch (err) {
    console.log("=================================");
    console.log("ORDER ERROR:");
    console.log(err);
    console.log("=================================");

    res.status(500).json({
      error: "Failed to process order",
    });
  }
});


// =========================
// MONGODB CONNECTION
// =========================

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:");
    console.log(err);
  });