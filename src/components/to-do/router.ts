import Express from "express";
import ToDoController from "./controller";
const todoController = new ToDoController();
const toDoRouter = Express.Router();
toDoRouter.get("/", todoController.fetch);
toDoRouter.post('/', todoController.addToDo);
export default toDoRouter;
