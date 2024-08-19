"use client";

import PocketBase from 'pocketbase';
import styles from './Notes.module.css';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

const pb = new PocketBase('http://127.0.0.1:8090');

async function getNote(noteId: string) {
    const res = await fetch(
        `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
        {
            next: { revalidate: 10 },
        }
    );
    const data = await res.json();
    return data;
}

async function deleteNote(noteId: string) {
    try {
        await pb.collection('notes').delete(noteId);
        return true;
    } catch (error) {
        console.error('Error al eliminar la nota:', error);
        return false;
    }
}

function NoteActions({ noteId }: { noteId: string }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        const success = await deleteNote(noteId);
        if (success) {
            startTransition(() => {
                router.push('/notes');
            });
        } else {
            alert('No se pudo eliminar la nota');
        }
    };

    return (
        <button onClick={handleDelete} className={styles.deleteButton} disabled={isPending}>
            Eliminar Nota
        </button>
    );
}

export default async function NotePage({ params }: any) {
    const note = await getNote(params.id);

    return (
        <div>
            <h1 className={styles.header}>notes/{note.id}</h1>
            <div className={styles.note}>
                <h3>{note.title}</h3>
                <h5>{note.content}</h5>
                <p>{note.created}</p>
                <NoteActions noteId={note.id} />
            </div>
        </div>
    );
}
