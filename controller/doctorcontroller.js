const { jsonResponse } = require("./commonController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const doctorModule = require("../module/doctor");
const doctor = new doctorModule();

module.exports = {
  signup_doctor: async (req, res) => {
    try {
      let [checking] = await Promise.all([doctor.login_doctor(req)]);
      if (checking[0]) {
        jsonResponse(res, "already_exists_please_login");
      } else {
        bcrypt.hash(req.body.password, 12, async function (err, encrypted) {
          if (err) {
            jsonResponse(res, "error", err);
          } else {
            try {
              await Promise.all([doctor.signup_doctor(req, encrypted)]);
              const [getting_id] = await Promise.all([
                doctor.login_doctor(req),
              ]);
              const jwtinfo = {
                id: getting_id[0].id,
                user: "doctor",
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

  doc_profile_details: async (req, res) => {
    try {
      req.body.doctor_id =
        typeof req.params.doctor_id === "undefined" ? 0 : req.params.doctor_id;
      let [results] = await Promise.all([doctor.doc_profile_details(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  upt_doc_profile_details: async (req, res) => {
    try {
      doctor_id =
        typeof req.params.doctor_id === "undefined" ? 0 : req.params.doctor_id;
      let [results] = await Promise.all([
        doctor.upt_doc_profile_details(req, doctor_id),
      ]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  doc_patients_list: async (req, res) => {
    try {
      req.body.doctor_id =
        typeof req.params.doctor_id === "undefined" ? 0 : req.params.doctor_id;
      req.body.Appointment_type =
        typeof req.params.Appointment_type === "undefined"
          ? 0
          : req.params.Appointment_type;
      let [results] = await Promise.all([doctor.doc_patients_list(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  doc_remove_patients: async (req, res) => {
    try {
      req.body.appoint_id =
        typeof req.params.appoint_id === "undefined"
          ? 0
          : req.params.appoint_id;
      let [results] = await Promise.all([doctor.doc_remove_patients(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  doc_patients_profile: async (req, res) => {
    try {
      req.body.appoint_id =
        typeof req.params.appoint_id === "undefined"
          ? 0
          : req.params.appoint_id;
      req.body.doctor_id =
        typeof req.params.doctor_id === "undefined" ? 0 : req.params.doctor_id;
      let [results] = await Promise.all([doctor.doc_patients_profile(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  doc_appointments: async (req, res) => {
    try {
      req.body.doctor_id =
        typeof req.params.doctor_id === "undefined" ? 0 : req.params.doctor_id;
      let [results] = await Promise.all([doctor.doc_appointments(req)]);
      // let data = results[0].startDate
      // let str = JSON.stringify(data);
      // let slc = str.slice(1,17)
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  doc_appointments_details: async (req, res) => {
    try {
      req.body.doctor_id =
        typeof req.params.doctor_id === "undefined" ? 0 : req.params.doctor_id;
      let [results] = await Promise.all([doctor.doc_appointments_details(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  count_doc_appointments: async (req, res) => {
    try {
      req.body.doctor_id =
        typeof req.params.doctor_id === "undefined" ? 0 : req.params.doctor_id;
      let [results] = await Promise.all([doctor.count_doc_appointments(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  doc_availability: async (req, res) => {
    try {
      req.body.doctor_id =
        typeof req.params.doctor_id === "undefined" ? 0 : req.params.doctor_id;
      let [results] = await Promise.all([doctor.doc_availability(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  doc_update_availability: async (req, res) => {
    try {
      console.log(req.body, "site");
      doctor_id =
        typeof req.params.doctor_id === "undefined"
          ? 0
          : req.params.doctor_id;

      let [results] = await Promise.all([
        doctor.doc_update_availability(req, doctor_id),
      ]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  doc_reviews: async (req, res) => {
    try {
      req.body.doctor_id =
        typeof req.params.doctor_id === "undefined" ? 0 : req.params.doctor_id;
      let [results] = await Promise.all([doctor.doc_reviews(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
};
