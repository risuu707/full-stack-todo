import {Request, Response,} from 'express';
import ToDoService from "./service";
const todoService = new ToDoService();

export default class ToDoController {
  async fetch(_request: Request, response: Response) {
    response.send('Hello World');
  }
  async addToDo(request: Request, response: Response){

    const { task } = request.body;
    const newTask = await todoService.addToDo(task);
    response.json(newTask);
  }
}
