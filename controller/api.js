const { jsonResponse } = require("./commonController");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const doctorModule = require("../module/doctor");
const doctor = new doctorModule();
const labModule = require("../module/lab");
const lab = new labModule();
const usersModule = require("../module/users");
const users = new usersModule();

module.exports = {
  index: (req, res) => {
    jsonResponse(res, "success", "Welcome to Arms Flow");
  },

  login: async (req, res) => {
    try {
      let [result1, result2, result3] = await Promise.all([
        users.login_user(req),
        lab.login_lab(req),
        doctor.login_doctor(req),
      ]);
      if (!result1[0] && !result2[0] && !result3[0]) {
        jsonResponse(res, "NO data_found please signup", err);
      } else {
        function login_me(data, who) {
          const { Email, C_password, id } = data;
          bcrypt.compare(
            req.body.password,
            C_password,
            async function (err, resultant) {
              if (resultant && Email == req.body.email) {
                const jwtinfo = {
                  id: id,
                  user: who,
                };
                const token = jwt.sign({ jwtinfo }, process.env.JWT_SECRET, {
                  expiresIn: "1h",
                });
                res.cookie("token", token, {
                  sameSite: 'none',
                  secure:true,
                  maxAge: 14*24*3600000,
                  httpOnly: true,
                });
                // res.redirect(`/${who}/${id}`);
                jsonResponse(res, `Login_successfull ${who}`,{user: who, id:id});
              } else {
                jsonResponse(res, "Email or password is wrong", err);
              }
            }
          );
        }
        if (result1[0]) login_me(result1[0], "user");
        else if (result2[0]) login_me(result2[0], "lab");
        else if (result3[0]) login_me(result3[0], "doctor");
      }
    } catch (err) {
      jsonResponse(res, "User_doesn't exist please signup", err);
    }
  },
  logout: async (req, res) => {
    res.clearCookie("token");
    res.redirect("/home");
  },
};
