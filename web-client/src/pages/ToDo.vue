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
              ></v-text-field>
            </v-toolbar>
            <v-divider class="mt-4"></v-divider>
            <v-toolbar dense flat>
              <v-row class="my-1" align="center">
                <strong class="mx-4 success--text text--darken-2">
                  Completed: 100
                </strong>
                <v-divider vertical></v-divider>
                <strong class="mx-4 error--text text--darken-2">
                  Pending: 100
                </strong>
                <v-spacer></v-spacer>
                <v-progress-circular
                  :value="100"
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
                    <th>Tasks: 100</th>
                    <th>Task</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(todo, index) in todos">
                    <tr :key="index">
                      <td>
                        <v-checkbox
                          v-model="todo.isDone"
                          :color="todo.isDone ? 'grey' : ''"
                        ></v-checkbox>
                      </td>
                      <td>
                        <v-fade-transition leave-absolute>
                          <span
                            :key="`todo-${todo.isDone}`"
                            :class="`${
                              todo.isDone
                                ? 'text-decoration-line-through'
                                : 'text-decoration-none'
                            }
                           ${
                             todo.isDone ? 'grey--text' : 'text-decoration-none'
                           } `"
                          >
                            {{ todo.task }}
                          </span>
                        </v-fade-transition>
                      </td>
                      <td>
                        <v-fade-transition leave-absolute>
                          <span
                            :key="`todo-${todo.isDone}`"
                            :class="`${
                              todo.isDone
                                ? 'text-decoration-line-through'
                                : 'text-decoration-none'
                            }
                           ${
                             todo.isDone ? 'grey--text' : 'text-decoration-none'
                           } `"
                          >
                            {{ todo.date }}
                          </span>
                        </v-fade-transition>
                      </td>
                      <td>
                        <v-scroll-x-transition leave-absolute>
                          <v-btn v-if="todo.isDone" icon>
                            <v-icon color="success"> mdi-check </v-icon>
                          </v-btn>
                        </v-scroll-x-transition>
                        <v-scroll-x-transition leave-absolute>
                          <v-btn v-if="!todo.isDone" icon
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
          <v-text-field filled rounded label="Task"></v-text-field>
          <v-btn color="primary" block>Add</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isFilterTodosDialogShow" width="300">
      <v-card>
        <v-card-title>Filter Todos</v-card-title>
        <v-card-text>
          <v-radio-group>
            <v-radio label="All"></v-radio>
            <v-radio label="Completed Tasks"></v-radio>
            <v-radio label="Pending Tasks"></v-radio>
          </v-radio-group>
          <v-btn color="primary" block>Add</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
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

const dummyTodos = [
  {
    id: 1,
    task: "Task 1",
    date: "September 9, 2020",
    isDone: false,
  },

  {
    id: 2,
    task: "Task 2",
    date: "September 9, 2020",
    isDone: true,
  },
];

export default {
  data() {
    return {
      tableHeaders,
      todos: dummyTodos,
      isAddTodoDialogShow: false,
      isFilterTodosDialogShow: false,
    };
  },

  methods: {
    log(val) {
      console.log(val);
    },
  },
};
</script>
