const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());

const reservationController = require('../controllers/reservationController');
const Reservation = require('../models/reservation');
const Catway = require('../models/catway');

jest.mock('../models/reservation');
jest.mock('../models/catway');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.render = jest.fn().mockReturnValue(res);
  return res;
};

describe('Reservation Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createReservation - crée une réservation liée à un catway', async () => {
    const req = {
      params: { id: 'catwayId' },
      body: {
        clientName: 'Jean Dupont',
        boatName: 'Blue Pearl',
        checkIn: '2025-07-25',
        checkOut: '2025-07-30'
      }
    };
    const res = mockResponse();

    Reservation.prototype.save = jest.fn().mockResolvedValue({
      _id: 'res123',
      catway: 'catwayId',
      clientName: 'Jean Dupont',
      boatName: 'Blue Pearl',
      checkIn: '2025-07-25',
      checkOut: '2025-07-30'
    });

    await reservationController.createReservation(req, res);

    expect(res.render).toHaveBeenCalledWith('reservations', {
      message: 'Réservation créée',
      reservations: [
        {
          _id: 'res123',
          catway: 'catwayId',
          clientName: 'Jean Dupont',
          boatName: 'Blue Pearl',
          checkIn: '2025-07-25',
          checkOut: '2025-07-30'
        }
      ]
    });
  });

  test('deleteReservation - supprime une réservation existante', async () => {
    const req = { params: { id: 'res123' } };
    const res = mockResponse();

    Reservation.findByIdAndDelete.mockResolvedValue({ _id: 'res123' });

    await reservationController.deleteReservation(req, res);

    expect(Reservation.findByIdAndDelete).toHaveBeenCalledWith('res123');
    expect(res.send).toHaveBeenCalledWith('Réservation supprimée avec succès.');
  });

  test('afficherReservations - affiche toutes les réservations', async () => {
    const reservations = [
      {
        _id: 'res1',
        clientName: 'Alice',
        boatName: 'Le Marin',
        catway: 'catway123',
        checkIn: '2025-07-25',
        checkOut: '2025-07-30',
      },
    ];

    Reservation.find.mockResolvedValue(reservations);

    const req = {};
    const res = mockResponse();

    await reservationController.afficherReservations(req, res);

    expect(Reservation.find).toHaveBeenCalled();
    expect(res.render).toHaveBeenCalledWith('reservations', { reservations });
  });

  test('getReservationById - récupère une réservation par ID', async () => {
    const req = { params: { id: 'res123' } };
    const res = mockResponse();

    const mockReservation = {
      _id: 'res123',
      clientName: 'Jean Dupont',
    };

    Reservation.findById.mockResolvedValue(mockReservation);

    await reservationController.getReservationById(req, res);

    expect(Reservation.findById).toHaveBeenCalledWith('res123');
    expect(res.render).toHaveBeenCalledWith('reservationDetails', { reservation: mockReservation });
  });
});