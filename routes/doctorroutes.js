const express = require("express");
const app = express.Router();
const doctor = require("../controller/doctorcontroller");
const { requireAuthDoctor } = require("../middleware/requireAuth");

// COULDN't REACH THE DOCTORS DASHBOARD

// app.get("/profile_details");
// app.get("/profile_details/edit");
// app.put("/profile_details");
// app.get("/Appointment");
// app.get("/account_details");
// app.get("/Tests");
// app.get("/patient_lists");
// app.get("/availablity");

app.post("/signup_doctor", doctor.signup_doctor);

app.get("/doc_profile_details/:doctor_id",requireAuthDoctor,doctor.doc_profile_details);
app.patch(
  "/upt_doc_profile_details/:doctor_id",requireAuthDoctor,
  doctor.upt_doc_profile_details
);

app.get(
  "/doc_patients_list/:doctor_id/:Appointment_type",requireAuthDoctor,
  doctor.doc_patients_list
);
app.get("/doc_remove_patients/:appoint_id", doctor.doc_remove_patients);
app.get(
  "/doc_patients_profile/:appoint_id/:doctor_id",requireAuthDoctor,
  doctor.doc_patients_profile
);

app.get("/doc_appointments/:doctor_id",requireAuthDoctor, doctor.doc_appointments);
app.get(
  "/doc_appointments_details/:doctor_id",requireAuthDoctor,
  doctor.doc_appointments_details
);
app.get("/count_doc_appointments/:doctor_id",requireAuthDoctor, doctor.count_doc_appointments);

app.get("/doc_availability/:doctor_id",requireAuthDoctor, doctor.doc_availability);
app.patch(
  "/doc_update_availability/:doctor_id",requireAuthDoctor,
  doctor.doc_update_availability
);
app.get("/doc_reviews/:doctor_id",requireAuthDoctor, doctor.doc_reviews);

module.exports = app;
