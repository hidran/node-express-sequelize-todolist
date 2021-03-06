const express = require('express');
const app = express();
// C R U D
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use('/todos/:id',logger);
const todosRoutes = require('./routes/todos');
const listsRoutes = require('./routes/lists');
const User = require('./models').User;
const List = require('./models').List;
const Todo = require('./models').List;
const { sequelize } = require('./models');
(
    async () => {
        await sequelize.sync({ alert: true });
    }
)();
//User.sync();
app.use('/todos', todosRoutes);
app.use('/lists', listsRoutes);

app.listen(4000, () => console.log('listening on port 4000'));
