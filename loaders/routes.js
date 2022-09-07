module.exports = function (app) {
  const helmet = require("helmet");
  const cors = require("cors");
  const error = require("../middleware/error");
  const cookieParser = require("cookie-parser");
  app.use(cors({
    origin: function(origin, callback){
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true
  }));
  // app.use(helmet());
  // app.use(helmet.xssFilter());
  // app.use(helmet.noSniff());
  //// Sets "X-Frame-Options: DENY".

  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  // app.use(
  //   helmet.frameguard({
  //     action: "deny",
  //   })
  // );

  // // //// hides the x-powerd-by
  // app.use(helmet.hidePoweredBy());

  var user = require("../routes/userroutes");
  var index = require("../routes/index");
  var lab = require("../routes/labroutes");
  var doctor = require("../routes/doctorroutes");
    app.use(cookieParser());
  app.use("/", index);
  app.use("/user", user);
  app.use("/lab", lab);
  app.use("/doctor", doctor);
  app.use(error);

  app.get("*", function (req, res) {
    res.redirect("/");
    return;
  });

  return app;
};
