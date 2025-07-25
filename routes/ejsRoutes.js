const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');
const Catway = require('../models/catway');

// Page pour afficher toutes les réservations (EJS)
router.get('/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.render('reservations', { reservations });
  } catch (err) {
    res.status(500).send("Erreur lors de l'affichage des réservations.");
  }
});
router.get('/catways', async (req, res) => {
  try { 
    const catways = await Catway.find();
    res.render('catways', { catways });
  } catch (err) {
    res.status(500).send("Erreur lors de l'affichage des catways.");
  }
});

// Page pour afficher tous les catways (EJS)
router.get('/catways/:id', async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) {
      return res.status(404).send("Catway non trouvé");
    }
    res.render('catway', { catway }); // ✅ Ici on passe bien la variable attendue
  } catch (err) {
    res.status(500).send("Erreur lors de l'affichage du catway.");
  }
});
// Page pour afficher les détails d'une réservation (EJS)
router.get('/reservations/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).send("Réservation non trouvée");
    }
    res.render('reservation', { reservation });
  } catch (err) {
    res.status(500).send("Erreur lors de l'affichage de la réservation.");
  }
});

module.exports = router;
