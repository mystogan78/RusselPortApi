const Reservation = require('../models/reservation');
const Catway = require('../models/catway');

exports.afficherReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.render('reservations', { reservations }); // passer à EJS
  } catch (err) {
    res.status(500).send("Erreur lors de l'affichage des réservations.");
  }
};
exports.dashboard = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.render('dashboard', { catways });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors du chargement du tableau de bord.");
  }
};



// ✅ Créer une réservation pour un catway (API REST)
// controllers/reservationController.js



// ✅ Obtenir une réservation spécifique (API REST)
exports.getReservationById = (req, res) => {
  const reservationId = req.params.id;
  Reservation.findById(reservationId)
    .then((reservation) => {
      if (!reservation) {
        return res.status(404).json({ message: "Réservation non trouvée" });
      }
      res.render('reservationDetails', { reservation });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Erreur serveur" });
    });
};

// ✅ Créer une réservation pour un catway (API REST)
exports.createReservation = async (req, res) => {
  const catwayId = req.params.id;
  const { clientName, boatName, checkIn, checkOut } = req.body;

  if (!clientName || !boatName || !checkIn || !checkOut) {
    return res.status(400).json({ message: "Champs requis manquants" });
  }

  try {
    const newReservation = new Reservation({
      catway: catwayId,
      clientName,
      boatName,
      checkIn,
      checkOut
    });

    const saved = await newReservation.save();

    res.render('reservations', {
      message: "Réservation créée",
      reservations: [saved]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Supprimer une réservation (API REST)
 
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!reservation) {
      return res.status(404).send("Réservation non trouvée");
    }

    res.send("Réservation supprimée avec succès.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la suppression");
  }
};

