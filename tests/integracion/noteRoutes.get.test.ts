import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { makeApp } from '../../src/app';

describe('GET /notes/:id (Ejercicio 3)', () => {

    it('devuelve una nota existente', async () => {
        const app = makeApp(':memory:');

        const response = await request(app)
            .post('/notes')
            .send({
                title: 'Comprar pan',
                content: 'Antes de las 20hs'
            });

        const getResponse = await request(app)
            .get(`/notes/${response.body.id}`);

        expect(getResponse.status).toBe(200);
        expect(getResponse.body.content).toBe('Antes de las 20hs');
    });
    it ('devuelve 404 si no existe la nota', async () => {
        const app = makeApp(':memory:');

        const response = await request(app)
            .get('/notes/999');

        expect(response.status).toBe(404);
    });

});