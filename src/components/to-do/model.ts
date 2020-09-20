import Todo from '../../database/entities/Todo';
import {getConnection} from "typeorm";


export default class ToDoModel {
  async addToDo(task: string) {
    console.log(task);
    await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Todo)
        .values({
          task: task
        })
        .execute();
  }
}
