const express = require('express');
const router = express.Router();
const list = require('../controllers/listsController');
const {getTodosByListId} = require('../controllers/todosController');
const {getListByUserId} = require('../controllers/listsController');
const {manageFilter, userOwnsList} = require('../middlewares');

router.get('/', async (req, res) => {
    try {
        const {q} = req.query;
        const lists = await list.getLists({q, userId: req.session.user.id});
        // console.log(lists)
        res.render('index', {
            lists,
            showBackButton: false,
            q,
            user: req.session.user,
            errors: req.flash('errors'),
            messages: req.flash('messages')
        });
    } catch (e) {
        res.status(500).send(e.toString());
    }

});
router.get('/new', async (req, res) => {
    try {

        res.render('list/newlist', {user: req.session.user, showBackButton: false});
    } catch (e) {
        res.status(500).send(e.toString());
    }

});
router.get('/:list_id([0-9]+)/edit', userOwnsList, async (req, res) => {
    try {
        const listId = req.params.list_id;
        const listObj = await list.getListById(listId);
        const values = listObj.dataValues;
        res.render('list/edit', {...values, user: req.session.user});
    } catch (e) {
        res.status(500).send(e.toString());
    }

});

router.get('/:list_id([0-9]+)/todos', userOwnsList, manageFilter, async (req, res) => {
    try {
        const listId = req.params.list_id;
        let {completed, q} = req.query;
        const tmpCompleted = completed;
        if (completed === undefined) {
            completed = 0;
        }
        completed = completed === 'ALL' ? null : completed;
        const lists = await getListByUserId(req.session.user.id);
        const listObj = await list.getListById(listId);

        const result = await getTodosByListId({listId, q, completed});
        res.render('todos', {
                todos: result, list_name: listObj.name,
                user: req.session.user,
                listId,
                lists,
                completed: tmpCompleted,
                q,
                errors: req.flash('errors'),
                messages: req.flash('messages'),
                showFilter: 1
            }
        );
    } catch (e) {
        res.status(500).send(e.toString());
    }
});
router.delete('/:list_id([0-9]+)', userOwnsList, async (req, resp) => {
    try {
        await list.deleteList(req.params.list_id);
        req.flash('messages', 'List deleted correclty!');
        resp.redirect('/');
        // resp.status(deleted ? 200 : 404).json(deleted ? deleted : null);
    } catch (e) {
        req.flash('errors', e.errors.map(ele => ele.message));
        resp.redirect('/');
    }
});
router.patch('/:list_id([0-9]+)', userOwnsList, async (req, resp) => {
    try {
        await list.updateList(req.params.list_id, req.body.list_name);
        req.flash('messages', 'List modified correctly!')
        resp.redirect('/');
        // resp.status(deleted ? 200 : 404).json(deleted ? deleted : null);
    } catch (e) {
        req.flash('errors', e.errors.map(ele => ele.message));
        resp.redirect(req.params.list_id + '/edit');
    }
});
router.post('/', async (req, resp) => {
    try {
        await list.addList(req.body.list_name, req.session.user.id);
        req.flash('messages', 'List added!');
        resp.redirect('/');
        // resp.status(deleted ? 200 : 404).json(deleted ? deleted : null);
    } catch (e) {
        console.log(e)
        req.flash('errors', e.errors?.map(ele => ele.message));
        resp.redirect('/');
    }
});
module.exports = router;
