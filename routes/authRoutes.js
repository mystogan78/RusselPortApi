/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion des utilisateurs (authentification)
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Enregistre un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Requête invalide
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connecte un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Identifiants invalides
 */

/**
 * @swagger
 * /auth/delete:
 *   post:
 *     summary: Supprime un utilisateur par son nom
 *     tags: [Auth]
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
 *         description: Utilisateur supprimé
 *       404:
 *         description: Utilisateur non trouvé
 */

/**
 * @swagger
 * /auth/update:
 *   post:
 *     summary: Modifie un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               newUsername:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur modifié
 *       404:
 *         description: Utilisateur non trouvé
 */

/**
 * @swagger
 * /auth/register/form:
 *   post:
 *     summary: Enregistre un utilisateur depuis un formulaire HTML
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur enregistré depuis le formulaire
 */

/**
 * @swagger
 * /auth/login/form:
 *   post:
 *     summary: Connecte un utilisateur depuis un formulaire HTML
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 */


const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/delete', authController.deleteUser);
router.post('/update', authController.updateUser);

// Pour afficher les pages d'inscription et de connexion
router.get('/register', (req, res) => {
  res.render('register'); // Affiche views/register.ejs
});

router.get('/login', (req, res) => {
  res.render('login'); // Affiche views/login.ejs
});

// Pour traiter les formulaires HTML
router.post('/register/form', authController.registerForm);
router.post('/login/form', authController.loginForm);

module.exports = router;
