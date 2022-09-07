const express = require("express");
const app = express.Router();
const lab = require("../controller/labcontroller");

const { requireAuthLab } = require("../middleware/requireAuth");

app.post("/signup_lab", lab.signup_lab);
app.get("/:lab_id",requireAuthLab, lab.getsinglelab);
app.put("/:lab_id",requireAuthLab,lab.savelabdata);
app.put("/:lab_id/account",requireAuthLab,lab.savelabaccountdetails);
app.get("/:lab_id/reviews",requireAuthLab,lab.labreviews);
app.get("/:lab_id/appointments",requireAuthLab,lab.appointment_lab);
app.get("/:lab_id/appointments/:app_id",requireAuthLab,lab.getlabappointmentdetails);
app.post("/:lab_id/inserttest",requireAuthLab,lab.inserttest);
app.get("/:lab_id/all_labtests",requireAuthLab,lab.labtests);
app.post("/:lab_id/insertpackage",requireAuthLab,lab.insertpackage);
app.get("/:lab_id/all_labpackages",requireAuthLab,lab.labpackages);
app.get("/:lab_id/patient_list",requireAuthLab,lab.patient_list);
app.get("/:lab_id/patient_list/:user_id",requireAuthLab,lab.patient_list_single_patient);
app.get("/lab_remove_patients/:appoint_id", lab.lab_remove_patients);

app.get("/labs_availability/:labs_id", lab.labs_availability);
app.patch("/labs_update_availability/:user_id", lab.labs_update_availability);

module.exports = app;
