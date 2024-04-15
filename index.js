const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const logger = require('./middleware/logger');

const app = express();

// Init middleware
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// HomepageRoute
app.get('/', (req, res) => res.render('index'));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Stocks API Routes
app.use('/api/stocks', require('./routes/api/stocks'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))