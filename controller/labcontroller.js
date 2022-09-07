const { jsonResponse } = require("./commonController");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const labModule = require("../module/lab");
const lab = new labModule();

module.exports = {
  getsinglelab: async (req, res) => {
    try {
      let [results] = await Promise.all([lab.getsinglelab(req)]);
      jsonResponse(res, "details", results);
    } catch (err) {
      jsonResponse(res, "error", err);
    }
  },
  signup_lab: async (req, res) => {
    try {
      let [checking] = await Promise.all([lab.login_lab(req)]);
      if (checking[0]) {
        jsonResponse(res, "already_exists_please_login");
      } else {
        bcrypt.hash(req.body.password, 12, async function (err, encrypted) {
          if (err) {
            jsonResponse(res, "error", err);
          } else {
            try {
              await Promise.all([lab.signup_lab(req, encrypted)]);
              const [getting_id] = await Promise.all([lab.login_lab(req)]);
              const jwtinfo = {
                id: getting_id[0].id,
                user: "lab",
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
              jsonResponse(res, "success", jwtinfo);
            } catch (error) {
              console.log(error);
              jsonResponse(res, "error", error);
            }
          }
        });
      }
    } catch (err) {
      jsonResponse(res, "matching_error_from_database", err);
    }
  },
  savelabdata: async (req, res) => {
    try {
      await Promise.all([lab.savelabdata(req)]);
      jsonResponse(res, "details saved");
    } catch (err) {
      jsonResponse(res, "error", err);
    }
  },
  savelabaccountdetails: async (req, res) => {
    try {
      await Promise.all([lab.savelabaccountdetails(req)]);
      jsonResponse(res, "details saved");
    } catch (err) {
      jsonResponse(res, "error", err);
    }
  },
  labreviews: async (req, res) => {
    try {
      let [result] = await Promise.all([lab.labreviews(req)]);
      jsonResponse(res, "reviews are", result);
    } catch (err) {
      jsonResponse(res, "error", err);
    }
  },
  appointment_lab: async (req, res) => {
    try {
      let [result] = await Promise.all([lab.appointment_lab(req)]);
      jsonResponse(res, "Lab appointments", result);
    } catch (err) {
      jsonResponse(res, "error", err);
    }
  },
  getlabappointmentdetails: async (req, res) => {
    try {
      let [result] = await Promise.all([lab.getlabappointmentdetails(req)]);
      jsonResponse(res, "Single appointment details", result);
    } catch (err) {
      jsonResponse(res, "error", err);
    }
  },
  inserttest: async (req, res) => {
    try {
      await Promise.all([lab.inserttest(req)]);
      jsonResponse(res, "details saved");
    } catch (err) {
      jsonResponse(res, "error", err);
    }
  },
  labtests: async (req, res) => {
    try {
      let [result] = await Promise.all([lab.labtests(req)]);
      jsonResponse(res, "lab tests", result);
    } catch (err) {
      jsonResponse(res, "error", err);
    }
  },
  insertpackage: async (req, res) => {
    try {
      await Promise.all([lab.insertpackage(req)]);
      jsonResponse(res, "details saved");
    } catch (err) {
      jsonResponse(res, "error", err);
    }
  },
  labpackages: async (req, res) => {
    try {
      let [result] = await Promise.all([lab.labpackages(req)]);
      jsonResponse(res, "lab packages", result);
    } catch (err) {
      jsonResponse(res, "error", err);
    }
  },
  patient_list: async (req, res) => {
    try {
      let [result] = await Promise.all([lab.patient_list(req)]);
      jsonResponse(res, "All patients", result);
    } catch (err) {
      jsonResponse(res, "error", err);
    }
  },
  lab_remove_patients: async (req, res) => {
    try {
      req.body.appoint_id =
        typeof req.params.appoint_id === "undefined"
          ? 0
          : req.params.appoint_id;
      let [results] = await Promise.all([lab.lab_remove_patients(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  patient_list_single_patient: async (req, res) => {
    try {
      let [result] = await Promise.all([lab.patient_list_single_patient(req)]);
      jsonResponse(res, "All patients", result);
    } catch (err) {
      jsonResponse(res, "error", err);
    }
  },
  labs_availability: async (req, res) => {
    try {
      req.body.labs_id =
        typeof req.params.labs_id === "undefined" ? 0 : req.params.labs_id;
      let [results] = await Promise.all([lab.labs_availability(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  labs_update_availability: async (req, res) => {
    try {
      console.log(req.body, "site");
      id = typeof req.params.user_id === "undefined" ? 0 : req.params.user_id;

      let [results] = await Promise.all([
        lab.labs_update_availability(req, id),
      ]);
      jsonResponse(res, "sucess");
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
};
