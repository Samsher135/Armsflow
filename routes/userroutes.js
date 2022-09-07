const express = require("express");
const app = express.Router();
const user = require("../controller/usercontroller");

const { requireAuthUser } = require("../middleware/requireAuth");
app.post("/signup_user", user.signup_user);
app.get("/singleuser/:user_id",requireAuthUser, user.singleUser);
app.put("/:user_id",requireAuthUser, user.completedetails);
app.get("/:user_id/appointments",requireAuthUser, user.allappointments);
app.get(
  "/:user_id/appointment_details/:app_id",requireAuthUser,
  user.appointment_details
);

app.get("/total_doc_tests", user.total_doc);
app.get("/increment_count", user.increment_count);
app.get("/daily_visits", user.daily_visits);
app.get("/nearby_doctors", user.nearby_doctors);
app.get("/nearby_labs", user.nearby_labs);

app.get("/our_specialists", user.our_specialists);
app.get(
  "/our_specialists_byfilter/:specialization",
  user.our_specialists_byfilter
);

app.get(
  "/view_all_doctor_by_specialization/:specialization",
  user.view_all_doctor_by_specialization
);

app.get("/view_all_h_t_l/:state/:specialization/:order", user.view_all_h_t_l);
app.get(
  "/view_all_gender/:state/:specialization/:gender/:order",
  user.view_all_gender
);
app.get("/view_all_rating/:state/:specialization/:order", user.view_all_rating);

app.get(
  "/nearby_doc_h_t_l/:state/:specialization/:order",
  user.nearby_doc_h_t_l
);
app.get(
  "/nearby_doc_gender/:state/:specialization/:gender/:order",
  user.nearby_doc_gender
);
app.get(
  "/nearby_doc_rating/:state/:specialization/:order",
  user.nearby_doc_rating
);

app.get(
  "/experience_doc_h_t_l/:state/:specialization/:order",
  user.experience_doc_h_t_l
);
app.get(
  "/experience_doc_gender/:state/:specialization/:gender/:order",
  user.experience_doc_gender
);
app.get(
  "/experience_doc_rating/:state/:specialization/:order",
  user.experience_doc_rating
);

app.get("/view_doc_profile/:id", user.view_doc_profile);
app.post("/make_appointment/:user_id/:Doctor_id",requireAuthUser, user.make_appointment);

app.get("/give_stars/:user_id/:Doctor_id/:Lab_id/:stars", user.give_stars);

app.get("/paywithpaytm", user.paywithpaytm);
app.post("/paywithpaytmresponse", user.paywithpaytmresponse);

app.get("/popular_labs", user.popular_labs);
app.get("/tests_by_labs/:lab_id", user.tests_by_labs);
app.get("/tests_by_search/:search", user.tests_by_search);
app.get("/package_by_labs/:lab_id", user.package_by_labs);
app.get("/package_by_search/:search", user.package_by_search);

app.get("/lab/:lab_id", user.getsinglelabuser);
app.get("/test/:test_id", user.gettestdetails);
app.post(
  "/makelabsappointment/:user_id/:Lab_id/:Test_id",requireAuthUser,
  user.makelabsappointment
);


app.post('/otp/:user_id',user.signInWithOtp)
app.get('/check_number/:num',user.check_number)
app.post('/googlesignup',user.googlsignup)
app.post('/googlesignin',user.signInWithgoogleEmail)
app.post('/verifyotp',user.verifyOtp)
app.get('/linktoemail/:user_id/:lab_id/:doctor_id', user.sendlinktoemail)
app.post('/verifing/:id/:token/:isUser', user.verifyemail)
app.post('/verifyresetlink/:id/:token', user.verifyresetlink)
app.post('/resetpass/:email', user.resetpass)
app.post('/updatepass/:password/:email', user.updatepass)

module.exports = app;
