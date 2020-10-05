<template>
  <section style="height: 100vh">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8" lg="6" xl="4">
          <v-card>
            <v-card-title class="font-weight-bold">
              <span>Manage Your ToDos</span>
              <div class="flex-grow-1"></div>
              <v-btn icon @click="isAddTodoDialogShow = true">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn icon @click="isFilterTodosDialogShow = true">
                <v-icon>mdi-sort</v-icon>
              </v-btn>
            </v-card-title>
            <v-toolbar flat>
              <v-text-field
                label="Search"
                rounded
                outlined
                dense
                v-model="searchInput"
              ></v-text-field>
            </v-toolbar>
            <v-divider class="mt-4"></v-divider>
            <v-toolbar dense flat>
              <v-row class="my-1" align="center">
                <strong class="mx-4 success--text text--darken-2">
                  Completed: {{ completedToDos.length }}
                </strong>
                <v-divider vertical></v-divider>
                <strong class="mx-4 error--text text--darken-2">
                  Pending: {{ inCompleteToDos.length }}
                </strong>
                <v-spacer></v-spacer>
                <v-progress-circular
                  :value="progressBarPercent"
                  class="mr-2"
                  :color="100 === 100 ? 'success' : ''"
                ></v-progress-circular>
              </v-row>
            </v-toolbar>
            <v-divider class="mb-4"></v-divider>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Tasks: {{ todos.length }}</th>
                    <th>Task</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(todo, index) in filterToDos">
                    <tr :key="forceRenderKey">
                      <td>
                        <v-checkbox
                          key="todo.isCompleted"
                          @change="
                            updateToDo({
                              id: todo.id,
                              isCompleted: todo.isCompleted,
                            })
                          "
                          v-model="todo.isCompleted"
                          :color="todo.isCompleted ? 'grey' : ''"
                        ></v-checkbox>
                      </td>
                      <td>
                        <v-fade-transition leave-absolute>
                          <span
                            :key="`todo-${todo.id}`"
                            :class="`${
                              todo.isCompleted
                                ? 'text-decoration-line-through'
                                : 'text-decoration-none'
                            }
                           ${
                             todo.isCompleted
                               ? 'grey--text'
                               : 'text-decoration-none'
                           } `"
                          >
                            {{ todo.task }}
                          </span>
                        </v-fade-transition>
                      </td>
                      <td>
                        <v-fade-transition leave-absolute>
                          <span
                            :key="`todo-${todo.isCompleted}`"
                            :class="`${
                              todo.isCompleted
                                ? 'text-decoration-line-through'
                                : 'text-decoration-none'
                            }
                           ${
                             todo.isCompleted
                               ? 'grey--text'
                               : 'text-decoration-none'
                           } `"
                          >
                            {{ todo.createdAt }}
                          </span>
                        </v-fade-transition>
                      </td>
                      <td>
                        <v-scroll-x-transition leave-absolute>
                          <v-btn v-if="todo.isCompleted" icon>
                            <v-icon color="success"> mdi-check </v-icon>
                          </v-btn>
                        </v-scroll-x-transition>
                        <v-scroll-x-transition leave-absolute>
                          <v-btn
                            v-if="!todo.isCompleted"
                            icon
                            @click="areYouSure(todo.id)"
                            ><v-icon>mdi-trash-can</v-icon></v-btn
                          >
                        </v-scroll-x-transition>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="isAddTodoDialogShow" width="500">
      <v-card>
        <v-card-title>New ToDo</v-card-title>
        <v-card-text>
          <v-text-field
            filled
            rounded
            label="Task"
            v-model="newToDo"
          ></v-text-field>
          <v-btn color="primary" @click="addToDo" block>Add</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isFilterTodosDialogShow" width="300">
      <v-card>
        <v-card-title>Filter Todos</v-card-title>
        <v-card-text>
          <v-radio-group v-model="toDoFilter">
            <v-radio value="all" label="All"></v-radio>
            <v-radio value="completed" label="Completed Tasks"></v-radio>
            <v-radio value="incomplete" label="Pending Tasks"></v-radio>
          </v-radio-group>
          <v-btn @click="isFilterTodosDialogShow = false" color="primary" block
            >Confirm</v-btn
          >
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isSureToDeleteTodo" width="300">
      <v-card>
        <v-card-title>Are you sure?</v-card-title>
        <v-card-actions class="d-flex justify-end">
          <v-btn @click="deleteToDo()" color="error">Yes</v-btn>
          <v-btn @click="isSureToDeleteTodo = false" color="normal">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="openSnackbar" :timeout="timeout">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn :color="color" text v-bind="attrs" @click="openSnackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </section>
</template>
<script>
const tableHeaders = [
  {
    text: "",
    value: "status",
    align: "left",
  },
  {
    text: "Task",
    value: "task",
  },

  {
    text: "Date",
    value: "date",
  },
  {
    text: "",
    value: "actions",
    align: "right",
  },
];

import moment from "moment";
export default {
  data() {
    return {
      forceRenderKey: 0,
      id: 0,
      text: "",
      timeout: 2000,
      color: "",
      toDoFilter: "all",
      newToDo: "",
      searchInput: "",
      isAddTodoDialogShow: false,
      isFilterTodosDialogShow: false,
      isSureToDeleteTodo: false,
      openSnackbar: false,
      checked: false,
    };
  },

  methods: {
    log(val) {
      console.log(val);
    },
    addToDo() {
      this.$store.dispatch("addToDo", this.newToDo);
      this.newToDo = "";
      this.isAddTodoDialogShow = false;
      this.text = "You added a new task.";
      this.color = "blue";
      this.openSnackbar = true;
      this.forceRenderKey += 1;
    },
    areYouSure(id) {
      this.isSureToDeleteTodo = true;
      this.id = id;
      this.forceRenderKey += 1;
    },
    deleteToDo() {
      this.$store.dispatch("deleteToDo", this.id);
      this.isSureToDeleteTodo = false;
      this.text = "You successfully deleted a task.";
      this.color = "red";
      this.openSnackbar = true;
      this.forceRenderKey += 1;
    },
    updateToDo(updatedToDo) {
      this.$store.dispatch("updateToDo", updatedToDo);
      this.forceRenderKey += 1;
    },
  },
  computed: {
    filterToDos() {
      let toDoList = [];

      if (this.toDoFilter === "all") toDoList = this.todos;
      if (this.toDoFilter === "completed") toDoList = this.completedToDos;
      if (this.toDoFilter === "incomplete") toDoList = this.inCompleteToDos;

      if (this.searchInput !== "") {
        toDoList = toDoList.filter((todo) => {
          return todo.task.includes(this.searchInput);
        });
      }
      toDoList.forEach((todo) => {
        todo.createdAt = moment(todo.createdAt).fromNow();
      });

      return toDoList;
    },
    todos() {
      return this.$store.getters.fetchToDos.sort((a, b) => {
        if (a.isCompleted === true && b.isCompleted === false) {
          return 1;
        }
        if (a.isCompleted === false && b.isCompleted === true) {
          return -1;
        }
        if (
          (a.isCompleted === true && b.isCompleted === true) ||
          (a.isCompleted === false && b.isCompleted === false)
        ) {
          return 0;
        }
      });
    },
    completedToDos() {
      return this.$store.getters.fetchToDos.filter((todo) => todo.isCompleted);
    },
    inCompleteToDos() {
      return this.$store.getters.fetchToDos.filter((todo) => !todo.isCompleted);
    },
    progressBarPercent() {
      return (100 / this.todos.length) * this.completedToDos.length;
    },
  },
  watch: {},
};
</script>
s
