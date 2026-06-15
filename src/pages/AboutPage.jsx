import '../css/aboutPage.css'
function AboutPage() {
  return (
    <div id  = "aboutPageDiv">
      <div id="aboutPageTitle">
      <h1>About This Todo App</h1>
      <p>
        This application helps users manage tasks and stay organized.
      </p>
      </div>
      <div className="aboutFlex">
        <section className="about-section">
          <h2>Features</h2>
          <ul>
            <li>Create todos</li>
            <li>Edit todos</li>
            <li>Delete todos</li>
            <li>Sort todos</li>
          </ul>
        </section>
        <section className="about-section">
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