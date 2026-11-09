import { useEffect, useRef, useState } from "react";
import ProjectLink from "./ProjectLink";

function ProjectDetails({ item, area }) {
  const isProject = area === "projects";
  const terms = isProject ? item.stack.split(" · ") : item.keywords;
  const itemKey = `${area}-${item.id}`;
  const descriptionRef = useRef(null);
  const [measured, setMeasured] = useState(null);
  // A measurement belongs to the item it was taken for, so a newly selected item
  // never shows the previous item's scroll fade.
  const scrollState = measured?.itemKey === itemKey
    ? measured
    : { hasOverflow: false, atEnd: true };

  useEffect(() => {
    const description = descriptionRef.current;
    if (!description) return undefined;

    const updateScrollState = () => {
      const hasOverflow = description.scrollHeight > description.clientHeight + 2;
      const atEnd =
        description.scrollTop + description.clientHeight >= description.scrollHeight - 3;
      setMeasured({ itemKey, hasOverflow, atEnd: !hasOverflow || atEnd });
    };

    const frame = window.requestAnimationFrame(updateScrollState);
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(description);
    for (const paragraph of description.children) observer.observe(paragraph);
    description.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      description.removeEventListener("scroll", updateScrollState);
    };
  }, [itemKey]);

  const shellClasses = [
    "snapshot-description-shell",
    scrollState.hasOverflow && !scrollState.atEnd ? "has-more" : "",
  ].filter(Boolean).join(" ");

  return (
    <section className="project-panel" aria-live="polite">
      <div className="project-content" key={itemKey}>
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

        <div className={shellClasses}>
          <div
            className={`snapshot-description${scrollState.hasOverflow ? " is-scrollable" : ""}`}
            ref={descriptionRef}
            tabIndex={scrollState.hasOverflow ? 0 : undefined}
          >
            <p>{item.overview}</p>
            {isProject ? <p>{item.contribution}</p> : null}
          </div>
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
