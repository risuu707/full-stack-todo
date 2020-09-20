import express from "express";
import database from "./database";
import cors from "cors";
import bodyParser from "body-parser";
import api from "./api";

const application = express();
database.init().then(() => {
  console.log('Database is Connected...')
});
application.use(cors());
application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());
application.use("/api", api);

if (process.env.NODE_ENV === "production") {
  application.use(express.static(__dirname + "/public/"));
  application.get(/.*/, (_, response) =>
    response.sendFile(__dirname + "/public/index.html")
  );
}

export default application;
