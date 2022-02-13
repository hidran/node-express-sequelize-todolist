const data = require('../data');

function getTodos() {
    return data.todos;
}
function getTodoById(id) {
    return data.todos.find((todo) => todo.id == id);
}
function deleteTodo(id) {
    const idx = data.todos.findIndex((todo) => todo.id == id);
    if (idx > -1) {
        const ele = data.todos.splice(idx, 1);
        return ele;
    }
    return 0;
}
function addTodo({ todo, completed, list }) {
    const newtodo = { todo, completed, list };
    data.todos.unshift(newtodo);
    return newtodo;
}

function updateTodo(id, newTodo) {
    const idx = data.todos.findIndex((todo) => todo.id == id);

    if (idx !== -1) {
        data.todos[idx] = { ...data.todos[idx], ...newTodo };
        return data.todos[idx];
    }
    return false;
}

module.exports = {
    getTodos,
    getTodoById,
    deleteTodo,
    addTodo,
    updateTodo,
};
