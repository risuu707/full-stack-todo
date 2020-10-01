import Express from "express";
import ToDoController from "./controller";
const todoController = new ToDoController();
const toDoRouter = Express.Router();

toDoRouter.get("/", todoController.fetchToDos);
toDoRouter.post('/', todoController.addToDo);
toDoRouter.put('/', todoController.updateToDo);
toDoRouter.delete('/:id', todoController.deleteToDo);

export default toDoRouter;
