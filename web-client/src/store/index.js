import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  mutations: {
    fetchToDos (state, todos) {
      state.todos = todos;
    },
    deleteToDo (state, id) {
      const index = state.todos.findIndex(todo => {
        return todo.id === id
      });
      state.todos.splice(index, 1);
    }
  },
  actions: {
    fetchToDos ({ commit }) {
      axios.get('http://localhost:3000/api/to-do/')
          .then(res => {
          commit('fetchToDos', res.data);
        })
    },
    deleteToDo ({ commit }, id) {
      axios.delete(`http://localhost:3000/api/to-do/${id}`)
          .then(res => {
            commit('deleteToDo', id);
          })
          .catch(err => console.log(err));
    },
    updateToDo ({commit}, { id, isCompleted }) {
        axios.put('http://localhost:3000/api/to-do/', {
          id: id,
          isCompleted: isCompleted
        })
            .then(res => {
                return res.data;
            })
            .catch(err => console.log(err))

    },
      addToDo({commit, dispatch}, newToDo) {
        axios.post('http://localhost:3000/api/to-do/', {task: newToDo})
            .then(res => {
                dispatch('fetchToDos');
            });
      }
  },
  getters: {
    fetchToDos (state) {
      return state.todos;
    }
  },
  modules: {
  }
})
