import ToDoModel from "./model";
const toDoModel = new ToDoModel();

export default class ToDoService {
  async fetchToDos() {
    return await toDoModel.fetchToDos()
  }

  async addToDo(task: string) {
    return await toDoModel.addToDo(task);
  }
}
