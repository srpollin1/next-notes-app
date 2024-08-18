import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to NotesApp</h1>
      <p className={styles.subtitle}>Your personal space for organizing and managing your notes.</p>
      <div className={styles.features}>
        <div className={styles.feature}>
          <h2>Organize</h2>
          <p>Keep your notes well-organized and easily accessible.</p>
        </div>
        <div className={styles.feature}>
          <h2>Manage</h2>
          <p>Edit, delete, and manage your notes with ease.</p>
        </div>
        <div className={styles.feature}>
          <h2>Search</h2>
          <p>Find your notes quickly with our powerful search tool.</p>
        </div>
      </div>
    </div>
  );
}
