import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - updateNote (Ejercicio 4)', () => {
    let service: NoteServiceImpl;
    beforeEach (() => {
        const db = createDb(':memory:');
        const repo = new SqliteNoteRepository(db);
        service = new NoteServiceImpl(repo);
    });
    it('actualiza una nota existente', () => {
        const note = service.createNote({
            title: 'Comprar pan',
            content: 'Antes de las 20hs'
        });

        const updated = service.updateNote(note.id, {
            title: 'Comprar leche'
        });

        expect(updated?.title).toBe('Comprar leche');
        expect(updated?.content).toBe('Antes de las 20hs');
    });
    it ('devuelve undefined si no existe la nota', () => {
        expect(service.updateNote(999, {title: 'Algo'})).toBeUndefined();
    })
});

