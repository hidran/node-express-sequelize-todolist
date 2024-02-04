const Todo = require('../models').Todo;
const List = require('../models').List;
const attributes = ['id', 'todo', 'listId', 'createdAt', 'completed'];
const Op = require('../models').Sequelize.Op;

async function getTodos(pars = {}) {
    const where = {};
    if (pars.q) {
        where.todo = {
            [Op.like]: '%' + pars.q + '%'
        };
    }
    if (pars.completed !== undefined) {
        where.completed = pars.completed;
    }
    const whereList = {};
    if (pars.userId) {
        whereList.userId = pars.userId;
    }
    console.log(where)
    return Todo.findAll(
        {
            where,
            include: [
                {
                    model: List,
                    where: whereList
                }
            ],
            attributes,
            limit: 20,
            raw: true
        }
    );
}

async function getTodosByListId({listId, q, completed}) {
    const where = {listId};
    if (completed !== null) {
        where.completed = completed;
    }
    if (q) {
        where.todo = {
            [Op.like]: '%' + q + '%'
        };
    }
    return Todo.findAll({
        attributes,
        limit: 20,
        raw: true,
        include: ['List'],
        where
    });
}

async function getTodoById(id) {
    return Todo.findByPk(id, {
        attributes,

        include: ['List']
    });
}

async function deleteTodo(id) {
    return Todo.destroy({where: {id}});
}

async function addTodo({todo, completed, listId}) {
    return Todo.create({todo, completed, listId});
}

async function updateTodo(id, {todo, listId, completed}) {
    return Todo.update({todo, completed, listId},
        {
            where: {id}
        });


}

module.exports = {
    getTodos,
    getTodoById,
    deleteTodo,
    addTodo,
    updateTodo,
    getTodosByListId
};
