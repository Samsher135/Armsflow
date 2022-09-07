const { jsonResponse } = require("./commonController");
const bcrypt = require("bcrypt");

const usersModule = require("../module/users");
const users = new usersModule();

const doctorModule = require("../module/doctor");
const doctor = new doctorModule();

const labModule = require("../module/lab");
const lab = new labModule();

const jwt = require("jsonwebtoken");
const request = require("request");
const ejs = require("ejs");
const { initPayment, responsePayment } = require("../paytm/services/index");
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


require("dotenv").config();

var ACCESS_TOKEN =
  "pk.eyJ1Ijoic2Ftc2hlcjEzNSIsImEiOiJja3F0ZGNtZHgwNnJkMnRsemV4ZzF0N29oIn0.NBLQel2uIeyQFB2k0PFNOA";

module.exports = {
  users: async (req, res) => {
    try {
      let [results] = await Promise.all([users.getUsersDetails()]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  singleUser: async (req, res) => {
    try {
      let [results] = await Promise.all([users.singleUser(req)]);
      jsonResponse(res, "details", results);
    } catch (err) {
      jsonResponse(res, "error", err);
    }
  },
  signup_user: async (req, res) => {
    try {
      let [checking] = await Promise.all([users.login_user(req)]);
      if (checking[0]) {
        jsonResponse(res, "user_already_exists_please_login");
      } else {
        bcrypt.hash(req.body.password, 12, async function (err, encrypted) {
          if (err) {
            jsonResponse(res, "error", err);
          } else {
            try {
              await Promise.all([users.signup_user(req, encrypted)]);
              const [getting_id] = await Promise.all([users.login_user(req)]);
              const jwtinfo = {
                id: getting_id[0].id,
                user: "user",
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
      jsonResponse(res, "Cannot_match_database_for_duplication", err);
    }
  },

  completedetails: async (req, res) => {
    try {
      await Promise.all([users.completedetails(req)]);
      jsonResponse(res, "details saved");
    } catch (err) {
      jsonResponse(res, "error in saving details", err);
    }
  },

  allappointments: async (req, res) => {
    try {
      let [results] = await Promise.all([users.allappointments(req)]);
      jsonResponse(res, "Successed in making appointments", results);
    } catch (err) {
      jsonResponse(res, "error", err);
    }
  },
  appointment_details: async (req, res) => {
    try {
      let [results] = await Promise.all([users.appointment_details(req)]);
      let extradata;
      if (results[0].Doctor_id) {
        try {
          [extradata] = await Promise.all([
            users.get_user_doc(results[0].Doctor_id),
          ]);
        } catch (err) {
          jsonResponse(res, "error", err);
        }
      } else {
        [extradata] = await Promise.all([
          users.get_user_lab(results[0].Lab_id),
        ]);
      }
      jsonResponse(res, `Details of ${req.params.app_id} is`, [
        results[0],
        extradata[0],
      ]);
    } catch (err) {
      jsonResponse(res, "Error", err);
    }
  },
  getsinglelabuser: async (req, res) => {
    try {
      let [results] = await Promise.all([users.getsinglelabuser(req)]);
      jsonResponse(res, "details1", results);
    } catch (err) {
      jsonResponse(res, "error", err);
    }
  },
  gettestdetails: async (req, res) => {
    try {
      let [results] = await Promise.all([users.gettestdetails(req)]);
      jsonResponse(res, "details1", results);
    } catch (err) {
      jsonResponse(res, "error", err);
    }
  },
  makelabsappointment: async (req, res) => {
    try {
      req.body.user_id =
        typeof req.params.user_id === "undefined" ? 0 : req.params.user_id;
      req.body.Lab_id =
        typeof req.params.Lab_id === "undefined" ? 0 : req.params.Lab_id;
      req.body.Test_id =
        typeof req.params.Test_id === "undefined" ? 0 : req.params.Test_id;
      await Promise.all([users.makelabsappointment(req)]);
      let [results] = await Promise.all([users.app_id_labappointment(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  total_doc: async (req, res) => {
    try {
      let [results] = await Promise.all([users.total_doc(req)]);
      jsonResponse(res, "succces", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  increment_count: async (req, res) => {
    try {
      let [date] = await Promise.all([users.visit_date(req)]);
      console.log(date[0]);
      if (date[0]) {
        await Promise.all([users.clear_count()]);
      }
      let [results] = await Promise.all([users.increment_count(req)]);
      jsonResponse(res, "succces", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  daily_visits: async (req, res) => {
    try {
      let [results] = await Promise.all([users.daily_visits(req)]);
      jsonResponse(res, "succces", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  nearby_doctors: async (req, res) => {
    try {
      let { latitude, longitude } = req.query;
      console.log(latitude, longitude);
      var url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${ACCESS_TOKEN}`;
      request({ url: url, json: true }, async function (error, response) {
        if (error) {
          console.log("Unable to connect to Geocode API");
        } else if (response.body.features.length == 0) {
          console.log(
            "Unable to find location. Try to" + " search another location."
          );
        } else {
          console.log(response.body.features[0].context[1].text);
        }
        var city = response.body.features[0].context[1].text;
        console.log(city);
        let [results] = await Promise.all([users.nearby_doctors(city)]);
        for (i of results){
          if (i.clinic_slot) {
            x = JSON.parse(i.clinic_slot);
            y = x[0];
            i.available_days = JSON.stringify(y.op_days);
            i.available_time = y.time;
          }else{
            i.available_days = "Null"
            i.available_time = "Null";
          }
          }
        jsonResponse(res, "succces", results);
      });
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  nearby_labs: async (req, res) => {
    try {
      let { latitude, longitude } = req.query;
      var url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${ACCESS_TOKEN}`;
      request({ url: url, json: true }, async function (error, response) {
        if (error) {
          console.log("Unable to connect to Geocode API");
        } else if (response.body.features.length == 0) {
          console.log(
            "Unable to find location. Try to" + " search another location."
          );
        } else {
          console.log(response.body.features[0].context[1].text);
        }
        var city = response.body.features[0].context[1].text;
        let [results] = await Promise.all([users.nearby_labs(city)]);
        jsonResponse(res, "succces", results);
      });
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  our_specialists: async (req, res) => {
    try {
      let [results] = await Promise.all([users.our_specialists(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  our_specialists_byfilter: async (req, res) => {
    try {
      req.body.specialization =
        typeof req.params.specialization === "undefined"
          ? 0
          : req.params.specialization;
      let [results] = await Promise.all([users.our_specialists_byfilter(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  view_all_doctor_by_specialization: async (req, res) => {
    try {
      req.body.specialization =
        typeof req.params.specialization === "undefined"
          ? 0
          : req.params.specialization;
      let [results] = await Promise.all([
        users.view_all_doctor_by_specialization(req),
      ]);
      for (i of results){
      if (i.clinic_slot) {
        x = JSON.parse(i.clinic_slot);
        y = x[0];
        i.available_days = JSON.stringify(y.op_days);
        i.available_time = y.time;
      }else{
        i.available_days = "Null"
        i.available_time = "Null";
      }
      }
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  view_all_h_t_l: async (req, res) => {
    try {
      req.body.state =
        typeof req.params.state === "undefined" ? 0 : req.params.state;
      req.body.specialization =
        typeof req.params.specialization === "undefined"
          ? 0
          : req.params.specialization;
      req.body.order =
        typeof req.params.order === "undefined" ? 0 : req.params.order;
      let [results] = await Promise.all([users.view_all_h_t_l(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  view_all_gender: async (req, res) => {
    try {
      req.body.state =
        typeof req.params.state === "undefined" ? 0 : req.params.state;
      req.body.specialization =
        typeof req.params.specialization === "undefined"
          ? 0
          : req.params.specialization;
      req.body.gender =
        typeof req.params.gender === "undefined" ? 0 : req.params.gender;
      req.body.order =
        typeof req.params.order === "undefined" ? 0 : req.params.order;
      let [results] = await Promise.all([users.view_all_gender(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  view_all_rating: async (req, res) => {
    try {
      req.body.state =
        typeof req.params.state === "undefined" ? 0 : req.params.state;
      req.body.specialization =
        typeof req.params.specialization === "undefined"
          ? 0
          : req.params.specialization;
      req.body.order =
        typeof req.params.order === "undefined" ? 0 : req.params.order;
      let [results] = await Promise.all([users.view_all_rating(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  nearby_doc_h_t_l: async (req, res) => {
    try {
      req.body.state =
        typeof req.params.state === "undefined" ? 0 : req.params.state;
      req.body.specialization =
        typeof req.params.specialization === "undefined"
          ? 0
          : req.params.specialization;
      req.body.order =
        typeof req.params.order === "undefined" ? 0 : req.params.order;
      var latitude = 19.21882;
      var longitude = 73.152125;

      var url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        longitude +
        ", " +
        latitude +
        ".json?access_token=" +
        ACCESS_TOKEN;

      request({ url: url, json: true }, async function (error, response) {
        if (error) {
          console.log("Unable to connect to Geocode API");
        } else if (response.body.features.length == 0) {
          console.log(
            "Unable to find location. Try to" + " search another location."
          );
        } else {
          console.log(response.body.features[0].context[1].text);
        }
        var city = response.body.features[0].context[1].text;
        console.log(city);
        let [results] = await Promise.all([users.nearby_doc_h_t_l(city, req)]);
        jsonResponse(res, "sucess", results);
      });
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  nearby_doc_gender: async (req, res) => {
    try {
      req.body.state =
        typeof req.params.state === "undefined" ? 0 : req.params.state;
      req.body.specialization =
        typeof req.params.specialization === "undefined"
          ? 0
          : req.params.specialization;
      req.body.gender =
        typeof req.params.gender === "undefined" ? 0 : req.params.gender;
      req.body.order =
        typeof req.params.order === "undefined" ? 0 : req.params.order;
      var latitude = 19.21882;
      var longitude = 73.152125;

      var url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        longitude +
        ", " +
        latitude +
        ".json?access_token=" +
        ACCESS_TOKEN;

      request({ url: url, json: true }, async function (error, response) {
        if (error) {
          console.log("Unable to connect to Geocode API");
        } else if (response.body.features.length == 0) {
          console.log(
            "Unable to find location. Try to" + " search another location."
          );
        } else {
          console.log(response.body.features[0].context[1].text);
        }
        var city = response.body.features[0].context[1].text;
        console.log(city);
        let [results] = await Promise.all([users.nearby_doc_gender(city, req)]);
        jsonResponse(res, "sucess", results);
      });
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  nearby_doc_rating: async (req, res) => {
    try {
      req.body.state =
        typeof req.params.state === "undefined" ? 0 : req.params.state;
      req.body.specialization =
        typeof req.params.specialization === "undefined"
          ? 0
          : req.params.specialization;
      req.body.order =
        typeof req.params.order === "undefined" ? 0 : req.params.order;
      var latitude = 19.21882;
      var longitude = 73.152125;

      var url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        longitude +
        ", " +
        latitude +
        ".json?access_token=" +
        ACCESS_TOKEN;

      request({ url: url, json: true }, async function (error, response) {
        if (error) {
          console.log("Unable to connect to Geocode API");
        } else if (response.body.features.length == 0) {
          console.log(
            "Unable to find location. Try to" + " search another location."
          );
        } else {
          console.log(response.body.features[0].context[1].text);
        }
        var city = response.body.features[0].context[1].text;
        console.log(city);
        let [results] = await Promise.all([users.nearby_doc_rating(city, req)]);
        jsonResponse(res, "sucess", results);
      });
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  experience_doc_h_t_l: async (req, res) => {
    try {
      req.body.state =
        typeof req.params.state === "undefined" ? 0 : req.params.state;
      req.body.specialization =
        typeof req.params.specialization === "undefined"
          ? 0
          : req.params.specialization;
      req.body.order =
        typeof req.params.order === "undefined" ? 0 : req.params.order;
      let [results] = await Promise.all([users.experience_doc_h_t_l(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  experience_doc_gender: async (req, res) => {
    try {
      req.body.state =
        typeof req.params.state === "undefined" ? 0 : req.params.state;
      req.body.specialization =
        typeof req.params.specialization === "undefined"
          ? 0
          : req.params.specialization;
      req.body.gender =
        typeof req.params.gender === "undefined" ? 0 : req.params.gender;
      req.body.order =
        typeof req.params.order === "undefined" ? 0 : req.params.order;
      let [results] = await Promise.all([users.experience_doc_gender(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  experience_doc_rating: async (req, res) => {
    try {
      req.body.state =
        typeof req.params.state === "undefined" ? 0 : req.params.state;
      req.body.specialization =
        typeof req.params.specialization === "undefined"
          ? 0
          : req.params.specialization;
      req.body.order =
        typeof req.params.order === "undefined" ? 0 : req.params.order;
      let [results] = await Promise.all([users.experience_doc_rating(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  view_doc_profile: async (req, res) => {
    try {
      req.body.id = typeof req.params.id === "undefined" ? 0 : req.params.id;
      let [results] = await Promise.all([users.view_doc_profile(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  make_appointment: async (req, res) => {
    try {
      req.body.user_id =
        typeof req.params.user_id === "undefined" ? 0 : req.params.user_id;
      req.body.Doctor_id =
        typeof req.params.Doctor_id === "undefined" ? 0 : req.params.Doctor_id;
      await Promise.all([users.make_appointment(req)]);
      let [results2] = await Promise.all([
        users.app_id_of_added_appointment(req),
      ]);
      jsonResponse(res, "sucess", results2);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  give_stars: async (req, res) => {
    try {
      req.body.user_id =
        typeof req.params.user_id === "undefined" ? 0 : req.params.user_id;
      req.body.Doctor_id =
        typeof req.params.Doctor_id === "undefined" ? 0 : req.params.Doctor_id;
      req.body.Lab_id =
        typeof req.params.Lab_id === "undefined" ? 0 : req.params.Lab_id;
      req.body.Stars =
        typeof req.params.Stars === "undefined" ? 0 : req.params.Stars;
      let [results] = await Promise.all([users.give_stars(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  paywithpaytm: async (req, res) => {
    initPayment(req.query.amount, req.query.appointment).then(
      (success) => {
        res.render("paytmRedirect.ejs", {
          resultData: success,
          paytmFinalUrl: process.env.PAYTM_FINAL_URL,
        });
      },
      (error) => {
        jsonResponse(res, "error", error);
      }
    );
  },

  paywithpaytmresponse: async (req, res) => {
    responsePayment(req.body)
      .then(
        (success) => {
          res.render("response.ejs", {
            resultData: "true",
            responseData: success,
          });
          if (success.RESPMSG == "Txn Success")
            Promise.all([users.paymentupdate(req.query.appointment)]);
        },
        (error) => {
          jsonResponse(res, "error", error);
        }
      )
      .catch((error) => {
        jsonResponse(res, "error", error);
      });
  },

  popular_labs: async (req, res) => {
    try {
      let [results] = await Promise.all([users.popular_labs(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  tests_by_labs: async (req, res) => {
    try {
      req.body.lab_id =
        typeof req.params.lab_id === "undefined" ? 0 : req.params.lab_id;
      let [results] = await Promise.all([users.tests_by_labs(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  package_by_labs: async (req, res) => {
    try {
      req.body.lab_id =
        typeof req.params.lab_id === "undefined" ? 0 : req.params.lab_id;
      let [results] = await Promise.all([users.package_by_labs(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  tests_by_search: async (req, res) => {
    try {
      req.body.search =
        typeof req.params.search === "undefined" ? 0 : req.params.search;
      let [results] = await Promise.all([users.tests_by_search(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  package_by_search: async (req, res) => {
    try {
      req.body.search =
        typeof req.params.search === "undefined" ? 0 : req.params.search;
      let [results] = await Promise.all([users.package_by_search(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },


  signInWithOtp: async (req, res) => {
    try {
        otp=Math.floor((Math.random() * 999999) + 000000);
        req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
        let [results1] = await Promise.all([users.getUser(req)])
        if(results1!=''){
            client.messages
            .create({
                body:`This is your OTP ${otp} for login to Construction Flow `,
                from:'+14154964979',
                to: "+91"+results1[0].phone_no
            })
            .then(message=>console.log(message.sid))
            jsonResponse(res, "OTP SENT");
        }
        else  {
            jsonResponse(res, "User doesn't exists with that phone no");

        }
    
    } catch (error) {
        console.log(error,"signInWithOtp");
        jsonResponse(res, "error", error);
    };
},


// app.post('/verifyotp',user.verifyOtp)

verifyOtp: async (req, res) => {
    
    try {
        if(req.body.otp==otp){
            let [results] = await Promise.all([users.signInWithOtp(req)])
            jsonResponse(res, "User signed In", results);

        }
        else{
            jsonResponse(res,"please send correct otp");
        }
    
    
    } catch (error) {
        console.log(error,"verifyOtp");
        jsonResponse(res, "error", error);
    };
},

//app.get('/check_number/:num',user.check_number)

check_number: async (req, res) =>{
    try {
        let [results] = await Promise.all([users.check_num(req)])
        
        const id=results[0]?.id;
        const isUser=results[0]?.isUser;
        const token = jwt.sign({email:results[0].Email, id:results[0].id} , "secretkey" , {expiresIn:"30d"})
        if(results.length>0){
            jsonResponse(res, "present",{token,id,isUser})
        }
        else{
            jsonResponse(res,"not_present")
        }
    } catch (error) {
        console.log(error,'check_number');
        jsonResponse(res, "error", error);
    };
},

//app.post('/googlesignup',user.googlsignup)

googlsignup: async (req, res) => {
    try {
        let [existingUser] = await Promise.all([users.signInWithgoogle(req)])
        if(existingUser.length>0){
            jsonResponse(res, "User Already Exists")
        }
        else {
                let [results] = await Promise.all([users.signupgoogle(req)])
                let [results1] = await Promise.all([users.signInWithgoogle(req)])
                const id=results1[0]?.id;
                const token = jwt.sign({email:results1[0].Email, id:results1[0].id} , "secretkey" , {expiresIn:"30d"})   
                await Promise.all([notification.setnotification(id,"App","Download our new app from Playstore")])
                jsonResponse(res, "User Created", {token,id})
        }
    
    } catch (error) {
        console.log(error,"googlsignup");
        jsonResponse(res, "error", error);
    };
},


//app.post('/googlesignin',user.signInWithgoogleEmail)

signInWithgoogleEmail: async (req, res) => {
    try {
        let [results] = await Promise.all([users.signInWithgoogle(req)])
        let check_dict= {0:false , 1 : true}
        if(req.body.isUser === check_dict[results[0].isUser])
        {   
            const id=results[0].id;
            const token = jwt.sign({email:results[0].Email, id:results[0].id} , "secretkey" , {expiresIn:"30d"})
            jsonResponse(res, "User signed In", {token,id})                
            
                   
        }
        else
        {
            jsonResponse(res, "Type Incorrect");
        }
        if(results[0].isverified != "True"){
            jsonResponse(res, "plz verify email by visting the link")
        }           
    
    } catch (error) {
        console.log(error,'signInWithgoogleEmail')
        jsonResponse(res, "User doesn't exists", error);
    };
},

// app.post('/linktoemail/:user_id', user.sendlinktoemail)

sendlinktoemail: async (req,res) => {
    try {
    if (req.params.user_id && req.params.lab_id == "Null" && req.params.doctor_id == "Null") {
      let date = new Date();
      let [results1] = await Promise.all([users.singleUser(req)])
      let mail = {
                  "id": results1[0].id,
                  "created": date.toString(),
                  "who" : "user"
                  }
      const token_mail_verification = jwt.sign(mail, "samsingh9892885@gmail.com", { expiresIn: '30d' });
      let who = "user";
  
      let url = process.env.FRONTEND_PORT + "/verify/"+results1[0].id+"/" + token_mail_verification + "/" + who;
  
  
      // let s =  await Promise.all([send_grid.sendmail(results1[0].Email,'Verification Link','Click on the link to verifiy your email','Your verification link is',url)])
      const msg = {
        to: 'samsingh9892885@gmail.com', // Change to your recipient
        from: '12345samsingh.samu@gmail.com', // Change to your verified sender
        subject: 'Email_verification',
        text: `${results1[0].Email},'Verification Link','Click on the link to verifiy your email','Your verification link is',${url}`,
      }
      sgMail.send(msg).then(() => {console.log('Email sent')})
      
      jsonResponse(res, "Mail is send")
    }else if (req.params.user_id == "Null" && req.params.lab_id == "Null" && req.params.doctor_id) {
      let date = new Date();
      let [results1] = await Promise.all([doctor.doc_profile(req)])
      let mail = {
                  "id": results1[0].id,
                  "created": date.toString(),
                  "who" : "doctor"
                  }
      const token_mail_verification = jwt.sign(mail, "samsingh9892885@gmail.com", { expiresIn: '30d' });  
      let who = "doctor";
      let url = process.env.FRONTEND_PORT + "/verify/"+results1[0].id+"/" + token_mail_verification + "/" + who;
  
      // let s =  await Promise.all([send_grid.sendmail(results1[0].Email,'Verification Link','Click on the link to verifiy your email','Your verification link is',url)])
      const msg = {
        to: 'samsingh9892885@gmail.com', // Change to your recipient
        from: '12345samsingh.samu@gmail.com', // Change to your verified sender
        subject: 'Email_verification',
        text: `${results1[0].Email},'Verification Link','Click on the link to verifiy your email','Your verification link is',${url}`,
      }
      sgMail.send(msg).then(() => {console.log('Email sent')})
      jsonResponse(res, "Mail is send")
    } else {
      let date = new Date();
      let [results1] = await Promise.all([lab.getsinglelab(req)])
      let mail = {
                  "id": results1[0].id,
                  "created": date.toString(),
                  "who" : "lab"
                  }
      const token_mail_verification = jwt.sign(mail, "samsingh9892885@gmail.com", { expiresIn: '30d' });
      let who = "lab";
  
      let url = process.env.FRONTEND_PORT + "/verify/"+results1[0].id+"/" + token_mail_verification + "/" + who;
  
  
      // let s =  await Promise.all([send_grid.sendmail(results1[0].Email,'Verification Link','Click on the link to verifiy your email','Your verification link is',url)])
      const msg = {
        to: 'samsingh9892885@gmail.com', // Change to your recipient
        from: '12345samsingh.samu@gmail.com', // Change to your verified sender
        subject: 'Email_verification',
        text: `${results1[0].Email},'Verification Link','Click on the link to verifiy your email','Your verification link is',${url}`,
      }
      sgMail.send(msg).then(() => {console.log('Email sent')})
      jsonResponse(res, "Mail is send")
    }
      
    } catch (error) {
        console.log(error,"sendlinktoemail");
        jsonResponse(res, "error", error);
    };
},

//app.post('/verifing/:id/:token/:isUser', user.verifyemail)

verifyemail: async (req, res) => {
    try {
        token = req.params.token;
        if (token) {
                jwt.verify(token, "samsingh9892885@gmail.com", async (e, decoded) => {
                    if (e) {
                       
                        res.sendStatus(403)
                    } else {
                        id = decoded.id;
                        var who = decoded.who;
                        req.params.id = id;
                        req.params.who = who;
                        if (who == "user") {
                          let [results2] = await Promise.all([users.updateFlaguser(req)]);
                          jsonResponse(res, "verified", {results2,who});
                        }else if (who == "doctor") {
                          let [results2] = await Promise.all([users.updateFlagdoctor(req)]);
                          jsonResponse(res, "verified", {results2,who});
                        } else {
                          let [results2] = await Promise.all([users.updateFlaglab(req)]);
                          jsonResponse(res, "verified", {results2,who});
                        }
                    }
                });
        } else {
            res.sendStatus(403)
        }
    
    } catch (error) {
        console.log(error,"verifyemail");
        jsonResponse(res, "error", error);
    };
},

//app.post('/resetpass/:email', user.resetpass)

resetpass: async (req, res) => {
    try {
      let [result1, result2, result3] = await Promise.all([
        users.login_user(req),
        lab.login_lab(req),
        doctor.login_doctor(req),
      ]);
      if (result1 && !result2 && !result3) {
        
        let date = new Date();
        let [results1] = await Promise.all([users.singleUser(req)])
        let mail = {
                    "id": results1[0].id,
                    "created": date.toString(),
                    "who" : "user"
                    }
        const token_mail_verification = jwt.sign(mail, "samsingh9892885@gmail.com", { expiresIn: '30d' });
        let who = "user";
    
        let url = process.env.FRONTEND_PORT + "/verify/"+results1[0].id+"/" + token_mail_verification + "/" + who;
    
    
        // let s =  await Promise.all([send_grid.sendmail(results1[0].Email,'Verification Link','Click on the link to verifiy your email','Your verification link is',url)])
        const msg = {
          to: 'samsingh9892885@gmail.com', // Change to your recipient
          from: '12345samsingh.samu@gmail.com', // Change to your verified sender
          subject: 'Reset_link',
          text: `${results1[0].Email},'reset Link','Click on the link to reset password','Your password reset link is',${url}`,
        }
        sgMail.send(msg).then(() => {console.log('Email sent')})
        
        jsonResponse(res, "Mail is send")
      }else if (!result1 && !result2 && result3) {
        let date = new Date();
        let [results1] = await Promise.all([doctor.doc_profile(req)])
        let mail = {
                    "id": results1[0].id,
                    "created": date.toString(),
                    "who" : "doctor"
                    }
        const token_mail_verification = jwt.sign(mail, "samsingh9892885@gmail.com", { expiresIn: '30d' });  
        let who = "doctor";
        let url = process.env.FRONTEND_PORT + "/verify/"+results1[0].id+"/" + token_mail_verification + "/" + who;
    
        // let s =  await Promise.all([send_grid.sendmail(results1[0].Email,'reset Link','Click on the link to reset password','Your password reset link is',url)])
        const msg = {
          to: 'samsingh9892885@gmail.com', // Change to your recipient
          from: '12345samsingh.samu@gmail.com', // Change to your verified sender
          subject: 'Reset_link',
          text: `${results1[0].Email},'reset Link','Click on the link to reset password','Your password reset link is',${url}`,
        }
        sgMail.send(msg).then(() => {console.log('Email sent')})
        jsonResponse(res, "Mail is send")
      } else {
        let date = new Date();
        let [results1] = await Promise.all([lab.getsinglelab(req)])
        let mail = {
                    "id": results1[0].id,
                    "created": date.toString(),
                    "who" : "lab"
                    }
        const token_mail_verification = jwt.sign(mail, "samsingh9892885@gmail.com", { expiresIn: '30d' });
        let who = "lab";
    
        let url = process.env.FRONTEND_PORT + "/verify/"+results1[0].id+"/" + token_mail_verification + "/" + who;
    
    
        // let s =  await Promise.all([send_grid.sendmail(results1[0].Email,'reset Link','Click on the link to reset password','Your password reset link is',url)])
        const msg = {
          to: 'samsingh9892885@gmail.com', // Change to your recipient
          from: '12345samsingh.samu@gmail.com', // Change to your verified sender
          subject: 'Reset_link',
          text: `${results1[0].Email},'reset Link','Click on the link to reset password','Your password reset link is',${url}`,
        }
        sgMail.send(msg).then(() => {console.log('Email sent')})
        jsonResponse(res, "Mail is send")
      }
    } catch (error) {
        console.log(error,"resetpass");
        jsonResponse(res, "error", error);
    };
},


//app.post('/verifyresetlink/:id/:token', user.verifyresetlink)

verifyresetlink: async (req, res) => {
    try {
      token = req.params.token;
      if (token) {
              jwt.verify(token, "samsingh9892885@gmail.com", async (e, decoded) => {
                  if (e) {
                     
                      res.sendStatus(403)
                  } else {
                      id = decoded.id;
                      var who = decoded.who;
                      req.params.id = id;
                      req.params.who = who;
                      if (who == "user") {
                        await Promise.all([users.save_tokenuser(token_mail_verification,req)]);
                        jsonResponse(res, "reset link verified");
                      }else if (who == "doctor") {
                        await Promise.all([users.save_tokendoctor(token_mail_verification,req)]);
                        jsonResponse(res, "reset link verified");
                      } else {
                        await Promise.all([users.save_tokenlab(token_mail_verification,req)]);
                        jsonResponse(res, "reset link verified");
                      }
                  }
              });
      } else {
          res.sendStatus(403)
      }
    
    } catch (error) {
        console.log(error,"verifyresetlink");
        jsonResponse(res, "error", error);
    };
},


//app.post('/updatepass/:password/:email', user.updatepass)

updatepass: async (req, res) => {
    try {
        
      let [result1, result2, result3] = await Promise.all([
        users.login_user(req),
        lab.login_lab(req),
        doctor.login_doctor(req),
      ]);
        if (results1[0].reset_token !== " ") {
            let newpassword=req.params.password;
            let password =await bcrypt.hash(newpassword,12)
            let [results2] = await Promise.all([users.updatepassuser(password,req)]);
            jsonResponse(res, "password reset successfull");
            let [clear] = await Promise.all([users.clearreset_tokenuser(req)]);
        }else if(results2[0].reset_token !== " ") {
          let newpassword=req.params.password;
          let password =await bcrypt.hash(newpassword,12)
          let [results2] = await Promise.all([users.updatepasslab(password,req)]);
          jsonResponse(res, "password reset successfull");
          let [clear] = await Promise.all([users.clearreset_tokenlab(req)]);
        }else if(results1[0].reset_token !== " ") {
          let newpassword=req.params.password;
          let password =await bcrypt.hash(newpassword,12)
          let [results2] = await Promise.all([users.updatepassdoctor(password,req)]);
          jsonResponse(res, "password reset successfull");
          let [clear] = await Promise.all([users.clearreset_tokendoctor(req)]);
        }
        else {
            jsonResponse(res, "not authorized user");
        }
    } catch (error) {
        console.log(error,"updatepass");
        jsonResponse(res, "error", error);
    };
},

};
