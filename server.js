const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const path = require("path");


mongoose.connect("mongodb://localhost:27017/Batch2304");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads", express.static("uploads"));

app.use(express.static(path.join(__dirname, "./client/build")));

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);

    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.post("/signup", upload.single("profilepic"), async (req, res) => {
  console.log(req.body);
  console.log(req.file.path);
  let newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    contact: req.body.contact,
    profile: req.file.path,
  });

  await newUser.save();
  console.log("received signup data");
  res.json(["account created succesfully"]);
});

app.put("/editprofile", upload.single("profilepic"), async (req, res) => {
  console.log(req.body);
  // console.log(req.file.path);

  try {
    await User.updateMany(
      { _id: req.body.id },
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        contact: req.body.contact,
        profile: req.file.path,
      }
    );
    res.json({ status: "success", msg: "Account updated succesfully" });
  } catch (error) {
    res.json(error);
  }

  // let newUser = new User({
  //   firstname: req.body.firstname,
  //   lastname: req.body.lastname,
  //   email: req.body.email,
  //   password: req.body.password,
  //   age: req.body.age,
  //   contact: req.body.contact,
  //   profile: req.file.path,
  // });
  // await newUser.save();
  // console.log("received signup data");
  // res.json(["account updated succesfully"]);
});

app.delete("/deleteUser", async (req, res) => {
  try {
    await User.deleteMany({ _id: req.query.id });
    res.json({ status: "success", msg: "Account Deleted succesfully" });
  } catch (error) {
    res.json(error);
  }
});

app.post("/validateLogin", upload.single(), async (req, res) => {
  let results = await User.find().and({ email: req.body.email });

  if (results.length > 0) {
    if (results[0].password == req.body.password) {
      res.json({ status: "success", isLoggedIn: true, details: results[0] });
    } else {
      res.json({
        status: "failure",
        isLoggedIn: false,
        msg: "Invalid password",
      });
    }
  } else {
    res.json({ status: "failure", isLoggedIn: false, msg: "Invalid Email" });
  }
});

app.listen(1111, () => {
  console.log("Listening to port 1111");
});

let connectToDB = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/Batch2304");
    console.log("connect to db");
  } catch (error) {
    console.log("Unable to connect  db");
  }
};

let userSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  age: Number,
  contact: String,
  profile: String,
});

let User = mongoose.model("user", userSchema);

// let getData = async () => {
//   let Data = await User.find();
//   console.log(Data);
// };

// getData();

connectToDB();
