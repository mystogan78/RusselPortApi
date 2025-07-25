# RusselPortApi
# ⚓️ Russel Port API

Application Node.js avec Express, EJS et MongoDB pour gérer les **catways** et **réservations** dans un port de plaisance.

---

## 🚀 Fonctionnalités

- Authentification (connexion, inscription)
- Création / Suppression de réservations
- Création / Suppression de catways
- Dashboard administrateur
- Rendu avec **EJS**
- Documentation Swagger disponible

---

## 📁 Structure du projet

```
russel-port-api/
│
├── controllers/
├── routes/
├── models/
├── services/
├── views/
├── public/
├── tests/
├── .env
├── .gitignore
├── app.js
├── server.js
├── package.json
├── README.md
```

---

## 🛠️ Technologies utilisées

- Node.js
- Express 5
- MongoDB / Mongoose
- EJS
- JWT / Bcrypt
- Swagger
- Jest / Supertest

---

## ⚙️ Installation

```bash
git clone https://github.com/ton-utilisateur/russel-port-api.git
cd russel-port-api
npm install
```

---

## 🌐 Lancer l'application

### En mode développement :
```bash
npm run dev
```

### En mode production :
```bash
npm start
```

---

## ✅ Lancer les tests

```bash
npm test
```

---

## 📚 Documentation Swagger

Accéder à la documentation via :  
[http://localhost:3000/documentation](http://localhost:3000/documentation)

---

## 🔐 Variables d’environnement `.env`

Exemple de fichier `.env` :

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/russel-port
JWT_SECRET=tonsecret
```

⚠️ **Ne pas versionner ce fichier (`.env`) !**

---

## 👤 Auteur

Ibrahim  
Projet réalisé dans le cadre d'une formation developpeur.

---

## 📄 Licence

Ce projet est sous licence **ISC**.