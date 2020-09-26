import Todo from '../../database/entities/Todo';
import {getConnection, getManager} from "typeorm";


export default class ToDoModel {
  async addToDo(task: string) {
     const id: any = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Todo)
        .values({
          task: task
        }).returning("id")
        .execute();

     return await getManager()
          .createQueryBuilder(Todo, "todo")
          .where("todo.id = :id", { id: id.raw[0].id})
          .getOne();

  }
}
