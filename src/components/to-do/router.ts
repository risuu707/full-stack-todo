import Express from "express";
import ToDoController from "./controller";
const todoController = new ToDoController();
const toDoRouter = Express.Router();
toDoRouter.get("/", todoController.fetchToDos);
toDoRouter.post('/', todoController.addToDo);
toDoRouter.delete('/', todoController.deleteToDo);
export default toDoRouter;
