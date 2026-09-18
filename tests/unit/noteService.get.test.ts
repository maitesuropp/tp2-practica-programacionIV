import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NotService - getNote (Ejercicio 3)', () => {
    let service: NoteServiceImpl;

    beforeEach(() => {
        const db = createDb(':memory:');
        const repo = new SqliteNoteRepository(db);
        service = new NoteServiceImpl(repo);
    });
    it ('devuelve una nota existente por su id', () => {
        const note = service.createNote({
            title: 'Comprar pan',
            content: 'Antes de las 20hs'
        });
    expect(service.getNote(note.id)).toEqual(note);
    });
});