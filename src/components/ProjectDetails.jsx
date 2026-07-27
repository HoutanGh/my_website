import ProjectLink from "./ProjectLink";

function ProjectDetails({ item, area }) {
  const isProject = area === "projects";

  return (
    <section className="project-panel" aria-live="polite">
      <div className="project-content" key={`${area}-${item.id}`}>
        <div className="snapshot-heading">
          <h3 className="snapshot-title">{item.title}</h3>
          {item.status ? (
            <div className="snapshot-meta">
              <div className="snapshot-status">
                <span className={`status-light ${item.statusTone}`} aria-hidden="true" />
                {item.status}
              </div>
              {isProject && item.started ? (
                <span className="snapshot-dates">
                  Started {item.started} · Last updated {item.updated}
                </span>
              ) : null}
            </div>
          ) : (
            <div className="snapshot-status">{item.period}</div>
          )}
        </div>

        <p className="snapshot-copy">{item.overview}</p>
        {!isProject ? <span className="snapshot-label">Responsibilities</span> : null}
        <p className={`snapshot-work${isProject ? " project-detail" : ""}`}>
          {item.contribution}
        </p>

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
