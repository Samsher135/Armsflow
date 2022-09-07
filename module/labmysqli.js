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
mysqliq["signup_lab"] =
  "Insert into labs(Lab_name,Registration_no,Email,C_password) values(?,?,?,?)";
mysqliq["login_lab"] =
  "Select Email,C_password,id from labs where labs.Email = ?";
mysqliq["getsinglelab"] = "Select * from labs where labs.id = ?";
mysqliq["savelabdata"] =
  "UPDATE labs set Contact= ?, Experience = ? ,H_no = ?, Area = ?, City = ?, State = ?, Pincode = ?, Specification = ? WHERE labs.id = ?";
mysqliq["savelabaccountdetails"] =
  "UPDATE labs set Acc_name = ?, IFSC_code = ?, Account_no =? , PAN_no = ?, UPI =? WHERE id = ?";
mysqliq["labreviews"] =
  "SELECT Review_text , Stars , concat(users.F_name, ' ',users.L_name) as 'Name' from reviews left join users on reviews.User_id = users.id WHERE Lab_id = ?;";
mysqliq["appointment_lab"] =
  "SELECT  appointments.id as 'Appointment_id', concat(users.F_name, ' ' ,users.L_name) as 'Patient_name' , tests.Test_name , Appointment_at, Appointment_Date , Appointment_time, Payment_type from appointments left join users on appointments.User_id = users.id left join tests on appointments.Test_id = tests.id where appointments.Lab_id = ?";
mysqliq["getlabappointmentdetails"] =
  "select concat(users.F_name,' ' ,users.L_name) as 'Patient_Name' , concat_ws(' ',users.House_no,users.Area,users.City,users.State,users.Pincode) as 'Address',Appointment_Date,appointments.id as 'Appointment_id', Appointment_time, users.Contact_no,Appointment_at , Payment_type , tests.Test_name, tests.Cost , tests.in_package from appointments left join users on appointments.User_id = users.id left join tests on appointments.Test_id = tests.id where appointments.Lab_id=? && appointments.id=?";
mysqliq["inserttest"] =
  "INSERT into tests(Test_name, Parameters_covered, Category, Report_availibility, Other_info,cost,lab_id) values(?,?,?,?,?,?,?);";
mysqliq["labtests"] = "SELECT Test_name , Cost from tests WHERE lab_id = ?";
mysqliq["insertpackage"] =
  "INSERT into package(Package_name, Parameters_covered, Category, Report_availibility, Cost, Other_info,lab_id) VALUES (?,?,?,?,?,?,?);";
mysqliq["labpackages"] =
  "SELECT Package_name , Cost from package WHERE lab_id = ?";
mysqliq["patient_list"] =
  "SELECT appointments.id AS 'appointment_id', appointments.User_id ,users.id as patient_id, concat(users.F_name , ' ',users.L_name) as 'Patients_name', users.Age , users.Gender ,max( Appointment_Date) as 'Last Consultated' from appointments left join users on appointments.User_id = users.id WHERE appointments.Lab_id = ? GROUP by appointments.User_id;";
mysqliq["patient_list_single_patient"] =
  "SELECT  concat(users.F_name , ' ',users.L_name) as 'Patients_name', users.Age , users.Gender ,Appointment_Date from appointments join users on appointments.User_id = users.id WHERE appointments.Lab_id = ? && appointments.User_id = ? ORDER by Appointment_Date DESC";
mysqliq["labs_availability"] = "SELECT test_prefer,op_days,start_time,end_time FROM labs WHERE id = ?"
mysqliq["labs_update_availability"] = "UPDATE `labs` SET ? WHERE id = ?"
mysqliq["lab_remove_patients"] = "DELETE FROM `appointments` WHERE id = ?"
