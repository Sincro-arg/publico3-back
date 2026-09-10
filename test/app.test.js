const request = require('supertest');
const app = require('../src/app');

describe('GET /salud', () => {
  it('responde 200 con estado ok', async () => {
    const res = await request(app).get('/salud');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ estado: 'ok' });
  });
});

describe('GET /saludo/:nombre', () => {
  it('responde 200 con el saludo cuando el nombre es valido', async () => {
    const res = await request(app).get('/saludo/Juan');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ mensaje: 'Hola, Juan!' });
  });

  it('responde 400 cuando el nombre esta vacio (solo espacios)', async () => {
    const res = await request(app).get('/saludo/%20');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('responde 400 cuando el nombre supera los 40 caracteres', async () => {
    const nombreLargo = 'a'.repeat(41);
    const res = await request(app).get(`/saludo/${nombreLargo}`);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
