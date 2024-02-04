const List = require('../models').List;
const Todo = require('../models').Todo;
const Op = require('../models').Sequelize.Op;

const attributes = {
    include: [
        [List.sequelize.fn(
            'COUNT',
            List.sequelize.col('Todos.id')
        ), 'total']
    ],
    exclude: ['createdAt', 'userId']

};

async function getLists(pars = {}) {
    const where = pars.q ? {
        name: {
            [Op.like]: '%' + pars.q + '%'
        }
    } : {};
    if (pars.userId) {
        where.userId = pars.userId;
    }
    return List.findAll({
        attributes,
        raw: true,
        subQuery: false,
        limit: 20,
        include: [
            {
                model: Todo, attributes: []
            }
        ],
        group: ['List.id'],
        order: [
            ['createdAt', 'DESC']
        ],
        where
    });

}

async function getListByUserId(userId) {
    return List.findAll(
        {
            attributes: ['id', 'name'],
            where: {userId},
            raw: true,
            order: [
                ['name', 'ASC']
            ]
        }
    );
}

async function getListById(id) {

    return List.findByPk(id, {
        attributes: ['id', 'name', 'userId', 'createdAt'],

    });
}

async function deleteList(id) {
    return List.destroy({where: {id}});
}

async function addList(name, userId) {
    return List.create({userId, name});
}

async function updateList(id, name) {
    return List.update({name}, {where: {id}});
}

module.exports = {
    getLists,
    getListById,
    deleteList,
    addList,
    updateList,
    getListByUserId
};
