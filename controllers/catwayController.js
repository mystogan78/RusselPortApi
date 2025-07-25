const Catway = require('../models/catway');

exports.getAll= async(req, res) => {
  try {
    const catways = await Catway.find({catwayState: 'disponible'});
    res.status(201).send({
      catways: catways,
      message: 'Liste des catways récupérée avec succès'
    });
  } catch (error) {
    res.status(500).send("Erreur lors de la récupération des catways.");
  }  
}

exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.render('catways', { catways });
  } catch (error) {
    res.status(500).send("Erreur lors de la récupération des catways.");
  }
};

exports.createCatway = async (req, res) => {
  try {
    const { catwayNumber, type, state } = req.body;
    const catway = new Catway({
      catwayNumber: catwayNumber,
      type: type,
      catwayState: state
    });
    await catway.save();
    res.status(201).send('Catway créé avec succès');
  } catch (error) {
    res.status(400).send("Erreur lors de la création du catway.");
  }
};
exports.getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).send('Catway non trouvé');
    res.render('catwayDetails', { catway });
  } catch (error) {
    res.status(500).send("Erreur lors de la récupération du catway.");
  }
};
exports.updateCatway = async (req, res) => {
  try {
    await Catway.findByIdAndUpdate(req.params.id, req.body);
    res.send('Catway mis à jour avec succès.');
  } catch (error) {
    console.error('Erreur de mise à jour du catway :', error);
    res.status(400).send('Erreur lors de la mise à jour du catway.');
  }
};

exports.deleteCatway = async (req, res) => {
  try {
    await Catway.findByIdAndDelete(req.params.id);
    res.send('Catway supprimé avec succès.');
  } catch (error) {
    console.error('Erreur de suppression du catway :', error);
    res.status(400).send('Erreur lors de la suppression du catway.');
  }
};
