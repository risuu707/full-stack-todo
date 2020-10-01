import Todo from '../../database/entities/Todo';
import {getManager} from "typeorm";


export default class ToDoModel {
    async fetchToDos () {
        const entityManager = getManager();
        return await entityManager.find(Todo);
    }

    async addToDo(task: string) {
        const entityManager = getManager();
        return await entityManager.save(Todo, {task});
    }

    async deleteToDo(id: number) {
        const entityManager = getManager();
        return await entityManager.delete(Todo, id);
    }

    async updateToDo(updatedToDo: {id: number, isCompleted: boolean}) {
        const entityManager = getManager();
        await entityManager.update(Todo,
            updatedToDo.id,
            {isCompleted: updatedToDo.isCompleted});
        return this.fetchToDos();
    }
}
