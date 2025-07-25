const express = require('express');
const router = express.Router();

// Import des routes
const reservationRoutes = require('./reservationRoutes');
// const catwayRoutes = require('./catwayRoutes'); // Si tu en as

// Route d’accueil simple
router.get('/', (req, res) => {
  res.send('Welcome to the Russel page!');
});

// Utilisation des routes réservations
router.use('/reservations', reservationRoutes);

// Utilisation d’autres routes si besoin
// router.use('/catways', catwayRoutes);

module.exports = router;
