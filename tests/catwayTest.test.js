const catwayController = require('../controllers/catwayController');
const Catway = require('../models/catway');

jest.mock('../models/catway');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.render = jest.fn().mockReturnValue(res);
  return res;
};

describe('Catway Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllCatways - doit afficher tous les catways (EJS)', async () => {
    const req = {};
    const res = mockResponse();
    const catways = [{ catwayNumber: 'C1', type: 'long', state: 'libre' }];

    Catway.find.mockResolvedValue(catways);

    await catwayController.getAllCatways(req, res);

    expect(Catway.find).toHaveBeenCalled();
    expect(res.render).toHaveBeenCalledWith('catways', { catways });
  });

  test('getCatwayById - retourne le catway par ID', async () => {
    const req = { params: { id: '123' } };
    const res = mockResponse();
    const catway = { _id: '123', catwayNumber: 'C2' };

    Catway.findById.mockResolvedValue(catway);

    await catwayController.getCatwayById(req, res);

    expect(Catway.findById).toHaveBeenCalledWith('123');
    expect(res.render).toHaveBeenCalledWith('catwayDetails', { catway });
  });

test('createCatway - crée un nouveau catway', async () => {
  const req = {
    body: {
      catwayNumber: 'C3',
      type: 'short',
      state: 'occupé',
    },
  };
  const res = mockResponse();

  const mockSave = jest.fn().mockResolvedValue({});

  // Simule le constructeur Catway pour qu'il retourne un objet avec .save()
  jest.spyOn(Catway.prototype, 'save').mockImplementation(mockSave);

  await catwayController.createCatway(req, res);

  expect(mockSave).toHaveBeenCalled(); // test l'appel à save()
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.send).toHaveBeenCalledWith('Catway créé avec succès');
});


test('updateCatway - met à jour un catway', async () => {
  const req = {
    params: {
      id: '123',
    },
    body: {
      state: 'libre',
    },
  };
  const res = mockResponse();

  Catway.findByIdAndUpdate.mockResolvedValue({ _id: '123', state: 'libre' });

  await catwayController.updateCatway(req, res);

  expect(Catway.findByIdAndUpdate).toHaveBeenCalledWith('123', { state: 'libre' });
  expect(res.send).toHaveBeenCalledWith('Catway mis à jour avec succès.');
});


test('deleteCatway - supprime un catway', async () => {
  const req = {
    params: {
      id: '123',
    },
  };
  const res = mockResponse();

  Catway.findByIdAndDelete.mockResolvedValue({ _id: '123' });

  await catwayController.deleteCatway(req, res);

  expect(Catway.findByIdAndDelete).toHaveBeenCalledWith('123');
  expect(res.send).toHaveBeenCalledWith('Catway supprimé avec succès.');
}); 

} 
);
