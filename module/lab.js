const labmysqli = require("./labmysqli");
const mysqliClass = new labmysqli();

class Lab {
  constructor() {}
  async signup_lab(req, encrypted) {
    let mysql = {};
    let escape_data = [
      req.body.labname,
      req.body.registration_no,
      req.body.email,
      encrypted,
    ];
    let strQuery = await mysqliClass.mysqli(mysql, "signup_lab");
    return await global.mysql.query(strQuery, escape_data);
  }
  async login_lab(req) {
    let mysql = {};
    let escape_data = [req.body.email];
    let strQuery = await mysqliClass.mysqli(mysql, "login_lab");
    return await global.mysql.query(strQuery, escape_data);
  }
  async getsinglelab(req) {
    let mysql = {};
    let escape_data = [req.params.lab_id];
    let strQuery = await mysqliClass.mysqli(mysql, "getsinglelab");
    return await global.mysql.query(strQuery, escape_data);
  }
  async savelabdata(req) {
    let mysql = {};
    let escape_data = Object.values(req.body);
    escape_data.push(req.params.lab_id);
    let strQuery = await mysqliClass.mysqli(mysql, "savelabdata");
    return await global.mysql.query(strQuery, escape_data);
  }
  async savelabaccountdetails(req) {
    let mysql = {};
    let escape_data = Object.values(req.body);
    escape_data.push(req.params.lab_id);
    let strQuery = await mysqliClass.mysqli(mysql, "savelabaccountdetails");
    return await global.mysql.query(strQuery, escape_data);
  }
  async labreviews(req) {
    let mysql = {};
    let escape_data = [req.params.lab_id];
    let strQuery = await mysqliClass.mysqli(mysql, "labreviews");
    return await global.mysql.query(strQuery, escape_data);
  }
  async appointment_lab(req) {
    let mysql = {};
    let escape_data = [req.params.lab_id];
    let strQuery = await mysqliClass.mysqli(mysql, "appointment_lab");
    return await global.mysql.query(strQuery, escape_data);
  }

  async getlabappointmentdetails(req) {
    let mysql = {};
    let escape_data = [req.params.lab_id, req.params.app_id];
    let strQuery = await mysqliClass.mysqli(mysql, "getlabappointmentdetails");
    return await global.mysql.query(strQuery, escape_data);
  }
  async inserttest(req) {
    let mysql = {};
    let escape_data = Object.values(req.body);
    escape_data.push(req.params.lab_id);
    let strQuery = await mysqliClass.mysqli(mysql, "inserttest");
    return await global.mysql.query(strQuery, escape_data);
  }
  async labtests(req) {
    let mysql = {};
    let escape_data = [req.params.lab_id];
    let strQuery = await mysqliClass.mysqli(mysql, "labtests");
    return await global.mysql.query(strQuery, escape_data);
  }
  async insertpackage(req) {
    let mysql = {};
    let escape_data = Object.values(req.body);
    escape_data.push(req.params.lab_id);
    let strQuery = await mysqliClass.mysqli(mysql, "insertpackage");
    return await global.mysql.query(strQuery, escape_data);
  }
  async labpackages(req) {
    let mysql = {};
    let escape_data = [req.params.lab_id];
    let strQuery = await mysqliClass.mysqli(mysql, "labpackages");
    return await global.mysql.query(strQuery, escape_data);
  }
  async patient_list(req) {
    let mysql = {};
    let escape_data = [req.params.lab_id];
    let strQuery = await mysqliClass.mysqli(mysql, "patient_list");
    return await global.mysql.query(strQuery, escape_data);
  }
  async patient_list_single_patient(req) {
    let mysql = {};
    let escape_data = [req.params.lab_id, req.params.user_id];
    let strQuery = await mysqliClass.mysqli(
      mysql,
      "patient_list_single_patient"
    );
    return await global.mysql.query(strQuery, escape_data);
  }
  async labs_availability(req) {
    let mysql = {};
    let escape_data;
    escape_data = [req.body.labs_id];
    let strQuery = await mysqliClass.mysqli(mysql, 'labs_availability');
    return await global.mysql.query(strQuery, escape_data);
}

async lab_remove_patients(req) {
  let mysql = {};
  let escape_data;
  escape_data = [req.body.appoint_id];
  let strQuery = await mysqliClass.mysqli(mysql, "lab_remove_patients");
  return await global.mysql.query(strQuery, escape_data);
}

async labs_update_availability(req, id) {
    let mysql = {};
    let escape_data;
    if(req.body.test_prefer && !req.body.op_days && !req.body.start_time && !req.body.end_time){
        var consult = JSON.stringify(req.body.test_prefer)
        var mdata = {test_prefer:consult};
        console.log(mdata, "1")
    }else if(req.body.op_days && !req.body.test_prefer && !req.body.start_time && !req.body.end_time){
        var slot = JSON.stringify(req.body.op_days)
        var mdata = {op_days:slot};
        console.log(mdata, "2")
    }else if(req.body.start_time && !req.body.test_prefer && !req.body.op_days && !req.body.end_time){
        var slot1 = req.body.start_time
        var mdata = {start_time:slot1};
        console.log(mdata, "3")
    }else if(req.body.end_time && !req.body.test_prefer && !req.body.op_days && !req.body.start_time){
        var charge = req.body.end_time
        var mdata = {end_time:charge};
        console.log(mdata, "4")
    }else if(req.body.test_prefer && req.body.op_days && !req.body.start_time && !req.body.end_time){
        var consult = JSON.stringify(req.body.test_prefer)
        var slot = JSON.stringify(req.body.op_days)
        console.log(slot)
        var mdata = {test_prefer:consult,op_days:slot};
        console.log(mdata, "5")
    }else if(req.body.test_prefer && req.body.start_time && !req.body.op_days && !req.body.end_time){
        var consult = JSON.stringify(req.body.test_prefer)
        var slot = req.body.start_time
        console.log(slot)
        var mdata = {test_prefer:consult,start_time:slot};
        console.log(mdata, "6") 
    }else if(req.body.op_days && req.body.start_time && !req.body.test_prefer && !req.body.end_time){
        var slot1 = JSON.stringify(req.body.op_days)
        var slot = req.body.start_time
        console.log(slot)
        var mdata = {op_days:slot1,start_time:slot};
        console.log(mdata, "7") 
    }else if(req.body.test_prefer && req.body.end_time && !req.body.op_days && !req.body.start_time){
        var consult = JSON.stringify(req.body.test_prefer)
        var charge = req.body.end_time
        console.log(charge)
        var mdata = {test_prefer:consult,end_time:charge};
        console.log(mdata, "8") 
    }else if(req.body.op_days && req.body.end_time && !req.body.test_prefer && !req.body.start_time){
        var slot = JSON.stringify(req.body.op_days)
        var charge = req.body.end_time
        console.log(charge)
        var mdata = {op_days:slot,end_time:charge};
        console.log(mdata, "9") 
    }else if(req.body.start_time && req.body.end_time && !req.body.op_days && !req.body.test_prefer){
        var slot = req.body.start_time
        var charge = req.body.end_time
        console.log(charge)
        var mdata = {start_time:slot,end_time:charge};
        console.log(mdata, "10") 
    }else if(req.body.test_prefer && req.body.op_days && req.body.start_time && !req.body.end_time){
        var consult = JSON.stringify(req.body.test_prefer)
        var slot = JSON.stringify(req.body.op_days)
        var slot1 = req.body.start_time
        var mdata = {test_prefer:consult,op_days:slot,start_time:slot1};
        console.log(mdata, "11")
    }else if(req.body.test_prefer && req.body.op_days && req.body.end_time && !req.body.start_time){
        var consult = JSON.stringify(req.body.test_prefer)
        var slot = JSON.stringify(req.body.op_days)
        var charge = req.body.end_time
        var mdata = {test_prefer:consult,end_time:charge,op_days:slot}
        console.log(mdata, "12")
    }else if(req.body.test_prefer && req.body.start_time && req.body.end_time && !req.body.op_days){
        var consult = JSON.stringify(req.body.test_prefer)
        var slot = req.body.start_time
        var charge = req.body.end_time
        var mdata = {test_prefer:consult,start_time:slot,end_time:charge};
        console.log(mdata, "13")
    }else if(req.body.test_prefer && req.body.op_days && req.body.end_time && !req.body.start_time){
        var consult = JSON.stringify(req.body.test_prefer)
        var slot = JSON.stringify(req.body.op_days)
        var charge = req.body.end_time
        var mdata = {test_prefer:consult,op_days:slot,end_time:charge};
        console.log(mdata, "14")
    }else if(req.body.test_prefer && req.body.op_days && req.body.start_time && req.body.end_time){
        var consult = JSON.stringify(req.body.test_prefer)
        var slot = JSON.stringify(req.body.op_days)
        var slot1 = req.body.start_time
        var charge = req.body.end_time
        var mdata = {test_prefer:consult,op_days:slot,start_time:slot1,end_time:charge};
        console.log(mdata, "15")
    }
    // var mdata = {[keys]:values};
    // console.log(mdata)
    escape_data = [mdata,id];
    // escape_data=[req.body.id]
    // console.log(escape_data,"escape data")
    let strQuery = await mysqliClass.mysqli(mysql, 'labs_update_availability');
    return await global.mysql.query(strQuery, escape_data);
}

}

module.exports = Lab;
