
import PocketBase from 'pocketbase';
import styles from './Notes.module.css';
import Link from "next/link";

export const dynamic = 'auto',
    dynamicParams = true,
    revalidate = 0,
    fetchCache = 'auto',
    runtime = 'nodejs',
    preferredRegion = 'auto';

async function getNotes() {
    const db = new PocketBase('http://127.0.0.1:8090');
    const data = await db.collection('notes').getFullList(200 /* límite de registros, puedes ajustarlo */);
    return data as any[];
}

export default async function NotesPage() {
    const notes = await getNotes();

    return (
        <div className={styles.container}>
            {/* <h1 className={styles.header}>Notes</h1> */}
            <div className={styles.notesGrid}>
                {notes?.map((note) => (
                    <Note key={note.id} note={note} />
                ))}
            </div>
        </div>
    );
}

function Note({ note }: any) {
    const { id, title, content, created } = note || {};
    return (
        <Link href={`/notes/${id}`}>
            <div className={styles.noteCard}>
                <h2>{title}</h2>
                <h5>{content}</h5>
                <p>{created}</p>
            </div>
        </Link>
    );
}
