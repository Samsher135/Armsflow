module.exports = class mysqli {
  async mysqli(data, row) {
    let k = mysqliq[row];
    for (var i in data) {
      k = k.replace(new RegExp("{{" + i + "}}", "g"), data[i]);
    }
    return k;
  }

  async sfqli(data, row) {
    let k = mysqliq[row];
    for (var i in data) {
      k = k.replace(new RegExp("{{" + i + "}}", "g"), data[i]);
    }
    return k;
  }
};

var mysqliq = [];
//user
mysqliq["signup_doctor"] =
  "insert into doctors(f_name,l_name,license_no,Email,C_password) values(?,?,?,?,?)";
mysqliq["login_doctor"] =
  "Select Email,C_password,id from doctors where doctors.Email = ?";

mysqliq["doc_profile"] = "SELECT id,f_name,l_name,age,gender,phone_no,whatsapp_no,Email FROM doctors WHERE id = ?"

mysqliq["doc_profile_details"] = "SELECT f_name,l_name,age,gender,phone_no,whatsapp_no,Email,degree,specialization,experience,license_no,h_block_no,area,city,state,pincode,reg_no,specification FROM doctors WHERE id = ?"
mysqliq["upt_doc_profile_details"] = "UPDATE `doctors` SET ? WHERE id = ?";

mysqliq["doc_patients_list"] = "SELECT DISTINCT(users.F_name),users.L_name,users.Age,users.Gender,users.Last_consultation,appointments.id as 'appointment_id',users.id as 'user_id' FROM users INNER JOIN appointments ON users.id = appointments.User_id WHERE appointments.Doctor_id = ? AND appointments.Appointment_type =?"
mysqliq["doc_remove_patients"] = "DELETE FROM `appointments` WHERE id = ?"
mysqliq["doc_patients_profile"] = "SELECT users.F_name,users.L_name,users.Age,users.Gender,users.Last_consultation,appointments.Appointment_type,appointments.Appointment_time,appointments.Appointment_Date,appointments.Payment_type FROM users INNER JOIN appointments ON users.id = appointments.User_id  WHERE appointments.id = ? AND appointments.Doctor_id = ?"

mysqliq["doc_appointments"] = "SELECT users.id,concat(users.F_name, ' ',users.L_name) as 'title',appointments.Appointment_type,appointments.Appointment_time AS 'startDate',DATE_ADD(appointments.Appointment_time, INTERVAL '30:0' MINUTE_SECOND) AS 'endDate',appointments.Appointment_Date FROM users INNER JOIN appointments ON users.id = appointments.User_id WHERE appointments.Doctor_id = ?";
mysqliq["doc_appointments_details"] = "SELECT users.F_name,users.L_name,users.age,users.gender,appointments.Appointment_type,appointments.Appointment_time AS 'start_time',DATE_ADD(appointments.Appointment_time, INTERVAL '30:0' MINUTE_SECOND) AS 'end_time',appointments.Appointment_Date FROM users INNER JOIN appointments ON users.id = appointments.User_id WHERE appointments.Doctor_id = ?";
mysqliq["count_doc_appointments"] = "SELECT COUNT(appointments.id) FROM users INNER JOIN appointments ON users.id = appointments.User_id WHERE appointments.Doctor_id = ?"

mysqliq["doc_availability"] = "SELECT consultation_prefer,online_slot,clinic_slot,consultation_charge FROM doctors WHERE id =?"
mysqliq["doc_update_availability"] = "UPDATE `doctors` SET ? WHERE id = ?"
mysqliq["doc_reviews"] = "SELECT users.F_name,users.L_name,reviews.Stars,reviews.Review_text FROM reviews INNER JOIN users ON reviews.User_id=users.id WHERE reviews.Doctor_id = ?"
