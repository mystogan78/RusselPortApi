const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = process.env.JWT_SECRET || 'secret_key';

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.status(201).json({ message: 'Utilisateur créé', userId: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Pour formulaire inscription (EJS)
exports.registerForm = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.redirect('/auth/login');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Pour formulaire connexion (EJS)
exports.loginForm = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send('Identifiants invalides');
    }
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
    res.cookie('token', token); // facultatif : tu peux aussi le stocker en session ou localStorage côté front
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const userId = req.body.id;
    console.log(`Suppression de l'utilisateur avec ID: ${userId}`);
    const user =
      await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }
    res.status(204).send({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateUser = (req, res) => {
    const { id, newUsername } = req.body;

    User.findOneAndUpdate({ username: id }, { username: newUsername })
        .then(() => {
            res.send(`Utilisateur ${id} modifié en ${newUsername}.`);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Erreur lors de la modification.");
        });
};