import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - listNotes (Ejercicio 2)', () => {
    let service: NoteServiceImpl;

    beforeEach(() => {
        const db = createDb(':memory:'); //db temporal solo para este test
        const repo = new SqliteNoteRepository(db); //le pasamos la bd que acabamos de crear
        service = new NoteServiceImpl(repo); //instanciamos el servicio con la bd que acabamos de crear
    });

    it('devuelve una lista vacia si no hay notas'), () => {
        expect(service.listNotes()).toHaveLength(0);
    }
    it('devuelve varias notas'), () => {
        service.createNote({title : 'A', content : 'B'});
        service.createNote({title : 'C', content : 'D'});
        expect(service.listNotes()).toHaveLength(2);
    }

});
