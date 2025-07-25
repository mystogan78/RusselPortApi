require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const connectDB = require('./services/mongoService');
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cookieParser());

// Import routes
const catwayRoutes = require('./routes/catwayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const authRoutes = require('./routes/authRoutes');
const ejsRoutes = require('./routes/ejsRoutes');
const reservationController = require('./controllers/reservationController');

// Utilisation des routes
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/catways', catwayRoutes);
app.use('/reservations', reservationRoutes);
app.use('/auth', authRoutes);
app.use('/', ejsRoutes);

// Routes directes
app.get('/', (req, res) => {
    console.log('Page d\'accueil visitée');
    res.render('index');
});

app.get('/dashboard', reservationController.dashboard);

app.get('/reservation', (req, res) => {
    res.render('reservation');
});

module.exports = app; // <-- export pour supertest
