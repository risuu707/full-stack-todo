import express from "express";
import toDoRouter from "./components/to-do/router";

const api = express();
api.use("/to-do", toDoRouter);

export default api;
