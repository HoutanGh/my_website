import ProjectLink from "./ProjectLink";

function ProjectDetails({ item, area }) {
  const isProject = area === "projects";
  const terms = isProject ? item.stack.split(" · ") : item.keywords;

  return (
    <section className="project-panel" aria-live="polite">
      <div className="project-content" key={`${area}-${item.id}`}>
        <div className="snapshot-heading">
          <h3 className="snapshot-title">{item.title}</h3>
          <div className="snapshot-meta">
            {item.status ? (
              <div className="snapshot-status">
                <span className={`status-light ${item.statusTone}`} aria-hidden="true" />
                {item.status}
              </div>
            ) : (
              <span className="snapshot-role">{item.role}</span>
            )}
            {isProject && item.started ? (
              <span className="snapshot-dates">
                Started {item.started} · Last updated {item.updated}
              </span>
            ) : null}
            {item.period ? <span className="snapshot-dates">{item.period}</span> : null}
          </div>
        </div>

        <div className="snapshot-description">
          <p>{item.overview}</p>
          {isProject ? <p>{item.contribution}</p> : null}
        </div>

        <div className="snapshot-terms">
          <h4 id="snapshot-terms-heading">{isProject ? "Tech stack" : "Keywords"}</h4>
          <ul role="list" aria-labelledby="snapshot-terms-heading">
            {terms.map((term) => <li key={term}>{term}</li>)}
          </ul>
        </div>

        {isProject && (item.hasGithub || item.hasSite) ? (
          <div className="snapshot-links">
            {item.hasGithub ? (
              <ProjectLink href={item.githubUrl} ariaLabel={`${item.title} GitHub repository`}>
                GitHub
              </ProjectLink>
            ) : null}
            {item.hasSite ? (
              <ProjectLink href={item.siteUrl} ariaLabel={`${item.title} live website`}>
                Visit website
              </ProjectLink>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default ProjectDetails;
