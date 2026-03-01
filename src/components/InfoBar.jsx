function InfoBar() {
  return (
    <div className="info-bar">
      <span className="has-tooltip">
        Technical Business Analyst @ VMO2
        <span className="tooltip">2025-01-27 - Present</span>
      </span>
      <span aria-hidden="true">&bull;</span>
      <span className="has-tooltip">
        MSc Theoretical Physics @ Durham
        <span className="tooltip">Second-Class Honours</span>
      </span>
      <span aria-hidden="true">&bull;</span>
      <a
        href="https://github.com/houtang"
        target="_blank"
        rel="noreferrer"
        className="github-link"
        aria-label="GitHub"
      >
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub"
          className="github-logo"
        />
      </a>
    </div>
  );
}

export default InfoBar;
