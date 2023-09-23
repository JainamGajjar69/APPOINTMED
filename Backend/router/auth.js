const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
require("../db/conn");
const Userss = require("../models/userSchema");
const bcrypt = require("bcryptjs");
router.get("/", (req, res) => {
  res.send(`Hello from server by router`);
});

//sign up
router.post("/register", async (req, res) => {
  const { name, email, phone, work, gender, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !gender || !password || !cpassword) {
    return res.status(422).json({ error: "fill your data properly" });
  }

  try {
    const userExist = await Userss.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email Already Exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password is not matching" });
    } else {
      const user = new Userss({
        name,
        email,
        phone,
        work,
        gender,
        password,
        cpassword,
      });

      await user.save();

      res.status(201).json({ message: "user registerd successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//log-in
router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please fill your credentials properly" });
    }

    const userLogin = await Userss.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token,
        {
          expires: new Date(Date.now() + 2589200000),
          httpOnly:true
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        res.json({ message: "User Signed-in succesfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
