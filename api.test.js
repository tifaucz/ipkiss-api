const request = require('supertest');
const app = require('./app');

describe('API Tests', () => {

  test('Reset state before starting tests', async () => {
    const response = await request(app).post('/reset');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('OK');
  });

  test('Get balance for non-existing account', async () => {
    const response = await request(app).get('/balance?account_id=1234');
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('0');
  });

  test('Create account with initial balance', async () => {
    const response = await request(app).post('/event').send({
      type: 'deposit',
      destination: '100',
      amount: 10,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ destination: { id: '100', balance: 10 } });
  });

  test('Deposit into existing account', async () => {
    const response = await request(app).post('/event').send({
      type: 'deposit',
      destination: '100',
      amount: 10,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ destination: { id: '100', balance: 20 } });
  });

  test('Get balance for existing account', async () => {
    const response = await request(app).get('/balance?account_id=100');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('20');
  });

  test('Withdraw from non-existing account', async () => {
    const response = await request(app).post('/event').send({
      type: 'withdraw',
      origin: '200',
      amount: 10,
    });
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('0');
  });

  test('Withdraw from existing account', async () => {
    const response = await request(app).post('/event').send({
      type: 'withdraw',
      origin: '100',
      amount: 5,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ origin: { id: '100', balance: 15 } });
  });

  test('Transfer from existing account', async () => {
    const response = await request(app).post('/event').send({
      type: 'transfer',
      origin: '100',
      amount: 15,
      destination: '300',
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ origin: { id: '100', balance: 0 }, destination: { id: '300', balance: 15 } });
  });

  test('Transfer from non-existing account', async () => {
    const response = await request(app).post('/event').send({
      type: 'transfer',
      origin: '200',
      amount: 15,
      destination: '300',
    });
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('0');
  });
});
