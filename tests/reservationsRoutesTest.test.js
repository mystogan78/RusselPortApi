const request = require('supertest');
const app = require('../app');
const Reservation = require('../models/reservation');

jest.mock('../models/reservation');

describe('Routes /reservations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /reservations - affiche toutes les réservations', async () => {
    Reservation.find.mockResolvedValue([
      {
        _id: 'res1',
        clientName: 'Alice',
        boatName: 'Le Marin',
        catway: 'catway123',
        checkIn: '2025-07-25',
        checkOut: '2025-07-30',
      },
    ]);

    const response = await request(app).get('/reservations');
    expect(response.statusCode).toBe(200); // car tu utilises res.render
  });

  test('GET /reservations/:id - retourne une réservation par ID', async () => {
    Reservation.findById = jest.fn().mockResolvedValue({
      _id: 'res1',
      clientName: 'Alice',
    });

    const response = await request(app).get('/reservations/res1');
    expect(response.statusCode).toBe(200); // car tu utilises res.render
  });

  test('POST /reservations/:id/reservations - crée une nouvelle réservation', async () => {
    Reservation.prototype.save = jest.fn().mockResolvedValue({
      _id: 'res2',
      clientName: 'Jean Dupont',
      boatName: 'Blue Pearl',
      catway: 'catwayId',
      checkIn: '2025-07-25',
      checkOut: '2025-07-30',
    });

    const response = await request(app)
      .post('/reservations/catwayId/reservations')
      .send({
        clientName: 'Jean Dupont',
        boatName: 'Blue Pearl',
        checkIn: '2025-07-25',
        checkOut: '2025-07-30',
      });

    expect(response.statusCode).toBe(200); // car tu utilises res.render
  });

  test('POST /reservations/delete - supprime une réservation', async () => {
    Reservation.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: 'res1' });

    const response = await request(app).post('/reservations/delete').send({
      id: 'res1',
    });

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Réservation supprimée avec succès');
  });
});
