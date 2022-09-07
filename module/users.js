const usermysqli = require("./usermysqli");
const mysqliClass = new usermysqli();

class Users {
  constructor() {}
  async singleUser(req) {
    let mysql = {};
    let escape_data = [req.params.user_id];
    let strQuery = await mysqliClass.mysqli(mysql, "singleUser");
    return await global.mysql.query(strQuery, escape_data);
  }
  async signup_user(req, encrypted) {
    let mysql = {};
    let escape_data = [req.body.email, encrypted];
    let strQuery = await mysqliClass.mysqli(mysql, "signup_user");
    return await global.mysql.query(strQuery, escape_data);
  }
  async login_user(req) {
    let mysql = {};
    let escape_data = [req.body.email];
    let strQuery = await mysqliClass.mysqli(mysql, "login_user");
    return await global.mysql.query(strQuery, escape_data);
  }
  async completedetails(req) {
    let mysql = {};
    let escape_data = Object.values(req.body);
    escape_data.push(req.params.user_id);
    try {
      let strQuery = await mysqliClass.mysqli(mysql, "completedetails");
      return await global.mysql.query(strQuery, escape_data);
    } catch (err) {
      console.log(err);
    }
  }
  async allappointments(req) {
    let mysql = {};
    let escape_data = [req.params.user_id];
    let strQuery = await mysqliClass.mysqli(mysql, "allappointments");
    return await global.mysql.query(strQuery, escape_data);
  }
  async appointment_details(req) {
    let mysql = {};
    let escape_data = [req.params.app_id, req.params.user_id];
    let strQuery = await mysqliClass.mysqli(mysql, "appointment_details");
    return await global.mysql.query(strQuery, escape_data);
  }
  async get_user_doc(req) {
    let mysql = {};
    let escape_data = [req];
    let strQuery = await mysqliClass.mysqli(mysql, "get_user_doc");
    return await global.mysql.query(strQuery, escape_data);
  }
  async get_user_lab(req) {
    let mysql = {};
    let escape_data = [req];
    let strQuery = await mysqliClass.mysqli(mysql, "get_user_lab");
    return await global.mysql.query(strQuery, escape_data);
  }
  async getsinglelabuser(req) {
    let mysql = {};
    let escape_data = [req.params.lab_id];
    let strQuery = await mysqliClass.mysqli(mysql, "getsinglelabuser");
    return await global.mysql.query(strQuery, escape_data);
  }
  async gettestdetails(req) {
    let mysql = {};
    let escape_data = [req.params.test_id];
    let strQuery = await mysqliClass.mysqli(mysql, "gettestdetails");
    return await global.mysql.query(strQuery, escape_data);
  }
  async makelabsappointment(req) {
    let mysql = {};
    let escape_data;
    escape_data = [
      req.body.user_id,
      req.body.Lab_id,
      req.body.Appointment_type,
      req.body.Appointment_time,
      req.body.Appointment_Date,
      req.payment_type,
      req.body.Test_id,
      req.body.message,
    ];
    let strQuery = await mysqliClass.mysqli(mysql, "makelabsappointment");
    return await global.mysql.query(strQuery, escape_data);
  }
  async total_doc() {
    let mysql = {};
    let escape_data;
    escape_data = [];
    let strQuery = await mysqliClass.mysqli(mysql, "total_doc");
    return await global.mysql.query(strQuery, escape_data);
  }

  async daily_visits() {
    let mysql = {};
    let escape_data;
    escape_data = [];
    let strQuery = await mysqliClass.mysqli(mysql, "daily_visits");
    return await global.mysql.query(strQuery, escape_data);
  }

  async visit_date() {
    let mysql = {};
    let escape_data;
    escape_data = [];
    let strQuery = await mysqliClass.mysqli(mysql, "visit_date");
    return await global.mysql.query(strQuery, escape_data);
  }

  async clear_count() {
    let mysql = {};
    let escape_data;
    escape_data = [];
    let strQuery = await mysqliClass.mysqli(mysql, "clear_count");
    return await global.mysql.query(strQuery, escape_data);
  }

  async increment_count() {
    let mysql = {};
    let escape_data;
    escape_data = [];
    let strQuery = await mysqliClass.mysqli(mysql, "increment_count");
    return await global.mysql.query(strQuery, escape_data);
  }

  async nearby_doctors(city) {
    let mysql = {};
    let escape_data = [city];
    let strQuery = await mysqliClass.mysqli(mysql, "nearby_doctors");
    return await global.mysql.query(strQuery, escape_data);
  }

  async nearby_labs(city) {
    let mysql = {};
    let escape_data;
    escape_data = [city];
    let strQuery = await mysqliClass.mysqli(mysql, "nearby_labs");
    return await global.mysql.query(strQuery, escape_data);
  }

  async our_specialists(city) {
    let mysql = {};
    let escape_data = [city];
    let strQuery = await mysqliClass.mysqli(mysql, "our_specialists");
    return await global.mysql.query(strQuery, escape_data);
  }

  async our_specialists_byfilter(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.body.specialization];
    let strQuery = await mysqliClass.mysqli(mysql, "our_specialists_byfilter");
    return await global.mysql.query(strQuery, escape_data);
  }
  async updateFlaguser(req) {
    let mysql = {};
    let escape_data = [req.params.id];
    let strQuery = await mysqliClass.mysqli(mysql, 'updateFlaguser');
    return await global.mysql.query(strQuery, escape_data);
  }
  async updateFlagdoctor(req) {
    let mysql = {};
    let escape_data = [req.params.id];
    let strQuery = await mysqliClass.mysqli(mysql, 'updateFlagdoctor');
    return await global.mysql.query(strQuery, escape_data);
  }
  async updateFlaglab(req) {
    let mysql = {};
    let escape_data = [req.params.id];
    let strQuery = await mysqliClass.mysqli(mysql, 'updateFlaglab');
    return await global.mysql.query(strQuery, escape_data);
  }

  async view_all_doctor_by_specialization(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.body.specialization];
    let strQuery = await mysqliClass.mysqli(
      mysql,
      "view_all_doctor_by_specialization"
    );
    return await global.mysql.query(strQuery, escape_data);
  }

  async view_all_h_t_l(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.body.state, req.body.specialization, req.body.order];
    let strQuery = await mysqliClass.mysqli(mysql, "view_all_h-t-l");
    return await global.mysql.query(strQuery, escape_data);
  }

  async view_all_gender(req) {
    let mysql = {};
    let escape_data;
    escape_data = [
      req.body.state,
      req.body.specialization,
      req.body.gender,
      req.body.order,
    ];
    let strQuery = await mysqliClass.mysqli(mysql, "view_all_gender");
    return await global.mysql.query(strQuery, escape_data);
  }

  async view_all_rating(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.body.state, req.body.specialization, req.body.order];
    let strQuery = await mysqliClass.mysqli(mysql, "view_all_rating");
    return await global.mysql.query(strQuery, escape_data);
  }

  async nearby_doc_h_t_l(city, req) {
    let mysql = {};
    let escape_data;
    escape_data = [
      city,
      req.body.state,
      req.body.specialization,
      req.body.order,
    ];
    let strQuery = await mysqliClass.mysqli(mysql, "nearby_doc_h-t-l");
    return await global.mysql.query(strQuery, escape_data);
  }

  async nearby_doc_gender(city, req) {
    let mysql = {};
    let escape_data;
    escape_data = [
      city,
      req.body.state,
      req.body.specialization,
      req.body.gender,
      req.body.order,
    ];
    let strQuery = await mysqliClass.mysqli(mysql, "nearby_doc_gender");
    return await global.mysql.query(strQuery, escape_data);
  }

  async nearby_doc_rating(city, req) {
    let mysql = {};
    let escape_data;
    escape_data = [
      city,
      req.body.state,
      req.body.specialization,
      req.body.order,
    ];
    let strQuery = await mysqliClass.mysqli(mysql, "nearby_doc_rating");
    return await global.mysql.query(strQuery, escape_data);
  }

  async experience_doc_h_t_l(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.body.state, req.body.specialization, req.body.order];
    let strQuery = await mysqliClass.mysqli(mysql, "experience_doc_h-t-l");
    return await global.mysql.query(strQuery, escape_data);
  }

  async experience_doc_gender(req) {
    let mysql = {};
    let escape_data;
    escape_data = [
      req.body.state,
      req.body.specialization,
      req.body.gender,
      req.body.order,
    ];
    let strQuery = await mysqliClass.mysqli(mysql, "experience_doc_gender");
    return await global.mysql.query(strQuery, escape_data);
  }

  async experience_doc_rating(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.body.state, req.body.specialization, req.body.order];
    let strQuery = await mysqliClass.mysqli(mysql, "experience_doc_rating");
    return await global.mysql.query(strQuery, escape_data);
  }

  async view_doc_profile(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.body.id];
    let strQuery = await mysqliClass.mysqli(mysql, "view_doc_profile");
    return await global.mysql.query(strQuery, escape_data);
  }

  async make_appointment(req) {
    let mysql = {};
    let escape_data;
    escape_data = [
      req.body.user_id,
      req.body.Doctor_id,
      req.body.Appointment_type,
      req.body.Appointment_time,
      req.body.Appointment_Date,
      req.body.message,
    ];
    let strQuery = await mysqliClass.mysqli(mysql, "make_appointment");
    return await global.mysql.query(strQuery, escape_data);
  }

  async give_stars(req) {
    let mysql = {};
    let escape_data;
    escape_data = [
      req.body.user_id,
      req.body.Doctor_id,
      req.body.Lab_id,
      req.body.Stars,
      req.body.review_text
    ];
    let strQuery = await mysqliClass.mysqli(mysql, "give_stars");
    return await global.mysql.query(strQuery, escape_data);
  }

  async popular_labs(req) {
    let mysql = {};
    let escape_data;
    escape_data = [];
    let strQuery = await mysqliClass.mysqli(mysql, "popular_labs");
    return await global.mysql.query(strQuery, escape_data);
  }

  async tests_by_labs(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.body.lab_id];
    let strQuery = await mysqliClass.mysqli(mysql, "tests_by_labs");
    return await global.mysql.query(strQuery, escape_data);
  }

  async package_by_labs(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.body.lab_id];
    let strQuery = await mysqliClass.mysqli(mysql, "package_by_labs");
    return await global.mysql.query(strQuery, escape_data);
  }

  async tests_by_search(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.body.search];
    let strQuery = await mysqliClass.mysqli(mysql, "tests_by_search");
    return await global.mysql.query(strQuery, escape_data);
  }

  async package_by_search(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.body.search];
    let strQuery = await mysqliClass.mysqli(mysql, "package_by_search");
    return await global.mysql.query(strQuery, escape_data);
  }

  async updateFlag(req) {
    let mysql = {};
    let escape_data = [req.params.id];
    let strQuery = await mysqliClass.mysqli(mysql, "updateFlag");
    return await global.mysql.query(strQuery, escape_data);
  }
  async save_token(token_mail_verification, req) {
    let mysql = {};
    let escape_data = [token_mail_verification, req.params.id];
    let strQuery = await mysqliClass.mysqli(mysql, "save_token");
    return await global.mysql.query(strQuery, escape_data);
  }

  async updatepass(password, req) {
    let mysql = {};
    let escape_data = [password, req.params.email];
    let strQuery = await mysqliClass.mysqli(mysql, "updatepass");
    return await global.mysql.query(strQuery, escape_data);
  }

  async paymentupdate(app_id) {
    let mysql = {};
    let escape_data = [app_id];
    let strQuery = await mysqliClass.mysqli(mysql, "paymentupdate");
    return await global.mysql.query(strQuery, escape_data);
  }
  async app_id_of_added_appointment() {
    let mysql = {};
    let strQuery = await mysqliClass.mysqli(
      mysql,
      "app_id_of_added_appointment"
    );
    return await global.mysql.query(strQuery);
  }
  async app_id_labappointment() {
    let mysql = {};
    let strQuery = await mysqliClass.mysqli(mysql, "app_id_labappointment");
    return await global.mysql.query(strQuery);
  }

  async save_tokenuser(token_mail_verification, req) {
    let mysql = {};
    let escape_data = [token_mail_verification,req.params.id];
    let strQuery = await mysqliClass.mysqli(mysql, 'save_tokenuser');
    return await global.mysql.query(strQuery, escape_data);
}
  async save_tokendoctor(token_mail_verification, req) {
    let mysql = {};
    let escape_data = [token_mail_verification,req.params.id];
    let strQuery = await mysqliClass.mysqli(mysql, 'save_tokendoctor');
    return await global.mysql.query(strQuery, escape_data);
  }
  async save_tokenlab(token_mail_verification, req) {
    let mysql = {};
    let escape_data = [token_mail_verification,req.params.id];
    let strQuery = await mysqliClass.mysqli(mysql, 'save_tokenlab');
    return await global.mysql.query(strQuery, escape_data);
  }
  async updatepassuser(password,req) {
    let mysql = {};
    let escape_data = [password,req.params.email];
    let strQuery = await mysqliClass.mysqli(mysql, 'updatepassuser');
    return await global.mysql.query(strQuery, escape_data);
}
  async updatepasslab(password,req) {
    let mysql = {};
    let escape_data = [password,req.params.email];
    let strQuery = await mysqliClass.mysqli(mysql, 'updatepasslab');
    return await global.mysql.query(strQuery, escape_data);
  }
  async updatepassdoctor(password,req) {
    let mysql = {};
    let escape_data = [password,req.params.email];
    let strQuery = await mysqliClass.mysqli(mysql, 'updatepassdoctor');
    return await global.mysql.query(strQuery, escape_data);
  }
  async clearreset_tokenuser(req) {
    let mysql = {};
    let escape_data = [req.params.email];
    let strQuery = await mysqliClass.mysqli(mysql, 'clearreset_tokenuser');
    return await global.mysql.query(strQuery, escape_data);
  }
  async clearreset_tokenlab(req) {
    let mysql = {};
    let escape_data = [req.params.email];
    let strQuery = await mysqliClass.mysqli(mysql, 'clearreset_tokenlab');
    return await global.mysql.query(strQuery, escape_data);
  }
  async clearreset_tokendoctor(req) {
    let mysql = {};
    let escape_data = [req.params.email];
    let strQuery = await mysqliClass.mysqli(mysql, 'clearreset_tokendoctor');
    return await global.mysql.query(strQuery, escape_data);
  }
}

module.exports = Users;
