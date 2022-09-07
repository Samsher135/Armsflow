const jwt = require("jsonwebtoken");
const { jsonResponse } = require("../controller/commonController");
require("dotenv").config();

const requireAuthUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        jsonResponse(res, "Error", err.message);
      } else {
        const { id, user } = decoded.jwtinfo;
        req.decoded = decoded;
        if (req.params.user_id == id && user == "user") {
          next();
        } else {
          jsonResponse(res, "Error", "Unauthorized");
        }
      }
    });
  } else {
    jsonResponse(res, "Failed To authenticate");
  }
};
const requireAuthDoctor = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        jsonResponse(res, "Error", err.message);
      } else {
        const { id, user } = decoded.jwtinfo;

        req.decoded = decoded;
        if (req.params.doctor_id == id && user == "doctor") {
          next();
        } else {
          jsonResponse(res, "Error", "Unauthorized");
        }
      }
    });
  } else {
    jsonResponse(res, "Failed To authenticate");
  }
};
const requireAuthLab = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        jsonResponse(res, "Error", err.message);
      } else {
        const { id, user } = decoded.jwtinfo;
        req.decoded = decoded;
        if (req.params.lab_id == id && user == "lab") {
          next();
        } else {
          jsonResponse(res, "Error", "Unauthorized");
        }
      }
    });
  } else {
    jsonResponse(res, "Failed To authenticate");
  }
};

module.exports = { requireAuthUser, requireAuthDoctor, requireAuthLab };
