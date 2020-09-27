import {Request, Response,} from 'express';
import ToDoService from "./service";
const toDoService = new ToDoService();

export default class ToDoController {
  async fetchToDos(_request: Request, response: Response) {
    const toDos = await toDoService.fetchToDos();
    response.json(toDos);
  }

  async addToDo(request: Request, response: Response){
    const { task } = request.body;
    const newTask = await toDoService.addToDo(task);
    response.json(newTask);
  }

  async deleteToDo(request: Request, response: Response){
    const { id } = request.body;
    const newToDos = await toDoService.deleteToDo(id);
    response.json(newToDos);
  }
}
