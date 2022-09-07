const doctormysqli = require("./doctormysqli");
const mysqliClass = new doctormysqli();

class Doctor {
  constructor() {}
  async signup_doctor(req, encrypted) {
    let mysql = {};
    const [f_name, l_name] = req.body.fullname.split(" ");
    let escape_data = [
      f_name,
      l_name,
      req.body.license_no,
      req.body.email,
      encrypted,
    ];

    let strQuery = await mysqliClass.mysqli(mysql, "signup_doctor");
    return await global.mysql.query(strQuery, escape_data);
  }
  async login_doctor(req) {
    let mysql = {};
    let escape_data = [req.body.email];
    let strQuery = await mysqliClass.mysqli(mysql, "login_doctor");
    return await global.mysql.query(strQuery, escape_data);
  }

  async doc_profile(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.params.doctor_id];
    let strQuery = await mysqliClass.mysqli(mysql, "doc_profile");
    return await global.mysql.query(strQuery, escape_data);
  }

  async doc_profile_details(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.body.doctor_id];
    let strQuery = await mysqliClass.mysqli(mysql, "doc_profile_details");
    return await global.mysql.query(strQuery, escape_data);
  }

  async upt_doc_profile_details(req, doctor_id) {
    console.log(req.body);
    var mdata = req.body;
    let mysql = {};
    let escape_data;
    escape_data = [mdata, doctor_id];
    let strQuery = await mysqliClass.mysqli(mysql, "upt_doc_profile_details");
    return await global.mysql.query(strQuery, escape_data);
  }
  // req.body.f_name,req.body.l_name,req.body.age,req.body.gender,req.body.phone_no,req.body.whatsapp_no,req.body.Email

  async doc_patients_list(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.body.doctor_id, req.body.Appointment_type];
    let strQuery = await mysqliClass.mysqli(mysql, "doc_patients_list");
    return await global.mysql.query(strQuery, escape_data);
  }

  async doc_remove_patients(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.body.appoint_id];
    let strQuery = await mysqliClass.mysqli(mysql, "doc_remove_patients");
    return await global.mysql.query(strQuery, escape_data);
  }

  async doc_patients_profile(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.body.appoint_id, req.body.doctor_id];
    let strQuery = await mysqliClass.mysqli(mysql, "doc_patients_profile");
    return await global.mysql.query(strQuery, escape_data);
  }

  async doc_appointments(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.body.doctor_id];
    let strQuery = await mysqliClass.mysqli(mysql, "doc_appointments");
    return await global.mysql.query(strQuery, escape_data);
  }

  async doc_appointments_details(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.body.doctor_id];
    let strQuery = await mysqliClass.mysqli(mysql, "doc_appointments_details");
    return await global.mysql.query(strQuery, escape_data);
  }

  async count_doc_appointments(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.body.doctor_id];
    let strQuery = await mysqliClass.mysqli(mysql, "count_doc_appointments");
    return await global.mysql.query(strQuery, escape_data);
  }

  async doc_availability(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.body.doctor_id];
    let strQuery = await mysqliClass.mysqli(mysql, "doc_availability");
    return await global.mysql.query(strQuery, escape_data);
  }

  async doc_update_availability(req, doctor_id) {
    let mysql = {};
    let escape_data;
    if (
      req.body.consultation_prefer &&
      !req.body.online_slot &&
      !req.body.clinic_slot &&
      !req.body.consultation_charge
    ) {
      var consult = JSON.stringify(req.body.consultation_prefer);
      var mdata = { consultation_prefer: consult };
      console.log(mdata, "1");
    } else if (
      req.body.online_slot &&
      !req.body.consultation_prefer &&
      !req.body.clinic_slot &&
      !req.body.consultation_charge
    ) {
      var slot = JSON.stringify(req.body.online_slot);
      var mdata = { online_slot: slot };
      console.log(mdata, "2");
    } else if (
      req.body.clinic_slot &&
      !req.body.consultation_prefer &&
      !req.body.online_slot &&
      !req.body.consultation_charge
    ) {
      var slot1 = JSON.stringify(req.body.clinic_slot);
      var mdata = { clinic_slot: slot1 };
      console.log(mdata, "3");
    } else if (
      req.body.consultation_charge &&
      !req.body.consultation_prefer &&
      !req.body.online_slot &&
      !req.body.clinic_slot
    ) {
      var charge = req.body.consultation_charge;
      var mdata = { consultation_charge: charge };
      console.log(mdata, "4");
    } else if (
      req.body.consultation_prefer &&
      req.body.online_slot &&
      !req.body.clinic_slot &&
      !req.body.consultation_charge
    ) {
      var consult = JSON.stringify(req.body.consultation_prefer);
      var slot = JSON.stringify(req.body.online_slot);
      console.log(slot);
      var mdata = { consultation_prefer: consult, online_slot: slot };
      console.log(mdata, "5");
    } else if (
      req.body.consultation_prefer &&
      req.body.clinic_slot &&
      !req.body.online_slot &&
      !req.body.consultation_charge
    ) {
      var consult = JSON.stringify(req.body.consultation_prefer);
      var slot = JSON.stringify(req.body.clinic_slot);
      console.log(slot);
      var mdata = { consultation_prefer: consult, clinic_slot: slot };
      console.log(mdata, "6");
    } else if (
      req.body.online_slot &&
      req.body.clinic_slot &&
      !req.body.consultation_prefer &&
      !req.body.consultation_charge
    ) {
      var slot1 = JSON.stringify(req.body.online_slot);
      var slot = JSON.stringify(req.body.clinic_slot);
      console.log(slot);
      var mdata = { online_slot: slot1, clinic_slot: slot };
      console.log(mdata, "7");
    } else if (
      req.body.consultation_prefer &&
      req.body.consultation_charge &&
      !req.body.online_slot &&
      !req.body.clinic_slot
    ) {
      var consult = JSON.stringify(req.body.consultation_prefer);
      var charge = req.body.consultation_charge;
      console.log(charge);
      var mdata = { consultation_prefer: consult, consultation_charge: charge };
      console.log(mdata, "8");
    } else if (
      req.body.online_slot &&
      req.body.consultation_charge &&
      !req.body.consultation_prefer &&
      !req.body.clinic_slot
    ) {
      var slot = JSON.stringify(req.body.online_slot);
      var charge = req.body.consultation_charge;
      console.log(charge);
      var mdata = { online_slot: slot, consultation_charge: charge };
      console.log(mdata, "9");
    } else if (
      req.body.clinic_slot &&
      req.body.consultation_charge &&
      !req.body.online_slot &&
      !req.body.consultation_prefer
    ) {
      var slot = JSON.stringify(req.body.clinic_slot);
      var charge = req.body.consultation_charge;
      console.log(charge);
      var mdata = { clinic_slot: slot, consultation_charge: charge };
      console.log(mdata, "10");
    } else if (
      req.body.consultation_prefer &&
      req.body.online_slot &&
      req.body.clinic_slot &&
      !req.body.consultation_charge
    ) {
      var consult = JSON.stringify(req.body.consultation_prefer);
      var slot = JSON.stringify(req.body.online_slot);
      var slot1 = JSON.stringify(req.body.clinic_slot);
      var mdata = {
        consultation_prefer: consult,
        online_slot: slot,
        clinic_slot: slot1,
      };
      console.log(mdata, "11");
    } else if (
      req.body.consultation_prefer &&
      req.body.online_slot &&
      req.body.consultation_charge &&
      !req.body.clinic_slot
    ) {
      var consult = JSON.stringify(req.body.consultation_prefer);
      var slot = JSON.stringify(req.body.online_slot);
      var charge = req.body.consultation_charge;
      var mdata = {
        consultation_prefer: consult,
        consultation_charge: charge,
        online_slot: slot,
      };
      console.log(mdata, "12");
    } else if (
      req.body.consultation_prefer &&
      req.body.clinic_slot &&
      req.body.consultation_charge &&
      !req.body.online_slot
    ) {
      var consult = JSON.stringify(req.body.consultation_prefer);
      var slot = JSON.stringify(req.body.clinic_slot);
      var charge = req.body.consultation_charge;
      var mdata = {
        consultation_prefer: consult,
        clinic_slot: slot,
        consultation_charge: charge,
      };
      console.log(mdata, "13");
    } else if (
      req.body.consultation_prefer &&
      req.body.online_slot &&
      req.body.consultation_charge &&
      !req.body.clinic_slot
    ) {
      var consult = JSON.stringify(req.body.consultation_prefer);
      var slot = JSON.stringify(req.body.online_slot);
      var charge = req.body.consultation_charge;
      var mdata = {
        consultation_prefer: consult,
        online_slot: slot,
        consultation_charge: charge,
      };
      console.log(mdata, "14");
    } else if (
      req.body.consultation_prefer &&
      req.body.online_slot &&
      req.body.clinic_slot &&
      req.body.consultation_charge
    ) {
      var consult = JSON.stringify(req.body.consultation_prefer);
      var slot = JSON.stringify(req.body.online_slot);
      var slot1 = JSON.stringify(req.body.clinic_slot);
      var charge = req.body.consultation_charge;
      var mdata = {
        consultation_prefer: consult,
        online_slot: slot,
        clinic_slot: slot1,
        consultation_charge: charge,
      };
      console.log(mdata, "15");
    }
    // var mdata = {[keys]:values};
    // console.log(mdata)
    escape_data = [mdata, doctor_id];
    // escape_data=[req.body.doctor_id]
    // console.log(escape_data,"escape data")
    let strQuery = await mysqliClass.mysqli(mysql, "doc_update_availability");
    return await global.mysql.query(strQuery, escape_data);
  }

  async doc_reviews(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.body.doctor_id];
    let strQuery = await mysqliClass.mysqli(mysql, "doc_reviews");
    return await global.mysql.query(strQuery, escape_data);
  }
}

module.exports = Doctor;
