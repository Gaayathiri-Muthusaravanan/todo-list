import styles from '../css/AboutPage.module.css';
function AboutPage() {
  return (
    <div className={styles.aboutPageDiv}>
      <div className={styles.aboutPageTitle}>
        <h1>About This Todo App</h1>
        <p>
          This application helps users manage tasks and stay organized.
        </p>
      </div>
      <div className={styles.aboutFlex}>
        <section className={styles.aboutSection}>
          <h2>Features</h2>
          <ul>
            <li>Create todos</li>
            <li>Edit todos</li>
            <li>Delete todos</li>
            <li>Sort todos</li>
          </ul>
        </section>
        <section className={styles.aboutSection}>
          <h2>Technologies Used</h2>
          <ul>
            <li>React</li>
            <li>React Router</li>
            <li>Vite</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
export default AboutPage;