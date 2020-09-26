import Todo from '../../database/entities/Todo';
import {getManager} from "typeorm";


export default class ToDoModel {
    async addToDo(task: string) {
        const entityManager = getManager();
        return await entityManager.save(Todo, {task});
    }
}
