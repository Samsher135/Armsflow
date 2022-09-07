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
mysqliq["singleUser"] = "select * from users where users.id = ?";
mysqliq["completedetails"] =
  "UPDATE users set F_name = ? , L_name=?,Age=?,Contact_no=?,Gender=?,House_no=?,Area=?, City=? , State = ?, Pincode = ?,Specification=? where users.id = ?";
mysqliq["signup_user"] = "INSERT into users(Email,C_password) VALUES(?,?)";
mysqliq["login_user"] =
  "Select id,Email,C_password,id from users where users.Email = ?";
mysqliq["allappointments"] =
  "SELECT appointments.id,case WHEN appointments.Doctor_id is null then labs.Lab_name else concat(doctors.f_name,' ',doctors.l_name) END as 'Doctors_name',Appointment_type, Appointment_at, Appointment_time, Appointment_Date, Payment_type from appointments left join doctors on appointments.Doctor_id = doctors.id  left join labs on appointments.Lab_id = labs.id where User_id = ?";
mysqliq["appointment_details"] =
  "SELECT appointments.id, concat(users.F_name,' ',users.L_name) as 'Patients_name', users.Age , users.Gender, Appointment_type , Appointment_at, Appointment_time , Appointment_Date , Payment_type , appointments.Doctor_id , appointments.Lab_id  from appointments left join users on appointments.User_id = users.id WHERE appointments.id = ? && appointments.User_id=?";
mysqliq["get_user_doc"] =
  "SELECT concat(f_name, ' ', l_name) as 'Name' , age , last_consultation , gender, specialization , concat_ws(' ',h_block_no,area,city,state) as 'Location', AVG(reviews.Stars) as 'rating', experience from doctors right join reviews on doctors.id = reviews.id WHERE doctors.id =? GROUP by reviews.Doctor_id ;";
mysqliq["get_user_lab"] = "";
mysqliq["getsinglelabuser"] = "Select * from labs where labs.id = ?";
mysqliq["gettestdetails"] = "SELECT * FROM tests WHERE id = ?";
mysqliq["makelabsappointment"] =
  "INSERT INTO `appointments`( `User_id`, `Lab_id`, `Appointment_type`,`Appointment_at`, `Appointment_time`, `Appointment_Date`, `Payment_type`, `Test_id`) VALUES (?,?,?,?,?,?,?,?)";

mysqliq["total_doc"] =
  "SELECT COUNT(doctors.id) as 'total_doctors', COUNT(tests.id) as 'total_tests' FROM doctors,tests";
mysqliq["visit_date"] = "SELECT date FROM visits where datediff(now(),date)=1";
mysqliq["clear_count"] = "UPDATE visits SET count=0 WHERE 1";
mysqliq["increment_count"] = "UPDATE visits set count = count+1";
mysqliq["daily_visits"] = "SELECT COUNT FROM visits";
mysqliq["nearby_doctors"] =
  "SELECT doctors.id,doctors.f_name,doctors.l_name,doctors.degree,doctors.specialization,doctors.experience,doctors.clinic_slot,doctors.consultation_charge,doctors.verified,(SELECT COUNT(reviews.id) FROM reviews WHERE reviews.Doctor_id = doctors.id) AS 'total_reviews',(SELECT AVG(reviews.Stars) FROM reviews WHERE reviews.Doctor_id = doctors.id) AS 'stars' FROM doctors WHERE doctors.city=?";
mysqliq["nearby_labs"] =
  "SELECT labs.Lab_name,labs.H_no,labs.Area,labs.City,labs.State,labs.Pincode,(SELECT COUNT(reviews.id) FROM reviews WHERE reviews.Lab_id = labs.id) AS 'total_reviews',(SELECT AVG(reviews.Stars) FROM reviews WHERE reviews.Lab_id = labs.id) AS 'stars' FROM labs WHERE labs.City=?";

mysqliq["our_specialists"] = "SELECT DISTINCT(specialization) FROM doctors";
mysqliq["our_specialists_byfliter"] =
  "SELECT specialization FROM doctors WHERE specialization = ?";

mysqliq["view_all_doctor_by_specialization"] =
  "SELECT doctors.id,doctors.f_name,doctors.l_name,doctors.degree,doctors.gender,doctors.state,doctors.specialization,doctors.experience,doctors.clinic_slot,doctors.consultation_charge,doctors.verified,(SELECT COUNT(reviews.id) FROM reviews WHERE reviews.Doctor_id = doctors.id) AS 'total_reviews',(SELECT AVG(reviews.Stars) FROM reviews WHERE reviews.Doctor_id = doctors.id) AS 'stars' FROM doctors WHERE doctors.specialization = ?";

mysqliq["view_all_h-t-l"] =
  "SELECT doctors.id,doctors.f_name,doctors.l_name,doctors.degree,doctors.specialization,doctors.experience,doctors.clinic_slot,doctors.consultation_charge,doctors.verified,COUNT(reviews.id),AVG(reviews.Stars) FROM doctors INNER JOIN reviews ON doctors.id = reviews.Doctor_id WHERE doctors.state= ? AND doctors.specialization = ? ORDER BY doctors.consultation_charge ?";
mysqliq["view_all_gender"] =
  "SELECT doctors.id,doctors.f_name,doctors.l_name,doctors.degree,doctors.specialization,doctors.experience,doctors.clinic_slot,doctors.consultation_charge,doctors.verified,COUNT(reviews.id),AVG(reviews.Stars) FROM doctors INNER JOIN reviews ON doctors.id = reviews.Doctor_id WHERE doctors.state=? AND doctors.specialization = ? AND doctors.gender = ?";
mysqliq["view_all_rating"] =
  "SELECT doctors.id,doctors.f_name,doctors.l_name,doctors.degree,doctors.specialization,doctors.experience,doctors.clinic_slot,doctors.consultation_charge,doctors.verified,COUNT(reviews.id),AVG(reviews.Stars) FROM doctors INNER JOIN reviews ON doctors.id = reviews.Doctor_id WHERE doctors.state=? AND doctors.specialization = ? AND reviews.Stars>=4";

mysqliq["nearby_doc_h-t-l"] =
  "SELECT doctors.id,doctors.f_name,doctors.l_name,doctors.degree,doctors.specialization,doctors.experience,doctors.clinic_slot,doctors.consultation_charge,doctors.verified,COUNT(reviews.id),AVG(reviews.Stars) FROM doctors INNER JOIN reviews ON doctors.id = reviews.Doctor_id WHERE doctors.city=? AND doctors.state=? AND doctors.specialization = ? ORDER BY doctors.consultation_charge ?";
mysqliq["nearby_doc_gender"] =
  "SELECT doctors.id,doctors.f_name,doctors.l_name,doctors.degree,doctors.specialization,doctors.experience,doctors.clinic_slot,doctors.consultation_charge,doctors.verified,COUNT(reviews.id),AVG(reviews.Stars) FROM doctors INNER JOIN reviews ON doctors.id = reviews.Doctor_id WHERE doctors.city=? AND doctors.state=? AND doctors.specialization = ? AND doctors.gender = ?";
mysqliq["nearby_doc_rating"] =
  "SELECT doctors.id,doctors.f_name,doctors.l_name,doctors.degree,doctors.specialization,doctors.experience,doctors.clinic_slot,doctors.consultation_charge,doctors.verified,COUNT(reviews.id),AVG(reviews.Stars) FROM doctors INNER JOIN reviews ON doctors.id = reviews.Doctor_id WHERE doctors.city=? AND doctors.state=? AND doctors.specialization = ? AND reviews.Stars>=4";

mysqliq["experience_doc_h-t-l"] =
  "SELECT doctors.id,doctors.f_name,doctors.l_name,doctors.degree,doctors.specialization,doctors.experience,doctors.clinic_slot,doctors.consultation_charge,doctors.verified,COUNT(reviews.id),AVG(reviews.Stars) FROM doctors INNER JOIN reviews ON doctors.id = reviews.Doctor_id WHERE doctors.state=? AND doctors.specialization = ? ORDER BY doctors.consultation_charge ?,doctors.experience DESC";
mysqliq["experience_doc_gender"] =
  "SELECT doctors.id,doctors.f_name,doctors.l_name,doctors.degree,doctors.specialization,doctors.experience,doctors.clinic_slot,doctors.consultation_charge,doctors.verified,COUNT(reviews.id),AVG(reviews.Stars) FROM doctors INNER JOIN reviews ON doctors.id = reviews.Doctor_id WHERE doctors.state=? AND doctors.specialization = ? AND doctors.gender = ? ORDER BY doctors.experience DESC";
mysqliq["experience_doc_rating"] =
  "SELECT doctors.id,doctors.f_name,doctors.l_name,doctors.degree,doctors.specialization,doctors.experience,doctors.clinic_slot,doctors.consultation_charge,doctors.verified,COUNT(reviews.id),AVG(reviews.Stars) FROM doctors INNER JOIN reviews ON doctors.id = reviews.Doctor_id WHERE doctors.state=? AND doctors.specialization = ? AND reviews.Stars>=4 ORDER BY doctors.experience DESC";

mysqliq["view_doc_profile"] =
  "SELECT doctors.id,doctors.f_name,doctors.l_name,doctors.age,doctors.gender,doctors.degree,doctors.specialization,doctors.experience,doctors.h_block_no,doctors.area,doctors.city,doctors.state,doctors.pincode,doctors.clinic_slot,doctors.clinic_slot AS 'available_time',doctors.consultation_charge,doctors.verified,(SELECT COUNT(reviews.id) FROM reviews WHERE reviews.Doctor_id = doctors.id) AS 'total_reviews',(SELECT AVG(reviews.Stars) FROM reviews WHERE reviews.Doctor_id = doctors.id) AS 'stars' FROM doctors WHERE doctors.id = ?";
mysqliq["make_appointment"] =
  "INSERT INTO `appointments`(`User_id`, `Doctor_id`,`Appointment_type`, `Appointment_time`, `Appointment_Date`,`message`) VALUES (?,?,?,?,?,?)";

mysqliq["give_stars"] =
  "INSERT INTO `reviews`(`User_id`, `Doctor_id`, `Lab_id`, `Stars`,`Review_text`) VALUES (?,?,?,?,?)";

mysqliq["popular_labs"] =
  "SELECT DISTINCT(labs.id), labs.Lab_name FROM reviews INNER JOIN labs ON labs.id = reviews.Lab_id ORDER BY reviews.Stars DESC";
mysqliq["tests_by_labs"] =
  "SELECT tests.id as 'test_id',tests.Test_name,tests.Cost,labs.id,labs.op_days,labs.start_time,labs.end_time,labs.State,(SELECT COUNT(reviews.id) FROM reviews WHERE reviews.Lab_id = labs.id) AS 'total_reviews',(SELECT AVG(reviews.Stars) FROM reviews WHERE reviews.Lab_id = labs.id) AS 'stars' FROM tests INNER JOIN labs ON labs.id = tests.lab_id WHERE labs.id = ?";
mysqliq["package_by_labs"] =
  "SELECT package.id as 'package_id',package.Package_name,package.Cost,labs.id,labs.op_days,labs.start_time,labs.end_time,labs.State,(SELECT COUNT(reviews.id) FROM reviews WHERE reviews.Lab_id = labs.id) AS 'total_reviews',(SELECT AVG(reviews.Stars) FROM reviews WHERE reviews.Lab_id = labs.id) AS 'stars' FROM package INNER JOIN labs ON labs.id = package.lab_id WHERE package.lab_id = ?";
mysqliq["tests_by_search"] =
  "SELECT tests.id as 'test_id',tests.Test_name,tests.Cost,labs.id,labs.op_days,labs.start_time,labs.end_time,labs.State,(SELECT COUNT(reviews.id) FROM reviews WHERE reviews.Lab_id = labs.id) AS 'total_reviews',(SELECT AVG(reviews.Stars) FROM reviews WHERE reviews.Lab_id = labs.id) AS 'stars' FROM tests INNER JOIN labs ON labs.id = tests.lab_id WHERE tests.Test_name = ?";
mysqliq["package_by_search"] =
  "SELECT package.id as 'package_id',package.Package_name,package.Cost,labs.id,labs.op_days,labs.start_time,labs.end_time,labs.State,(SELECT COUNT(reviews.id) FROM reviews WHERE reviews.Lab_id = labs.id) AS 'total_reviews',(SELECT AVG(reviews.Stars) FROM reviews WHERE reviews.Lab_id = labs.id) AS 'stars' FROM package INNER JOIN labs ON labs.id = package.lab_id WHERE package.Package_name = ?";
mysqliq['updateFlaguser'] = 'UPDATE users SET isverified="True" WHERE id=?';
mysqliq['updateFlagdoctor'] = 'UPDATE doctors SET isverified="True" WHERE id=?';
mysqliq['updateFlaglab'] = 'UPDATE labs SET isverified="True" WHERE id=?';
mysqliq["paymentupdate"] =
  "UPDATE appointments SET payment = TRUE WHERE appointments.id = ?";
mysqliq["app_id_of_added_appointment"] =
  "SELECT MAX(appointments.id) as 'Appointment_id' , doctors.consultation_charge FROM appointments join doctors on appointments.Doctor_id = doctors.id";
mysqliq["app_id_labappointment"] =
  "SELECT MAX(appointments.id) as 'Appointment_id' from appointments";

  mysqliq['save_tokenuser'] = 'UPDATE users SET reset_token=? WHERE id=?';
  mysqliq['save_tokendoctor'] = 'UPDATE doctors SET reset_token=? WHERE id=?';
  mysqliq['save_tokenlab'] = 'UPDATE labs SET reset_token=? WHERE id=?';

