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
    const id = parseInt(request.params.id);
    const newToDos = await toDoService.deleteToDo(id);
    response.json(newToDos);
  }

  async updateToDo(request: Request, response: Response){
    const { id, isCompleted } = request.body;
    const updatedToDo = await toDoService.updateToDo({id, isCompleted});
    response.json(updatedToDo);
  }
}
