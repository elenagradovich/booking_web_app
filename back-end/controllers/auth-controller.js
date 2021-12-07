const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const HttpError = require('../models/http-error');
const User = require('../models/user');
const Role = require('../models/role');
const { mapFilePathToServerUrl, generateJwt } = require('../util/helpers');


const signup = async (req, res, next) => {
 
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    //return next(new HttpError('Invalid inputs detected, please check your data.', 422));
    res.status(400).json({message: "Registration error: ", err})
  }
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({message: "User existed"})
  }

  // in Production, signup/login page should use HTTPS
  const  hashedPassword = await bcrypt.hash(password, 12);
  const userRole = await Role.findOne({value: "USER"})
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    roles: [userRole.value],
    avatar: " "
  });

  try {
    await newUser.save();

    // generate jwt
    const token = generateJwt({userId: newUser._id, role: newUser.role});
    req.session.isAuthenticated = true
    res.json({
      authInfo: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        token
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({message: "Signup failed"})
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({message: "User not found"})
    }

    let isValidPassword = await bcrypt.compareSync(password, existingUser.password);
    if (!isValidPassword) {
      return res.status(400).json({message: "Invalid password"})
    }
    
    // generate jwt
    let token = generateJwt({userId: existingUser.id});
    req.session.isAuthenticated = true
    res.json({
      authInfo: {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        token
      }
    });

  } catch (e) {
    console.log(e);
    res.send("Server error")
  };
};

const getUsers = async (req, res, next) => {
  try {
    const userRole = new Role()
    const adminRole = new Role({value: "ADMIN"})
    const businessUserRole = new Role({value: "BUSINESS"})

    await userRole.save()
    await adminRole.save()
    await businessUserRole.save()
    res.json("Server work")
  } catch (e) {
    console.log(e)
  }
}

const logout = async (req, res) => {
  //req.session.isAuthenticated = false === req.session.destroy
  //req.session.destroy();
  res.json({message: "Logout success"});
}


exports.signup = signup;
exports.login = login;
exports.getUsers = getUsers;
exports.logout = logout;