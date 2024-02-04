const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
app.use('/axios', express.static(__dirname + '/node_modules/axios/dist'));
app.use(
    '/bootstrap',
    express.static(__dirname + '/node_modules/bootstrap/dist')
);
app.use(
    '/sweetalert2',
    express.static(__dirname + '/node_modules/sweetalert2/dist')
);
app.use(express.static(__dirname + '/public'));
const flash = require('connect-flash');
// configure session
const {redirectLogin, redirectHome, setSession, overrideMethods} = require('./middlewares');


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(overrideMethods());
const {engine} = require('express-handlebars');
const helpers = require('handlebars-helpers')();
app.engine(
    'hbs',

    engine({
        helpers,
        extname: 'hbs',
        layoutsDir: './views/layouts',
    })
);
app.set('view engine', 'hbs');
app.use(setSession());
app.use(flash());
const autRoutes = require('./routes/auth');
const todosRoutes = require('./routes/api/todos');
const listsRoutes = require('./routes/api/lists');

app.use('/auth', redirectHome, autRoutes);
app.use('/api/todos', redirectLogin, todosRoutes);
app.use('/api/lists', redirectLogin, listsRoutes);
app.use(['/lists', '/'], redirectLogin, require('./routes/lists'));
app.use(['/todos'], redirectLogin, require('./routes/todos'));
//console.log(process.env.DB_CONN, process.env.NODE_ENV);
app.listen(process.env.PORT || 3000, () =>
    console.log('listening on port 3000', Date())
);
