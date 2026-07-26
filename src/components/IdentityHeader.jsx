import { links } from "../data/links";
import Icon from "./Icon";

function SocialAction({ href, label, icon, children, className = "" }) {
  const classes = `social-link${className ? ` ${className}` : ""}`;

  if (!href) {
    return (
      <button className={classes} type="button" title={`${label} link to add`} aria-label={`${label} link placeholder`}>
        {children || <Icon name={icon} />}
      </button>
    );
  }

  return (
    <a
      className={classes}
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
      title={label}
      aria-label={label}
    >
      {children || <Icon name={icon} />}
    </a>
  );
}

function IdentityHeader() {
  return (
    <header className="identity-header">
      <div className="identity-inner">
        <p className="identity-name">Houtan Ghaebi</p>
        <div className="identity-line">
          <span className="identity-item">
            <Icon name="building" />
            Technical Business Analyst @ VMO2
          </span>
          <span className="identity-dot role-dot" aria-hidden="true">•</span>
          <span className="identity-item">
            <Icon name="cap" />
            MSc Theoretical Physics @ Durham
          </span>
          <span className="identity-dot role-dot" aria-hidden="true">•</span>
          <span className="social-links">
            <SocialAction href={links.github} label="GitHub" icon="github" />
            <span className="identity-dot" aria-hidden="true">•</span>
            <SocialAction href={links.linkedin} label="LinkedIn" icon="linkedin" />
            <span className="identity-dot" aria-hidden="true">•</span>
            <SocialAction href={links.email} label="Email" icon="mail" />
            <span className="identity-dot" aria-hidden="true">•</span>
            <SocialAction href={links.cv} label="CV" className="cv-link">
              <span className="cv-glyph" aria-hidden="true">CV</span>
            </SocialAction>
          </span>
        </div>
      </div>
    </header>
  );
}

export default IdentityHeader;
