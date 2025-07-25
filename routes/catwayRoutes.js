/**
 * @swagger
 * tags:
 *   name: Catways
 *   description: Gestion des catways (API + vues)
 */

/**
 * @swagger
 * /catways:
 *   post:
 *     summary: Créer un nouveau catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - catwayNumber
 *               - type
 *               - state
 *             properties:
 *               catwayNumber:
 *                 type: string
 *               type:
 *                 type: string
 *               state:
 *                 type: string
 *     responses:
 *       201:
 *         description: Catway créé
 *       400:
 *         description: Erreur de création
 */

/**
 * @swagger
 * /catways/update:
 *   post:
 *     summary: Modifier un catway existant
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               state:
 *                 type: string
 *     responses:
 *       200:
 *         description: Catway modifié
 *       404:
 *         description: Catway non trouvé
 */

/**
 * @swagger
 * /catways/delete:
 *   post:
 *     summary: Supprimer un catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Catway supprimé
 *       404:
 *         description: Catway non trouvé
 */

/**
 * @swagger
 * /catways:
 *   get:
 *     summary: Affiche tous les catways (vue EJS)
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: Page HTML contenant la liste des catways
 */

/**
 * @swagger
 * /catways/details/{id}:
 *   get:
 *     summary: Affiche les détails d’un catway (vue EJS)
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du catway
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Page HTML avec les détails du catway
 *       404:
 *         description: Catway non trouvé
 */

/**
 * @swagger
 * /catways/all:
 *   get:
 *     summary: Récupère tous les catways (autre vue EJS ou API)
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: Liste complète des catways (HTML ou JSON)
 */


const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');
const authMiddleware = require('../middleware/authMiddleware');

// 🔹 VUES EJS
router.get('/', authMiddleware, catwayController.getAllCatways); // Afficher tous les catways
router.get('/details/:id', authMiddleware, catwayController.getCatwayById); // Détail d’un catway (vue)
router.get('/all', authMiddleware, catwayController.getAll); // Afficher tous les catways (vue)

// 🔹 API REST
router.post('/', authMiddleware, catwayController.createCatway); // Créer un catway
router.post('/catway/update/:id', authMiddleware, catwayController.updateCatway); // mettre à jour un catway

router.post('/catway/delete/:id', authMiddleware, catwayController.deleteCatway); // Supprimer

module.exports = router;
