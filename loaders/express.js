const cors = require("cors");
const helmet = require("helmet");
const winston = require("winston");
const express = require("express");
const path = require("path");
const body_parser = require("body-parser");

module.exports = (app) => {
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: {
      service: "user-service",
    },
    transports: [
      new winston.transports.File({
        filename: "./public/logs/error.log",
        level: "error",
      }),
      new winston.transports.File({
        filename: "./public/logs/combined.log",
      }),
    ],
  });
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      ),
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  // app.use(express.static(path.join(__dirname, '../public')));

  app.use(express.static(__dirname + "/views"));
  app.set("view engine", "ejs");

  app.use(cors({
    origin: function(origin, callback){
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true
  }));
  // app.use(helmet());
  app.use(
      helmet({
        contentSecurityPolicy: false,
      })
    );

  process
    .on("uncaughtException", function (err, res) {
      console.log("exception error==" + err);
      winston.error(err.message, err);
      process.exit(1);
    })
    .on("unhandledRejection", function (err, res) {
      console.log("rejection error==" + err);
      winston.error(err.message, err);
      process.exit(1);
    });

  return app;
};
