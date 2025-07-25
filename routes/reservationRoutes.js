/**
 * @swagger
 * tags:
 *   name: Réservations
 *   description: Gestion des réservations de catways
 */

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Affiche toutes les réservations (vue EJS)
 *     tags: [Réservations]
 *     responses:
 *       200:
 *         description: Page HTML contenant la liste des réservations
 */

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Affiche les détails d'une réservation
 *     tags: [Réservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la réservation
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de la réservation
 *       404:
 *         description: Réservation non trouvée
 */

/**
 * @swagger
 * /reservations/{id}/reservations:
 *   post:
 *     summary: Créer une réservation pour un catway spécifique
 *     tags: [Réservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du catway concerné
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - clientName
 *               - boatName
 *               - checkIn
 *               - checkOut
 *             properties:
 *               clientName:
 *                 type: string
 *               boatName:
 *                 type: string
 *               checkIn:
 *                 type: string
 *                 format: date
 *               checkOut:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Réservation créée
 *       400:
 *         description: Erreur lors de la création
 */

/**
 * @swagger
 * /reservations/delete:
 *   post:
 *     summary: Supprimer une réservation
 *     tags: [Réservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Réservation supprimée
 *       404:
 *         description: Réservation non trouvée
 */


const express = require('express');
const router = express.Router({ mergeParams: true });

// Import the reservation controller
const reservationController = require('../controllers/reservationController');


// Afficher toutes les réservations (vue EJS)
router.get('/', reservationController.afficherReservations);


// Détail d'une réservation
router.get('/:id', reservationController.getReservationById);

// Créer une réservation
router.post('/:id/reservations/', reservationController.createReservation);

// Supprimer une réservation
router.post('/delete', reservationController.deleteReservation);

module.exports = router;
