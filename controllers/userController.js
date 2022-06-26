const fetch = require("node-fetch");
const path = require("path");

const fs = require("fs").promises;

const User = require("../models/userModel");

const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "./test.csv",
  append: false,
  header: ["id", "name", "email", "gender", "status"],
});

exports.loadUsers = async (req, res) => {
  try {
    const data = await fetch("https://gorest.co.in/public-api/users");
    const goRestUserData = await data.json();
    await User.insertMany(goRestUserData.data, { ordered: false });
    res.status(200).json({
      status: "Data Successfully Loaded",
    });
  } catch (err) {
    if (err.code === 11000) {
      res.status(200).json({
        status: "Data Successfully Loaded",
      });
    } else {
      res.status(200).json({
        status: "Data already loaded",
      });
    }
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const data = await User.find({});
    res.status(200).json({
      count: data.length,
      data: [...data],
    });
  } catch (err) {
    res.status(200).json({
      status: "Failed to load data",
      count: 0,
      data: [],
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const doc = await User.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (doc) {
      res.status(200).json({
        userId: userId,
        data: doc,
      });
    } else {
      res.status(400).json({
        status: "Invalid User Id",
      });
    }
  } catch (err) {
    res.status(200).json({
      status: "Failed to update Data",
    });
  }
};

exports.exportAllUser = async (req, res) => {
  try {
    const data = await User.find({});
    let indexPath = path.join(__dirname, "../test.csv");

    await fs.unlink(indexPath);
    await csvWriter.writeRecords(data);
    res.setHeader("content-type", "text/csv");
    res.attachment("user-details.csv").status(200).sendFile(indexPath);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Something Went Wrong!!!",
    });
  }
};
