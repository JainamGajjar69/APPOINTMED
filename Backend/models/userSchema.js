const jwt = require("jsonwebtoken");
const mongoose = require("mongoose"); //so at first we require mongoose so we required it so that we can use it ofc
const bcrypt = require("bcryptjs");
//now here we create new object in which our mongoose schema will come we created this schema as this is how our data should get saved
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true, 
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});


//did hasing using bcrypt package

userSchema.pre("save", async function (next) {
  
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});
//we are generating token here
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });

    await this.save();

    return token;
  } catch (err) {
    console.log(err);
  }
};

//collection creation
const Userss = mongoose.model("USERSS", userSchema); //now we created another object so we can give it a name and let them know this is our schema file name
//make sure to write your db collection name when userrs is written
module.exports = Userss; //then we export our Userss by using module.export
