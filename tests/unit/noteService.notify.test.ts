import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

vi.mock('../../src/services/notificationService', () => ({
    notify: vi.fn()
}));

import { notify } from '../../src/services/notificationService';

describe('NoteService - notify (Ejercicio 6)', () => {
    beforeEach(() => {
    vi.clearAllMocks();
});

    it('notifica cuando la nota está fijada', () => {
        const db = createDb(':memory:');
        const repo = new SqliteNoteRepository(db);
        const service = new NoteServiceImpl(repo);

        const note = service.createNote({
            title: 'Nota importante',
            content: 'Esto está fijado',
            pinned: true
        });

        expect(notify).toHaveBeenCalledWith(note);
    });
    it('no notifica cuando la nota no está fijada', () => {
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    const service = new NoteServiceImpl(repo);

    service.createNote({
        title: 'Nota normal',
        content: 'Esto no está fijado'
    });

    expect(notify).not.toHaveBeenCalled();
});
});