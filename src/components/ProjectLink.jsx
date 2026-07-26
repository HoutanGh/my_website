import Icon from "./Icon";

function ProjectLink({ href, children, className = "inline-link", ariaLabel }) {
  if (!href) {
    return (
      <button
        className={`${className} placeholder-link`}
        type="button"
        title="Link to add"
        aria-label={ariaLabel || `${children} link placeholder`}
      >
        {children}
        <Icon name="external" />
      </button>
    );
  }

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
    >
      {children}
      <Icon name="external" />
    </a>
  );
}

export default ProjectLink;
