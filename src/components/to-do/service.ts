import ToDoModel from "./model";
const todoModel = new ToDoModel();

export default class ToDoService {
  async fetch() {

  }
  async addToDo(task: string) {
    await todoModel.addToDo(task);
  }
}
